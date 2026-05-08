import React, { useState } from "react";
import { polybiusEncrypt, polybiusDecrypt, saveHistory } from "../utils/ciphers";

const PolybiusCipher = ({ onBack }) => {

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encrypt");
  const [showResult, setShowResult] = useState(false);

  const handleTransform = () => {

    let transformed;

    if (mode === "encrypt") {
      transformed = polybiusEncrypt(input);
    } else {
      transformed = polybiusDecrypt(input);
    }

    setResult(transformed);
    setShowResult(true);

    saveHistory("Полибий", input, transformed);

  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setShowResult(false);
  };

  return (

    <div style={{ padding: "40px 0" }}>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "32px", color: "var(--dark)" }}>
          Шифр Полибия
        </h2>

        <p style={{ color: "#888", fontSize: "14px" }}>
          Каждая буква кодируется координатами в квадрате 5×5.
        </p>
      </div>

      <div
        className="two-column-layout"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "40px" }}
      >

        <div style={{ background: "white", borderRadius: "12px", padding: "25px", border: "1px solid var(--border)" }}>

          <h3>Как это работает</h3>

          <p style={{ color: "#666" }}>
            Шифр Полибия использует квадрат 5×5, где каждая буква заменяется координатами строки и столбца.
          </p>

          <div
            style={{
              background: "var(--dark)",
              color: "white",
              padding: "20px",
              borderRadius: "8px",
              fontFamily: "monospace",
              marginTop: "15px"
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "40px repeat(5, 1fr)", gap: "4px", marginBottom: "10px" }}>
              <div></div>
              <div style={{ textAlign: "center", fontWeight: "600", color: "var(--primary)" }}>1</div>
              <div style={{ textAlign: "center", fontWeight: "600", color: "var(--primary)" }}>2</div>
              <div style={{ textAlign: "center", fontWeight: "600", color: "var(--primary)" }}>3</div>
              <div style={{ textAlign: "center", fontWeight: "600", color: "var(--primary)" }}>4</div>
              <div style={{ textAlign: "center", fontWeight: "600", color: "var(--primary)" }}>5</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "40px repeat(5, 1fr)", gap: "4px", marginBottom: "4px" }}>
              <div style={{ fontWeight: "600", color: "var(--primary)" }}>1</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>А</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Б</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>В</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Г</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Д</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "40px repeat(5, 1fr)", gap: "4px", marginBottom: "4px" }}>
              <div style={{ fontWeight: "600", color: "var(--primary)" }}>2</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Е</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Ж</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>З</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>И</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>К</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "40px repeat(5, 1fr)", gap: "4px", marginBottom: "4px" }}>
              <div style={{ fontWeight: "600", color: "var(--primary)" }}>3</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Л</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>М</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Н</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>О</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>П</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "40px repeat(5, 1fr)", gap: "4px", marginBottom: "4px" }}>
              <div style={{ fontWeight: "600", color: "var(--primary)" }}>4</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Р</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>С</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Т</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>У</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Ф</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "40px repeat(5, 1fr)", gap: "4px", marginBottom: "15px" }}>
              <div style={{ fontWeight: "600", color: "var(--primary)" }}>5</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Х</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Ц</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Ч</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Ш</div>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>Щ</div>
            </div>

            <div style={{ fontSize: "13px", color: "#aaa", marginTop: "15px", textAlign: "center" }}>
              <p style={{ marginBottom: "8px" }}>💡 <strong>Пример:</strong> А = 11, Б = 12, В = 13</p>
              <p style={{ color: "var(--primary)", fontWeight: "600" }}>ПРИВЕТ → 35 41 24 13 21 43</p>
            </div>

          </div>

        </div>

        <div style={{ background: "white", borderRadius: "12px", padding: "25px", border: "1px solid var(--border)" }}>

          <h3>Попробуй сам</h3>

          <div className="form-group">
            <label style={{ fontWeight: "600", color: "var(--dark)", marginBottom: "8px", display: "block" }}>
              Режим
            </label>
            <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
              <button
                className={mode === "encrypt" ? "btn-primary" : "btn-secondary"}
                onClick={() => setMode("encrypt")}
                style={{ flex: 1, padding: "10px" }}
              >
                Шифрование
              </button>
              <button
                className={mode === "decrypt" ? "btn-primary" : "btn-secondary"}
                onClick={() => setMode("decrypt")}
                style={{ flex: 1, padding: "10px" }}
              >
                Дешифрование
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="polybius-input" style={{ fontWeight: "600", color: "var(--dark)", marginBottom: "8px", display: "block" }}>
              {mode === "encrypt" ? "Исходное сообщение" : "Зашифрованное сообщение"}
            </label>
            <textarea
              id="polybius-input"
              placeholder={mode === "encrypt" ? "Введите ваше сообщение здесь..." : "Введите координаты (например: 35 41 24)..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "6px", fontFamily: "inherit", fontSize: "14px", minHeight: "80px", resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            <button className="btn-primary" onClick={handleTransform} style={{ flex: "1" }}>
              {mode === "encrypt" ? "Зашифровать" : "Расшифровать"}
            </button>
            <button className="btn-secondary" onClick={handleClear} style={{ flex: "1" }}>
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

      <div style={{ background: "#FFC107", borderRadius: "12px", padding: "20px", marginBottom: "30px" }}>
        <strong style={{ color: "var(--dark)" }}>Попробуй другие шифры</strong>
        <div className="cipher-navigation" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginTop: "15px" }}>
          <button onClick={() => onBack("caesar")} style={{ background: "white", border: "none", padding: "15px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "var(--dark)" }}>
            Шифр Цезаря
          </button>
          <button onClick={() => onBack("rail")} style={{ background: "white", border: "none", padding: "15px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "var(--dark)" }}>
            Rail Fence
          </button>
          <button onClick={() => onBack("vigenere")} style={{ background: "white", border: "none", padding: "15px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "var(--dark)" }}>
            Шифр Виженера
          </button>
        </div>
      </div>

      <button
        className="btn-secondary"
        onClick={() => onBack("home")}
        style={{ width: "100%", padding: "12px" }}
      >
        ← Вернуться на главную
      </button>

    </div>

  );

};

export default PolybiusCipher;