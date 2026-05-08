import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

# Подключение к БД
engine = create_engine(os.getenv("DATABASE_URL"))

# Чистый SQL-запрос с использованием плейсхолдеров
query = text("""
    INSERT INTO tasks (cipher_type, "order", text, answer, hint) 
    VALUES (:cipher_type, :order, :text, :answer, :hint);
""")

with engine.connect() as connection:
    with connection.begin():
        connection.execute(query, {
            "cipher_type": "atbash",
            "order": 3,
            "text": "ШИФР",
            "answer": "ЖЦКО",
            "hint": None
        })
        print("Данные успешно записаны в нативном UTF-8!")
