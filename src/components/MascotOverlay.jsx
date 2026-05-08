import React, { useState } from 'react';

const FOX_IMGS = {
  normal: '/img/fox-normal.png',
  smart: '/img/fox-smart.png',
  explain: '/img/fox-explain.png'
};

// lines = [{ img: 'smart', text: '...', hint: '...' (опционально) }]
const MascotOverlay = ({ lines, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!lines || lines.length === 0) return null;

  const line = lines[currentIdx];
  const isLast = currentIdx === lines.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  };

  return (
    <div className="mascot-overlay" onClick={handleNext}>
      <div className="mascot-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="mascot-bubble">
          <p>{line.text}</p>
          {line.hint && (
            <span className="mascot-hint">{line.hint}</span>
          )}
          <button className="bubble-next" onClick={handleNext}>
            {isLast ? 'Понятно!' : 'Далее \u2192'}
          </button>
        </div>
        <img
          src={FOX_IMGS[line.img] || FOX_IMGS.smart}
          className="mascot-img"
          alt="Лисёнок"
        />
      </div>
    </div>
  );
};

export default MascotOverlay;
