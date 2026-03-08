import React, { useState } from 'react';
import { vernamCipher, saveHistory } from '../utils/ciphers';

const VernamCipher = ({ onBack }) => {

  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [mode, setMode] = useState('encrypt');

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
          🔐 Шифр Вернама
        </h2>

        <p style={{ color: '#888', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
          Шифр Вернама — криптосистема, основанная на операции XOR между символами текста и ключа.
        </p>
      </div>

      <div
        className="two-column-layout"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}
      >

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
            Текст: 10101010  <br/>
            Ключ: 11001100  <br/>
            XOR: 01100110
          </div>

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
            <label htmlFor="vernam-input" style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '8px', display: 'block' }}>
              {mode === 'encrypt' ? 'Исходное сообщение' : 'Зашифрованное сообщение'}
            </label>
            <textarea
              id="vernam-input"
              placeholder={mode === 'encrypt' ? "Введите ваше секретное сообщение здесь..." : "Введите зашифрованное сообщение здесь..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '14px', minHeight: '80px', resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="vernam-key" style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '8px', display: 'block' }}>
              🔑 Ключ
            </label>
            <input
              type="text"
              id="vernam-key"
              placeholder="Например: СЕКРЕТ"
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
          <button onClick={() => onBack('vigenere')} style={{ background: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'var(--dark)' }}>
            Шифр Виженера
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

export default VernamCipher;