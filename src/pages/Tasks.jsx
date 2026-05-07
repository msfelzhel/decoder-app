import React from 'react';

const Tasks = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="hero">
          <h1>Задания</h1>
          <p>Практические упражнения для закрепления знаний о шифрах</p>
        </div>
        
        <div className="about-section" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
          <div 
            className="cipher-info" 
            style={{ 
              textAlign: 'center', 
              padding: '60px 30px',
              maxWidth: '700px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '24px', textAlign: 'center' }}>🚧</div>
            
            <h3 style={{ 
              color: 'var(--dark)', 
              marginBottom: '20px', 
              fontSize: '26px',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Раздел в разработке
            </h3>
            
            <p style={{ 
              color: 'var(--gray)', 
              fontSize: '16px', 
              lineHeight: '1.8',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              Тут скоро появятся задания для понимания работы шифров
            </p>
            
            <p style={{ 
              color: 'var(--gray)', 
              fontSize: '14px',
              textAlign: 'center',
              opacity: '0.9'
            }}>
              Мы готовим интересные упражнения и тесты для проверки ваших знаний
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;