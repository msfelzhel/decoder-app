import React, { useState } from 'react';
import { vernamCipher, saveHistory } from '../utils/ciphers';

const VernamCipher = ({ onBack }) => {

  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleTransform = () => {
    const transformed = vernamCipher(input, key);
    setResult(transformed);
    setShowResult(true);
    saveHistory("Вернам", input, transformed);
  };

  const handleClear = () => {
    setInput('');
    setKey('');
    setResult('');
    setShowResult(false);
  };

  // 🔑 генерация случайного ключа
  const generateRandomKey = () => {

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomKey = "";

    for (let i = 0; i < 6; i++) {
      randomKey += letters[Math.floor(Math.random() * letters.length)];
    }

    setKey(randomKey);

  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div style={{ padding: '40px 0' }}>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', color: 'var(--dark)', marginBottom: '10px' }}>
          Шифр Вернама
        </h2>

        <p style={{ color: '#888', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
          Шифр Вернама — криптосистема, основанная на операции XOR между символами текста и ключа.
        </p>
      </div>

      <div
        className="two-column-layout"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}
      >

        {/* Левая колонка */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid var(--border)' }}>

          <h3 style={{ marginBottom: '15px' }}>Как это работает</h3>

          <p style={{ color: '#666', marginBottom: '12px' }}>
            Каждый символ исходного текста объединяется с символом ключа с помощью операции XOR.
            Если применить ту же операцию ещё раз с тем же ключом — получится исходный текст.
          </p>

          <div
            style={{
              background: 'var(--dark)',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              textAlign: 'center'
            }}
          >
            Текст: 10101010 <br/>
            Ключ: 11001100 <br/>
            XOR: 01100110
          </div>

        </div>

        {/* Правая колонка */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid var(--border)' }}>

          <h3 style={{ marginBottom: '15px' }}>Попробуй сам</h3>

          <div className="form-group">
            <label>Сообщение</label>

            <textarea
              placeholder="Введите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

          </div>

          <div className="form-group">
            <label>Ключ</label>

            <input
              type="text"
              placeholder="Введите ключ"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />

          </div>

          <div className="button-group">

            <button
              className="btn-primary"
              onClick={handleTransform}
            >
              Преобразовать
            </button>

            <button
              className="btn-secondary"
              onClick={handleClear}
            >
              Очистить
            </button>

            <button
              className="btn-secondary"
              onClick={copyResult}
            >
              Скопировать
            </button>

            <button
              className="btn-secondary"
              onClick={generateRandomKey}
            >
              Случайный ключ
            </button>

          </div>

          {showResult && (
            <div className="result show">
              <div className="result-label">Результат:</div>
              <div className="result-text">{result}</div>
            </div>
          )}

        </div>

      </div>

      <div
        style={{
          background: '#FFC107',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px'
        }}
      >

        <strong style={{ color: 'var(--dark)' }}>
          Попробуй другие шифры
        </strong>

        <div
          className="cipher-navigation"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '15px' }}
        >

          <button onClick={() => onBack('caesar')} style={{ background: 'white', border: 'none', padding: '15px', borderRadius: '8px' }}>
            Шифр Цезаря
          </button>

          <button onClick={() => onBack('atbash')} style={{ background: 'white', border: 'none', padding: '15px', borderRadius: '8px' }}>
            Шифр Атбаш
          </button>

          <button onClick={() => onBack('morse')} style={{ background: 'white', border: 'none', padding: '15px', borderRadius: '8px' }}>
            Азбука Морзе
          </button>

        </div>

      </div>

      <button
        className="btn-secondary"
        onClick={() => onBack('home')}
        style={{ width: '100%', padding: '12px' }}
      >
        ← Вернуться на главную
      </button>

    </div>
  );

};

export default VernamCipher;