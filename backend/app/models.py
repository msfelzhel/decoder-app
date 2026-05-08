from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # Связь 1-ко-многим с историей
    history = relationship("History", back_populates="owner")
    # Связь 1-ко-многим с прогрессом заданий
    task_progress = relationship("UserTaskProgress", back_populates="user")

class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)         # тип шифра
    input = Column(String)        # исходный текст
    result = Column(String)       # результат
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="history")

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    message = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    cipher_type = Column(String, index=True)  # 'caesar', 'atbash', 'morse' и т.д.
    order = Column(Integer)                   # порядок задания внутри шифра
    text = Column(String)                     # текст задания
    answer = Column(String)                   # правильный ответ
    hint = Column(String, nullable=True)      # подсказка (необязательно)

class UserTaskProgress(Base):
    __tablename__ = "user_task_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    task_id = Column(Integer, ForeignKey("tasks.id"))
    completed_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="task_progress")
    task = relationship("Task")