import React from 'react';
import CipherCard from '../components/CipherCard';

const Home = ({ onCipherSelect }) => {
  const ciphers = [
    {
      id: 'caesar',
      title: 'Шифр Цезаря',
      description: 'Переместите буквы в алфавитном порядке, чтобы скрыть своё сообщение.'
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
      description: 'Классический метод, использующий точки и тире для отправки сообщений.'
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
    </div>
  );
};

export default Home;