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

    const letters = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
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
          🔑 Шифр Виженера
        </h2>

        <p style={{ color: '#888', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
          Классический полиалфавитный шифр, использующий ключевое слово.
        </p>
      </div>

      <div
        className="two-column-layout"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}
      >

        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid var(--border)' }}>

          <h3 style={{ color: 'var(--dark)', marginBottom: '15px', fontSize: '18px' }}>
            Как это работает
          </h3>

          <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}>
            Шифр Виженера использует ключевое слово для последовательного сдвига букв сообщения.
          </p>

          <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}>
            <strong>Наглядная схема</strong>
          </p>

          <div style={{ background: 'var(--dark)', color: 'white', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', textAlign: 'center' }}>
            <div style={{ marginBottom: '8px' }}>TEXT: &nbsp;&nbsp;&nbsp;П Р И В Е Т</div>
            <div style={{ marginBottom: '8px' }}>KEY: &nbsp;&nbsp;&nbsp;&nbsp;К Л Ю Ч К Л</div>
            <div style={{ marginBottom: '8px' }}>SHIFT: &nbsp;10 11 29 23 10 11</div>
            <div>CIPHER: &nbsp;Ъ Ь Ж Щ П Ю</div>
          </div>

          <p style={{ color: '#666', marginTop: '15px', fontSize: '13px' }}>
            <strong>Пример:</strong><br/>
            Исходный текст: ПРИВЕТ<br/>
            Ключ: КЛЮЧ<br/>
            Зашифровано: ЪЬЖЩПЮ
          </p>

        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid var(--border)' }}>

          <h3 style={{ color: 'var(--dark)', marginBottom: '15px', fontSize: '18px' }}>
            Попробуй сам
          </h3>

          <div className="form-group">
            <label style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '8px', display: 'block' }}>
              Режим
            </label>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <button
                className={mode === 'encrypt' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setMode('encrypt')}
                style={{ flex: 1, padding: '10px' }}
              >
                Шифрование
              </button>
              <button
                className={mode === 'decrypt' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setMode('decrypt')}
                style={{ flex: 1, padding: '10px' }}
              >
                Дешифрование
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="vigenere-input" style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '8px', display: 'block' }}>
              {mode === 'encrypt' ? 'Исходное сообщение' : 'Зашифрованное сообщение'}
            </label>
            <textarea
              id="vigenere-input"
              placeholder={mode === 'encrypt' ? "Введите ваше секретное сообщение здесь..." : "Введите зашифрованное сообщение здесь..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '14px', minHeight: '80px', resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="vigenere-key" style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '8px', display: 'block' }}>
              🔑 Ключевое слово
            </label>
            <input
              type="text"
              id="vigenere-key"
              placeholder="Например: КЛЮЧ"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={handleTransform} style={{ flex: '1' }}>
              {mode === 'encrypt' ? 'Зашифровать' : 'Расшифровать'}
            </button>
            <button className="btn-secondary" onClick={handleClear} style={{ flex: '1' }}>
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
              <div className="result-label">Результат:</div>
              <div className="result-text">{result}</div>
            </div>
          )}

        </div>

      </div>

      <div style={{ background: '#FFC107', borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
        <strong style={{ color: 'var(--dark)' }}>Попробуй другие шифры</strong>
        <div className="cipher-navigation" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '15px' }}>
          <button onClick={() => onBack('caesar')} style={{ background: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'var(--dark)' }}>
            Шифр Цезаря
          </button>
          <button onClick={() => onBack('vernam')} style={{ background: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'var(--dark)' }}>
            Шифр Вернама
          </button>
          <button onClick={() => onBack('polybius')} style={{ background: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'var(--dark)' }}>
            Шифр Полибия
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

export default VigenereCipher;