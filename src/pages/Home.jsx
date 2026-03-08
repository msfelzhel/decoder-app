import React from 'react';
import CipherCard from '../components/CipherCard';
import HistoryPanel from '../components/HistoryPanel';

const Home = ({ onCipherSelect }) => {
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