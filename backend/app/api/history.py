from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database, security

router = APIRouter(prefix="/api/history", tags=["История"])

@router.post("/", response_model=schemas.HistoryResponse)
def add_history(
    history: schemas.HistoryCreate, 
    db: Session = Depends(database.get_db), 
    current_user: models.User = Depends(security.get_current_user)
):
    new_history = models.History(**history.dict(), user_id=current_user.id)
    db.add(new_history)
    db.commit()
    db.refresh(new_history)
    return new_history

@router.get("/", response_model=List[schemas.HistoryResponse])
def get_history(
    db: Session = Depends(database.get_db), 
    current_user: models.User = Depends(security.get_current_user)
):
    # Возвращаем последние 20 записей пользователя
    return db.query(models.History)\
            .filter(models.History.user_id == current_user.id)\
            .order_by(models.History.created_at.desc())\
            .limit(20)\
            .all()
