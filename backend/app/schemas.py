from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# --- Схемы пользователя ---
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True

# --- Схемы токена ---
class Token(BaseModel):
    access_token: str
    token_type: str

# --- Схемы истории ---
class HistoryCreate(BaseModel):
    type: str
    input: str
    result: str

class HistoryResponse(HistoryCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactResponse(ContactCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Схемы заданий ---
class TaskResponse(BaseModel):
    id: int
    cipher_type: str
    order: int
    text: str
    hint: Optional[str] = None

    class Config:
        from_attributes = True

class TaskAnswerSubmit(BaseModel):
    task_id: int
    answer: str

class TaskAnswerResult(BaseModel):
    correct: bool
    message: str

class UserProgressResponse(BaseModel):
    cipher_type: str
    total_tasks: int
    completed_tasks: int
    completed_task_ids: List[int]
