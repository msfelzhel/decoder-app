import React, { useState } from 'react';
import { caesarEncrypt } from '../utils/ciphers';

const CaesarCipher = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleEncrypt = () => {
    const encrypted = caesarEncrypt(input, shift);
    setResult(encrypted);
    setShowResult(true);
  };

  const handleClear = () => {
    setInput('');
    setShowResult(false);
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <h2 style={{ fontSize: '32px', color: 'var(--dark)', marginBottom: '10px' }}>Шифр Цезаря</h2>
      <p style={{ color: '#888', marginBottom: '40px', fontSize: '14px' }}>
        Простой и классический способ отправки секретных сообщений путём сдвига каждого буква на определённое количество мест в алфавите.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--dark)', marginBottom: '15px', fontSize: '18px' }}>Как это работает</h3>
          <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}>
            Шифр Цезаря подменяет буквы в алфавитном порядке, чтобы скрыть своё сообщение.
          </p>
          <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}><strong>Наглядная схема</strong></p>
          <div style={{ background: 'var(--dark)', color: 'white', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', textAlign: 'center' }}>
            <div style={{ marginBottom: '8px' }}>PLAINTEXT</div>
            <div style={{ marginBottom: '8px' }}>А Б В Г Д Е Ё Ж</div>
            <div style={{ marginBottom: '8px' }}>↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓</div>
            <div style={{ marginBottom: '8px' }}>Г Д Е Ё Ж З И Й</div>
            <div>CIPHERTEXT (сдвиг +3)</div>
          </div>
          <p style={{ color: '#666', marginTop: '15px', fontSize: '13px' }}>
            <strong>Пример:</strong><br />
            Исходный текст: ПРИВЕТ<br />
            Ключ (сдвиг): 3<br />
            Зашифровано: ТУЛХИВ
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--dark)', marginBottom: '15px', fontSize: '18px' }}>Попробуй сам</h3>
          <div className="form-group">
            <label htmlFor="caesar-input" style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '8px', display: 'block' }}>
              Ваше сообщение
            </label>
            <textarea
              id="caesar-input"
              placeholder="Введите ваше секретное сообщение здесь . . ."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '14px', minHeight: '80px', resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="caesar-shift" style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '8px', display: 'block' }}>
              Секретный ключ (Величина сдвига)
            </label>
            <input
              type="number"
              id="caesar-shift"
              min="1"
              max="32"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value))}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <button className="btn-primary" onClick={handleEncrypt} style={{ flex: '1' }}>
              Зашифровать
            </button>
            <button className="btn-secondary" onClick={handleClear} style={{ flex: '1' }}>
              Очистить
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '15px' }}>
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

      <button className="btn-secondary" onClick={() => onBack('home')} style={{ width: '100%', padding: '12px', marginTop: '20px' }}>
        ← Вернуться на главную
      </button>
    </div>
  );
};

export default CaesarCipher;