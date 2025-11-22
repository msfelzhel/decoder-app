import React from 'react';

const CipherCard = ({ title, description, onClick }) => {
  return (
    <div className="cipher-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <a className="learn-btn">Узнать больше →</a>
    </div>
  );
};

export default CipherCard;