// Русский алфавит с буквой Ё
const RUSSIAN_ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

// Шифр Цезаря
export const caesarEncrypt = (text, shift = 3) => {
  let result = '';

  for (let char of text.toUpperCase()) {
    if (RUSSIAN_ALPHABET.includes(char)) {
      const index = RUSSIAN_ALPHABET.indexOf(char);
      const newIndex = (index + shift) % RUSSIAN_ALPHABET.length;
      result += RUSSIAN_ALPHABET[newIndex];
    } else if (char === ' ') {
      result += ' ';
    } else {
      result += char;
    }
  }

  return result;
};

export const caesarDecrypt = (text, shift = 3) => {
  let result = '';

  for (let char of text.toUpperCase()) {
    if (RUSSIAN_ALPHABET.includes(char)) {
      const index = RUSSIAN_ALPHABET.indexOf(char);
      const newIndex = (index - shift + RUSSIAN_ALPHABET.length) % RUSSIAN_ALPHABET.length;
      result += RUSSIAN_ALPHABET[newIndex];
    } else if (char === ' ') {
      result += ' ';
    } else {
      result += char;
    }
  }

  return result;
};

// Шифр Атбаш
export const atbashTransform = (text) => {
  let result = '';

  for (let char of text.toUpperCase()) {
    if (RUSSIAN_ALPHABET.includes(char)) {
      const index = RUSSIAN_ALPHABET.indexOf(char);
      const newIndex = RUSSIAN_ALPHABET.length - 1 - index;
      result += RUSSIAN_ALPHABET[newIndex];
    } else if (char === ' ') {
      result += ' ';
    } else {
      result += char;
    }
  }

  return result;
};

// Пляшущие человечки
const DANCING_SYMBOLS = ['🚶', '👯', '🕺', '💃', '👫', '👬', '👭', '🚶‍♀️', '🚶‍♂️', '👨', '👩', '🧑', '👶', '👧', '🧒', '👦', '👨‍🦱', '👩‍🦱', '👨‍🦲', '👩‍🦲', '👨‍🦳', '👩‍🦳', '👨‍🦰', '👩‍🦰', '👱‍♂️', '👱‍♀️', '👴', '👵', '🧓', '👨‍⚕️', '👩‍⚕️', '👨‍🎓', '👩‍🎓'];

export const dancingEncode = (text) => {
  let result = '';
  for (let char of text.toUpperCase()) {
    if (RUSSIAN_ALPHABET.includes(char)) {
      const index = RUSSIAN_ALPHABET.indexOf(char);
      result += DANCING_SYMBOLS[index % DANCING_SYMBOLS.length] + ' ';
    } else if (char === ' ') {
      result += '| ';
    } else {
      result += char + ' ';
    }
  }
  return result.trim();
};

export const dancingDecode = (encodedText) => {
  const symbols = encodedText.split(' ').filter(symbol => symbol.length > 0);
  let result = '';

  for (let symbol of symbols) {
    if (symbol === '|') {
      result += ' ';
    } else {
      const index = DANCING_SYMBOLS.indexOf(symbol);
      if (index !== -1 && index < RUSSIAN_ALPHABET.length) {
        result += RUSSIAN_ALPHABET[index];
      } else {
        result += symbol;
      }
    }
  }

  return result;
};

// Азбука Морзе
const MORSE_DICT = {
  'А': '·—', 'Б': '—···', 'В': '·——', 'Г': '——·', 'Д': '—··',
  'Е': '·', 'Ё': '·', 'Ж': '···—', 'З': '——··', 'И': '··',
  'Й': '·———', 'К': '—·—', 'Л': '·—··', 'М': '——', 'Н': '—·',
  'О': '———', 'П': '·——·', 'Р': '·—·', 'С': '···', 'Т': '—',
  'У': '··—', 'Ф': '··—·', 'Х': '····', 'Ц': '—·—·', 'Ч': '———·',
  'Ш': '————', 'Щ': '——·—', 'Ъ': '——·—', 'Ы': '—·——', 'Ь': '—··—',
  'Э': '··—··', 'Ю': '··——', 'Я': '·—·—',
  '0': '—————', '1': '·————', '2': '··———', '3': '···——', '4': '····—',
  '5': '·····', '6': '—····', '7': '——···', '8': '———··', '9': '————·',
  '.': '······', ',': '·—·—·—', '?': '··——··', '!': '——··——'
};

// Создаем обратный словарь для декодирования
const MORSE_REVERSE_DICT = {};
Object.keys(MORSE_DICT).forEach(key => {
  MORSE_REVERSE_DICT[MORSE_DICT[key]] = key;
});

export const morseEncode = (text) => {
  let result = '';
  for (let char of text.toUpperCase()) {
    if (MORSE_DICT[char]) {
      result += MORSE_DICT[char] + ' ';
    } else if (char === ' ') {
      result += '/ ';
    } else {
      result += char + ' ';
    }
  }
  return result.trim();
};

export const morseDecode = (morseCode) => {
  const words = morseCode.split(' / ');
  let result = '';

  for (let word of words) {
    const letters = word.split(' ');
    for (let morseLetter of letters) {
      if (MORSE_REVERSE_DICT[morseLetter]) {
        result += MORSE_REVERSE_DICT[morseLetter];
      } else if (morseLetter) {
        result += morseLetter;
      }
    }
    result += ' ';
  }

  return result.trim();
};