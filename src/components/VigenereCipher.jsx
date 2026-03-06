import React, { useState } from 'react';
import { vigenereEncrypt, vigenereDecrypt, saveHistory } from '../utils/ciphers';

const VigenereCipher = ({ onBack }) => {

  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [mode, setMode] = useState('encrypt');

  const handleTransform = () => {

    let transformed;

    if (mode === 'encrypt') {
      transformed = vigenereEncrypt(input, key);
    } else {
      transformed = vigenereDecrypt(input, key);
    }

    setResult(transformed);
    setShowResult(true);

    saveHistory("Виженер", input, transformed);

  };

  const handleClear = () => {
    setInput('');
    setKey('');
    setResult('');
    setShowResult(false);
  };

  // 🔑 генератор ключа
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
          Шифр Виженера
        </h2>

        <p style={{ color: '#888', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
          Классический полиалфавитный шифр, использующий ключевое слово.
        </p>
      </div>

      <div
        className="two-column-layout"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}
      >

        {/* Левая колонка */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid var(--border)' }}>

          <h3 style={{ marginBottom: '15px' }}>
            Как это работает
          </h3>

          <p style={{ color: '#666', marginBottom: '12px' }}>
            Шифр Виженера использует ключевое слово для последовательного сдвига букв сообщения.
          </p>

          <p style={{ color: '#666', fontSize: '13px' }}>
            <strong>Пример:</strong><br/>
            Исходный текст: ПРИВЕТ<br/>
            Ключ: КЛЮЧ
          </p>

        </div>

        {/* Правая колонка */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid var(--border)' }}>

          <div className="form-group">

            <label>Режим</label>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>

              <button
                className={mode === 'encrypt' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setMode('encrypt')}
                style={{ flex: 1 }}
              >
                Шифрование
              </button>

              <button
                className={mode === 'decrypt' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setMode('decrypt')}
                style={{ flex: 1 }}
              >
                Дешифрование
              </button>

            </div>

          </div>

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

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: "wrap" }}>

            <button className="btn-primary" onClick={handleTransform}>
              {mode === 'encrypt' ? 'Зашифровать' : 'Расшифровать'}
            </button>

            <button className="btn-secondary" onClick={handleClear}>
              Очистить
            </button>

            <button className="btn-secondary" onClick={copyResult}>
              Скопировать
            </button>

            <button className="btn-secondary" onClick={generateRandomKey}>
              Случайный ключ
            </button>

          </div>

          {showResult && (
            <div className="result show">

              <div className="result-label">
                Результат
              </div>

              <div className="result-text">
                {result}
              </div>

            </div>
          )}

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

export default VigenereCipher;