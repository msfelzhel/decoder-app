export const caesarEncrypt = (text, shift = 3) => {
  const russianAlphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  let result = '';

  for (let char of text.toUpperCase()) {
    if (russianAlphabet.includes(char)) {
      const index = russianAlphabet.indexOf(char);
      const newIndex = (index + shift) % russianAlphabet.length;
      result += russianAlphabet[newIndex];
    } else if (char === ' ') {
      result += ' ';
    } else {
      result += char;
    }
  }

  return result;
};

export const atbashTransform = (text) => {
  const russianAlphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  let result = '';

  for (let char of text.toUpperCase()) {
    if (russianAlphabet.includes(char)) {
      const index = russianAlphabet.indexOf(char);
      const newIndex = russianAlphabet.length - 1 - index;
      result += russianAlphabet[newIndex];
    } else if (char === ' ') {
      result += ' ';
    } else {
      result += char;
    }
  }

  return result;
};

export const dancingEncode = (text) => {
  const russianAlphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const dancingSymbols = ['🚶', '👯', '🕺', '💃', '👫', '👬', '👭', '🚶‍♀️', '🚶‍♂️', '👨', '👩', '🧑', '👶', '👧', '🧒', '👦', '👨‍🦱', '👩‍🦱', '👨‍🦲', '👩‍🦲', '👨‍🦳', '👩‍🦳', '👨‍🦰', '👩‍🦰', '👱‍♂️', '👱‍♀️'];
  
  let result = '';
  for (let char of text.toUpperCase()) {
    if (russianAlphabet.includes(char)) {
      const index = russianAlphabet.indexOf(char);
      result += dancingSymbols[index % dancingSymbols.length] + ' ';
    } else if (char === ' ') {
      result += '| ';
    } else {
      result += char + ' ';
    }
  }

  return result.trim();
};

export const morseEncode = (text) => {
  const morseDict = {
    'А': '·—', 'Б': '—···', 'В': '·——', 'Г': '——·', 'Д': '—··',
    'Е': '·', 'Ё': '·', 'Ж': '···—', 'З': '——··', 'И': '··',
    'Й': '·——', 'К': '—·—', 'Л': '·—··', 'М': '——', 'Н': '—·',
    'О': '———', 'П': '·——·', 'Р': '·—·', 'С': '···', 'Т': '—',
    'У': '··—', 'Ф': '··—·', 'Х': '····', 'Ц': '—·—·', 'Ч': '———·',
    'Ш': '————', 'Щ': '——·—', 'Ъ': '——·—', 'Ы': '—·——', 'Ь': '—··—',
    'Э': '··—··', 'Ю': '··——', 'Я': '·—·—',
    '0': '———', '1': '·————', '2': '··———', '3': '···——', '4': '····—',
    '5': '·····', '6': '—····', '7': '——···', '8': '———··', '9': '————·'
  };

  let result = '';
  for (let char of text.toUpperCase()) {
    if (morseDict[char]) {
      result += morseDict[char] + '  ';
    } else if (char === ' ') {
      result += ' / ';
    }
  }

  return result.trim();
};