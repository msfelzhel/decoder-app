import React, { useState } from 'react';
import { dancingEncode, dancingDecode, saveHistory } from '../utils/ciphers';

const DancingMenCipher = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [mode, setMode] = useState('encode');

  const handleTransform = () => {
    let transformed;
    if (mode === 'encode') {
      transformed = dancingEncode(input);
    } else {
      transformed = dancingDecode(input);
    }
    setResult(transformed);
    setShowResult(true);
    saveHistory("Пляшущие человечки", input, transformed);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setShowResult(false);
  };

  return (
    <div style={{ padding: '40px 0' }}>
      {/* Центрированный заголовок и описание */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', color: 'var(--dark)', marginBottom: '10px' }}>Пляшущие человечки</h2>
        <p style={{ color: '#888', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
          Геометрический шифр, использующий символы вместо букв.
        </p>
      </div>

      <div className="two-column-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        <div style={{ background: '#fcfeff', borderRadius: '12px', padding: '25px', border: '3px solid var(--border)' }}>
          <h3 style={{ color: 'var(--dark)', marginBottom: '15px', fontSize: '18px' }}>Как это работает</h3>
          <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}>
            Каждая буква кодируется с помощью геометрических фигур (крестики, палочки, точки).
          </p>
          <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}><strong>Наглядная схема</strong></p>
          <div style={{ background: 'var(--dark)', color: '#fcfeff', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', marginBottom: '10px', letterSpacing: '5px' }}>🚶 👯 🕺 💃 👫</div>
            <div style={{ fontSize: '12px' }}>А Б В Г Д</div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', letterSpacing: '5px', marginTop: '10px' }}>👬 👭 🧑 👶 👧</div>
            <div style={{ fontSize: '12px' }}>Е Ё Ж З И</div>
          </div>
          <p style={{ color: '#666', marginTop: '15px', fontSize: '13px' }}>
            <strong>Пример:</strong><br />
            Исходный текст: АБВ<br />
            Зашифровано: 🚶 👯 🕺
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '3px solid var(--border)' }}>
          <h3 style={{ color: 'var(--dark)', marginBottom: '15px', fontSize: '18px' }}>Попробуй сам</h3>

          <div className="form-group">
            <label style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '8px', display: 'block' }}>
              Режим
            </label>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <button
                className={mode === 'encode' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setMode('encode')}
                style={{ flex: 1, padding: '10px' }}
              >
                Кодирование
              </button>
              <button
                className={mode === 'decode' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setMode('decode')}
                style={{ flex: 1, padding: '10px' }}
              >
                Декодирование
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dancing-input" style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '8px', display: 'block' }}>
              {mode === 'encode' ? 'Исходное сообщение' : 'Закодированное сообщение'}
            </label>
            <textarea
              id="dancing-input"
              placeholder={mode === 'encode' ? "Введите ваше секретное сообщение здесь..." : "Введите закодированное сообщение здесь..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'inherit', fontSize: '14px', minHeight: '80px', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={handleTransform} style={{ flex: '1' }}>
              {mode === 'encode' ? 'Закодировать' : 'Декодировать'}
            </button>
            <button className="btn-secondary" onClick={handleClear} style={{ flex: '1' }}>
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
              <div className="result-label">Результат:</div>
              <div className="result-text">{result}</div>
            </div>
          )}
        </div>
      </div>

{/* Попробуй другие шифры */}
<div style={{ maxWidth: '800px', margin: '0 auto' }}>
  <div 
    className="cipher-info"
    style={{ 
      marginBottom: '30px',
      padding: '10px 24px',
      textAlign: 'center'
    }}
  >
    <h3 style={{ 
      color: 'var(--dark)', 
      marginBottom: '16px',
      fontSize: '18px',
      fontWeight: '600'
    }}>
      ⚡ Попробуй другие шифры
    </h3>
    <div className="cipher-navigation">
      <button onClick={() => onBack('caesar')}>Шифр Цезаря</button>
      <button onClick={() => onBack('atbash')}>Шифр Атбаш</button>
      <button onClick={() => onBack('morse')}>Азбука Морзе</button>
    </div>
  </div>
</div>

      <button className="btn-secondary" onClick={() => onBack('home')} style={{ width: '100%', padding: '12px', marginTop: '10px' }}>
        ← Вернуться на главную
      </button>
    </div>
  );
};

export default DancingMenCipher;