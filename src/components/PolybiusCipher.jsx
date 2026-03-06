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

        {/* Как работает */}

        <div style={{ background: "white", borderRadius: "12px", padding: "25px", border: "1px solid var(--border)" }}>

          <h3>Как это работает</h3>

          <p style={{ color: "#666" }}>
            Шифр Полибия использует квадрат 5×5, где каждая буква заменяется координатами строки и столбца.
          </p>

          <div
            style={{
              background: "var(--dark)",
              color: "white",
              padding: "15px",
              borderRadius: "8px",
              fontFamily: "monospace",
              textAlign: "center"
            }}
          >

            А = 11  
            Б = 12  
            В = 13  

          </div>

        </div>

        {/* Попробуй сам */}

        <div style={{ background: "white", borderRadius: "12px", padding: "25px", border: "1px solid var(--border)" }}>

          <h3>Попробуй сам</h3>

          <textarea
            placeholder="Введите сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>

            <button className="btn-primary" onClick={handleTransform}>
              Преобразовать
            </button>

            <button className="btn-secondary" onClick={handleClear}>
              Очистить
            </button>

          </div>

          {showResult && (
            <div className="result show">

              <div className="result-label">
                Результат
              </div>

              <div className="result-text">
                {result}
              </div>

            </div>
          )}

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