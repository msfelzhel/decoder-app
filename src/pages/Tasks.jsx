import React from 'react';

const Tasks = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="hero">
          <h1>Задания</h1>
          <p>Практические упражнения для закрепления знаний о шифрах</p>
        </div>
        
        <div className="about-section">
          <div className="cipher-info" style={{ textAlign: 'center', padding: '60px 30px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚧</div>
            <h3 style={{ color: 'var(--dark)', marginBottom: '15px', fontSize: '24px' }}>
              Раздел в разработке
            </h3>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
              Тут скоро появятся задания для понимания работы шифров
            </p>
            <p style={{ color: '#888', fontSize: '14px', marginTop: '20px' }}>
              Мы готовим интересные упражнения и тесты для проверки ваших знаний
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;