import React, { memo } from 'react';

const CipherCard = memo(({ title, description, onClick }) => {
  return (
    <div className="cipher-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <a className="learn-btn">Узнать больше →</a>
    </div>
  );
});

export default CipherCard;