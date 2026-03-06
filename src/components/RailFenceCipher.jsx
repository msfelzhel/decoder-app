import React, { useState } from "react";
import { railFenceEncrypt, railFenceDecrypt, saveHistory } from "../utils/ciphers";

const RailFenceCipher = ({ onBack }) => {

  const [input, setInput] = useState("");
  const [rails, setRails] = useState(3);
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encrypt");
  const [showResult, setShowResult] = useState(false);

  const handleTransform = () => {

    let transformed;

    if (mode === "encrypt") {
      transformed = railFenceEncrypt(input, rails);
    } else {
      transformed = railFenceDecrypt(input, rails);
    }

    setResult(transformed);
    setShowResult(true);

    saveHistory("Rail Fence", input, transformed);

  };

  return (

    <div style={{ padding: "40px 0" }}>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "32px", color: "var(--dark)" }}>
          Rail Fence
        </h2>

        <p style={{ color: "#888", fontSize: "14px" }}>
          Шифр, записывающий текст по диагонали в несколько строк.
        </p>
      </div>

      <div
        className="two-column-layout"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "40px" }}
      >

        <div style={{ background: "white", borderRadius: "12px", padding: "25px", border: "1px solid var(--border)" }}>

          <h3>Как это работает</h3>

          <p style={{ color: "#666" }}>
            Текст записывается по диагонали вниз и вверх между строками.
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

            H   O   L  
             E L W R D  
              L   O  

          </div>

        </div>

        <div style={{ background: "white", borderRadius: "12px", padding: "25px", border: "1px solid var(--border)" }}>

          <h3>Попробуй сам</h3>

          <textarea
            placeholder="Введите сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <input
            type="number"
            value={rails}
            onChange={(e) => setRails(parseInt(e.target.value))}
          />

          <button className="btn-primary" onClick={handleTransform}>
            Преобразовать
          </button>

          {showResult && (
            <div className="result show">
              <div className="result-text">{result}</div>
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

export default RailFenceCipher;