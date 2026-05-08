from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas, database, security

router = APIRouter(prefix="/api/tasks", tags=["Задания"])

# Получить задания (опционально фильтр по типу шифра)
@router.get("/", response_model=List[schemas.TaskResponse])
def get_tasks(
    cipher_type: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Task)
    if cipher_type:
        query = query.filter(models.Task.cipher_type == cipher_type)
    return query.order_by(models.Task.cipher_type, models.Task.order).all()

# Отправить ответ на задание
@router.post("/submit", response_model=schemas.TaskAnswerResult)
def submit_answer(
    submission: schemas.TaskAnswerSubmit,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    task = db.query(models.Task).filter(models.Task.id == submission.task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Задание не найдено")

    # Сравнение без учёта регистра и пробелов по краям
    if submission.answer.strip().lower() == task.answer.strip().lower():
        # Проверяем, не выполнено ли уже
        existing = db.query(models.UserTaskProgress).filter(
            models.UserTaskProgress.user_id == current_user.id,
            models.UserTaskProgress.task_id == task.id
        ).first()
        if not existing:
            progress = models.UserTaskProgress(user_id=current_user.id, task_id=task.id)
            db.add(progress)
            db.commit()
        return schemas.TaskAnswerResult(correct=True, message="Правильно!")
    else:
        return schemas.TaskAnswerResult(correct=False, message="Неверно, попробуй ещё раз!")

# Получить прогресс текущего пользователя
@router.get("/progress", response_model=List[schemas.UserProgressResponse])
def get_progress(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    cipher_types = db.query(models.Task.cipher_type).distinct().all()
    result = []

    for (cipher_type,) in cipher_types:
        total = db.query(models.Task).filter(models.Task.cipher_type == cipher_type).count()
        completed_ids = [
            p.task_id for p in db.query(models.UserTaskProgress)
            .join(models.Task)
            .filter(
                models.UserTaskProgress.user_id == current_user.id,
                models.Task.cipher_type == cipher_type
            ).all()
        ]
        result.append(schemas.UserProgressResponse(
            cipher_type=cipher_type,
            total_tasks=total,
            completed_tasks=len(completed_ids),
            completed_task_ids=completed_ids
        ))

    return result
