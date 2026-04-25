from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .api import auth, history, contacts


# Создание всех таблиц в БД
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Crypto API")

# Настройка CORS для работы с React (обычно порт 3000 или 5173 для Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",  # Разрешает запросы с любых IP и доменов
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение роутеров
app.include_router(auth.router)
app.include_router(history.router)
app.include_router(contacts.router)