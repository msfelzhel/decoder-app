import React, { useState } from 'react';
import { caesarEncrypt, caesarDecrypt, saveHistory } from '../utils/ciphers';

const CaesarCipher = ({ onBack }) => {

  const [input, setInput] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [mode, setMode] = useState('encrypt');

  const handleTransform = () => {

    let transformed;

    if (mode === 'encrypt') {
      transformed = caesarEncrypt(input, shift);
    } else {
      transformed = caesarDecrypt(input, shift);
    }

    setResult(transformed);
    setShowResult(true);

    saveHistory("Шифр Цезаря", input, transformed);

  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setShowResult(false);
  };

  return (

    <div style={{ padding: '40px 0' }}>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', color: 'var(--dark)', marginBottom: '10px' }}>
          Шифр Цезаря
        </h2>

        <p style={{ color: '#888', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
          Простой и классический способ отправки секретных сообщений путём сдвига каждой буквы на определённое количество мест в алфавите.
        </p>
      </div>

      <div
        className="two-column-layout"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}
      >

        {/* Левая колонка */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid var(--border)' }}>

          <h3 style={{ color: 'var(--dark)', marginBottom: '15px', fontSize: '18px' }}>
            Как это работает
          </h3>

          <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}>
            Шифр Цезаря заменяет буквы в алфавитном порядке, чтобы скрыть сообщение.
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
            <div>PLAINTEXT</div>
            <div>А Б В Г Д Е Ё Ж</div>
            <div>↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓</div>
            <div>Г Д Е Ё Ж З И Й</div>
            <div>CIPHERTEXT (сдвиг +3)</div>
          </div>

          <p style={{ color: '#666', marginTop: '15px', fontSize: '13px' }}>
            <strong>Пример:</strong><br/>
            Исходный текст: ПРИВЕТ<br/>
            Ключ (сдвиг): 3<br/>
            Зашифровано: ТУЛЕИХ
          </p>

        </div>


        {/* Правая колонка */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid var(--border)' }}>

          <h3 style={{ color: 'var(--dark)', marginBottom: '15px', fontSize: '18px' }}>
            Попробуй сам
          </h3>

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

            <label>
              {mode === 'encrypt' ? 'Исходное сообщение' : 'Зашифрованное сообщение'}
            </label>

            <textarea
              placeholder="Введите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Секретный ключ (сдвиг)</label>

            <input
              type="number"
              min="1"
              max="32"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value) || 3)}
            />

          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>

            <button className="btn-primary" onClick={handleTransform} style={{ flex: 1 }}>
              {mode === 'encrypt' ? 'Зашифровать' : 'Расшифровать'}
            </button>

            <button className="btn-secondary" onClick={handleClear} style={{ flex: 1 }}>
              Очистить
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigator.clipboard.writeText(result)}
            >
              Скопировать
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


      {/* Попробуй другие шифры */}
      <div style={{ background: '#FFC107', borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
        <strong style={{ color: 'var(--dark)' }}>Попробуй другие шифры</strong>
        <div className="cipher-navigation" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '15px' }}>
          <button onClick={() => onBack('atbash')} style={{ background: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'var(--dark)' }}>
            Шифр Атбаш
          </button>
          <button onClick={() => onBack('dancing')} style={{ background: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'var(--dark)' }}>
            Пляшущие человечки
          </button>
          <button onClick={() => onBack('morse')} style={{ background: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'var(--dark)' }}>
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

export default CaesarCipher;