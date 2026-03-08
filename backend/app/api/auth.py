from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi.security import OAuth2PasswordRequestForm
from .. import models, schemas, database, security

router = APIRouter(prefix="/api/auth", tags=["Аутентификация"])

@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Проверка существования пользователя
    db_user = db.query(models.User).filter(
        (models.User.username == user.username) | (models.User.email == user.email)
    ).first()
    
    if db_user:
        raise HTTPException(status_code=400, detail="Имя пользователя или email уже заняты")
        
    hashed_password = security.get_password_hash(user.password)
    new_user = models.User(username=user.username, email=user.email, hashed_password=hashed_password)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(
    response: Response, 
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(database.get_db)
):
    # Ищем пользователя либо по username, либо по email
    user = db.query(models.User).filter(
        or_(
            models.User.username == form_data.username,
            models.User.email == form_data.username
        )
    ).first()
    
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный логин/email или пароль",
        )
        
    # Генерируем JWT токен
    access_token = security.create_access_token(data={"sub": user.username})
    
    # Устанавливаем HttpOnly Cookie (браузер спрячет её от JS)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,       # Запрет на чтение через document.cookie
        max_age=security.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",      # Защита от подделки межсайтовых запросов
        secure=False         # Установите True на продакшене (когда будет HTTPS)
    )
    
    return {"message": "Успешный вход", "username": user.username}

@router.post("/logout")
def logout(response: Response):
    # Удаляем куку при выходе
    response.delete_cookie("access_token")
    return {"message": "Успешный выход"}

@router.get("/me", response_model=schemas.UserResponse)
def get_current_user_info(current_user: models.User = Depends(security.get_current_user)):
    """
    Возвращает данные пользователя по куке.
    """
    return current_user
