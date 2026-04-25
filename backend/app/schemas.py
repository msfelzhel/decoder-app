from pydantic import BaseModel, EmailStr
from datetime import datetime

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
