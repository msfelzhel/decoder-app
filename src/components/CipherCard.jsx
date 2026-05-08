import React from 'react';

const CipherCard = ({ title, description, onClick, locked }) => {
  return (
    <div
      className={`cipher-card${locked ? ' cipher-card-locked' : ''}`}
      onClick={onClick}
      style={locked ? { opacity: 0.5, cursor: 'not-allowed', position: 'relative' } : {}}
    >
      {locked && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '20px'
        }}>
          &#128274;
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <a className="learn-btn">
        {locked ? 'Выполните задания' : 'Узнать больше \u2192'}
      </a>
    </div>
  );
};

export default CipherCard;