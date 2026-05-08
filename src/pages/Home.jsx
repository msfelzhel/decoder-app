import React, { useState, useEffect } from 'react';
import CipherCard from '../components/CipherCard';
import HistoryPanel from '../components/HistoryPanel';
import { REQUIRE_TASKS_COMPLETION } from '../config';

const Home = ({ onCipherSelect }) => {
  const [progress, setProgress] = useState([]);
  const username = localStorage.getItem('user');

  useEffect(() => {
    if (REQUIRE_TASKS_COMPLETION && username) {
      fetchProgress();
    }
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/tasks/progress', {
        credentials: 'include'
      });
      if (res.ok) {
        setProgress(await res.json());
      }
    } catch (e) {
      console.error('Ошибка загрузки прогресса', e);
    }
  };

  // Проверка заблокирован ли шифр
  const isLocked = (cipherId) => {
    if (!REQUIRE_TASKS_COMPLETION) return false;
    if (!username) return false;
    const prog = progress.find(p => p.cipher_type === cipherId);
    if (!prog) return false; // нет заданий для этого шифра = не блокируем
    return prog.completed_tasks < prog.total_tasks;
  };

const ciphers = [
  {
    id: 'caesar',
    title: 'Шифр Цезаря',
    description: 'Переместите буквы в алфавитном порядке, чтобы скрыть сообщение.'
  },
  {
    id: 'atbash',
    title: 'Шифр Атбаш',
    description: 'Простой шифр подстановки, который меняет алфавит на противоположный.'
  },
  {
    id: 'dancing',
    title: 'Пляшущие человечки',
    description: 'Геометрический шифр, использующий символы вместо букв.'
  },
  {
    id: 'morse',
    title: 'Азбука Морзе',
    description: 'Классический метод, использующий точки и тире.'
  },
  {
    id: 'vigenere',
    title: 'Шифр Виженера',
    description: 'Полиалфавитный шифр с использованием ключевого слова.'
  },
  {
    id: 'vernam',
    title: 'Шифр Вернама',
    description: 'Криптосистема на основе операции XOR.'
  },
  {
    id: 'rail',
    title: 'Rail Fence',
    description: 'Шифр, записывающий текст по диагонали в несколько строк.'
  },
  {
    id: 'polybius',
    title: 'Шифр Полибия',
    description: 'Каждая буква кодируется координатами в квадрате 5×5.'
  }
];

  return (
    <div className="page">
      <div className="container">
        <div className="hero">
          <h1>Исследуйте мир шифров!</h1>
          <p>Откройте для себя секреты древних и современных шифров. Нажмите на карточку, чтобы начать изучать!</p>
        </div>

        <div className="cipher-grid">
          {ciphers.map(cipher => (
            <CipherCard
              key={cipher.id}
              title={cipher.title}
              description={cipher.description}
              onClick={() => onCipherSelect(cipher.id)}
            />
          ))}
        </div>
      </div>
      <HistoryPanel />
    </div>
  );
};

export default Home;