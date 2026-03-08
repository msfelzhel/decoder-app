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

// =====================
// Шифр Виженера
// =====================

export const vigenereEncrypt = (text, key) => {
  if (!key) return text;

  const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const upperText = text.toUpperCase();
  const upperKey = key.toUpperCase();

  let result = '';
  let keyIndex = 0;

  for (let char of upperText) {
    const textIndex = alphabet.indexOf(char);

    if (textIndex === -1) {
      result += char;
      continue;
    }

    const keyChar = upperKey[keyIndex % upperKey.length];
    const keyIndexAlphabet = alphabet.indexOf(keyChar);

    const newIndex = (textIndex + keyIndexAlphabet) % alphabet.length;

    result += alphabet[newIndex];
    keyIndex++;
  }

  return result;
};

export const vigenereDecrypt = (text, key) => {
  if (!key) return text;

  const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const upperText = text.toUpperCase();
  const upperKey = key.toUpperCase();

  let result = '';
  let keyIndex = 0;

  for (let char of upperText) {
    const textIndex = alphabet.indexOf(char);

    if (textIndex === -1) {
      result += char;
      continue;
    }

    const keyChar = upperKey[keyIndex % upperKey.length];
    const keyIndexAlphabet = alphabet.indexOf(keyChar);

    const newIndex =
      (textIndex - keyIndexAlphabet + alphabet.length) % alphabet.length;

    result += alphabet[newIndex];
    keyIndex++;
  }

  return result;
};

// =====================
// Шифр Вернама
// =====================

export const vernamCipher = (text, key) => {
  if (!key) return text;

  let result = '';

  for (let i = 0; i < text.length; i++) {
    const textCode = text.charCodeAt(i);
    const keyCode = key.charCodeAt(i % key.length);

    result += String.fromCharCode(textCode ^ keyCode);
  }

  return result;
};

// =====================
// Сохранение Истории
// =====================

export const saveHistory = async (type, input, result) => {
  // Вспомогательная функция для локального сохранения (фоллбек)
  const saveLocally = () => {
    try {
      const history = JSON.parse(localStorage.getItem("cipherHistory")) || [];
      history.push({ type, input, result });
      
      if (history.length > 20) {
        history.shift();
      }
      
      localStorage.setItem("cipherHistory", JSON.stringify(history));
    } catch (e) {
      console.error("Ошибка localStorage:", e);
    }
  };

  const user = localStorage.getItem("user");

  // Если пользователь не авторизован (нет имени) — просто сохраняем локально и выходим
  if (!user) {
    saveLocally();
    return;
  }

  // Если авторизован — пробуем отправить на сервер
  try {
    const response = await fetch("http://localhost:8000/api/history/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include', // ВАЖНО: прикрепляем HttpOnly куку с токеном
      body: JSON.stringify({ type, input, result })
    });

    if (!response.ok) {
      throw new Error("Ошибка сервера при сохранении истории");
    }

    // Сохраняем локально тоже, чтобы интерфейс (HistoryPanel) обновился сразу,
    // не дожидаясь, пока мы скачаем историю с сервера отдельным запросом
    saveLocally();

  } catch (error) {
    console.warn("Не удалось сохранить на сервер, используем локальное хранилище:", error.message);
    // Срабатывает фоллбек, если нет интернета или бэкенд недоступен
    saveLocally();
  }
};

// =====================
// Rail Fence Cipher
// =====================

export const railFenceEncrypt = (text, rails = 3) => {

  if (!text) return "";

  let fence = Array.from({ length: rails }, () => []);
  let rail = 0;
  let direction = 1;

  for (let char of text) {
    fence[rail].push(char);
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  return fence.flat().join("");

};

export const railFenceDecrypt = (cipher, rails = 3) => {

  let fence = Array.from({ length: rails }, () => Array(cipher.length).fill(null));

  let rail = 0;
  let direction = 1;

  for (let i = 0; i < cipher.length; i++) {
    fence[rail][i] = "*";
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  let index = 0;

  for (let r = 0; r < rails; r++) {
    for (let c = 0; c < cipher.length; c++) {
      if (fence[r][c] === "*" && index < cipher.length) {
        fence[r][c] = cipher[index++];
      }
    }
  }

  let result = "";
  rail = 0;
  direction = 1;

  for (let i = 0; i < cipher.length; i++) {
    result += fence[rail][i];
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  return result;

};


// =====================
// Polybius Cipher
// =====================

const polybiusSquare = {
  А: "11", Б: "12", В: "13", Г: "14", Д: "15",
  Е: "21", Ж: "22", З: "23", И: "24", К: "25",
  Л: "31", М: "32", Н: "33", О: "34", П: "35",
  Р: "41", С: "42", Т: "43", У: "44", Ф: "45",
  Х: "51", Ц: "52", Ч: "53", Ш: "54", Щ: "55"
};

export const polybiusEncrypt = (text) => {

  return text
    .toUpperCase()
    .split("")
    .map(char => polybiusSquare[char] || char)
    .join(" ");

};

export const polybiusDecrypt = (cipher) => {

  const reverse = Object.fromEntries(
    Object.entries(polybiusSquare).map(([k, v]) => [v, k])
  );

  return cipher
    .split(" ")
    .map(code => reverse[code] || code)
    .join("");

};
