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

  const handleClear = () => {
    setInput("");
    setResult("");
    setShowResult(false);
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

          {/* Графическая визуализация без функций */}
          <div
            style={{
              background: "var(--dark)",
              color: "white",
              padding: "20px",
              borderRadius: "8px",
              fontFamily: "monospace",
              marginTop: "15px",
              overflowX: "auto"
            }}
          >
            {/* Исходный текст */}
            <div style={{ 
              fontSize: "14px", 
              letterSpacing: "10px",
              marginBottom: "15px",
              textAlign: "center",
              color: "#fff"
            }}>
              H&nbsp;&nbsp;E&nbsp;&nbsp;L&nbsp;&nbsp;L&nbsp;&nbsp;O&nbsp;&nbsp;W&nbsp;&nbsp;O&nbsp;&nbsp;R&nbsp;&nbsp;L&nbsp;&nbsp;D
            </div>

            {/* Сетка 3 строки с отступом слева */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(13, 1fr)",
              gap: "4px",
              marginBottom: "15px"
            }}>
              {/* Строка 1 */}
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", borderRadius: "4px", fontWeight: "600" }}>H</div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", borderRadius: "4px", fontWeight: "600" }}>O</div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", borderRadius: "4px", fontWeight: "600" }}>L</div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>

              {/* Строка 2 */}
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", borderRadius: "4px", fontWeight: "600" }}>E</div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", borderRadius: "4px", fontWeight: "600" }}>L</div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", borderRadius: "4px", fontWeight: "600" }}>W</div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", borderRadius: "4px", fontWeight: "600" }}>R</div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", borderRadius: "4px", fontWeight: "600" }}>D</div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>

              {/* Строка 3 */}
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", borderRadius: "4px", fontWeight: "600" }}>L</div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary)", borderRadius: "4px", fontWeight: "600" }}>O</div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
              <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", borderRadius: "4px" }}></div>
            </div>

            {/* Зашифрованный текст */}
            <div style={{ 
              fontSize: "14px", 
              letterSpacing: "10px",
              textAlign: "center",
              color: "var(--primary)",
              fontWeight: "600"
            }}>
              H&nbsp;&nbsp;O&nbsp;&nbsp;L&nbsp;&nbsp;E&nbsp;&nbsp;L&nbsp;&nbsp;W&nbsp;&nbsp;R&nbsp;&nbsp;D&nbsp;&nbsp;L&nbsp;&nbsp;O
            </div>

            <p style={{ fontSize: "12px", color: "#aaa", marginTop: "15px", fontStyle: "italic" }}>
              💡 Читаем по строкам: 1-я → 2-я → 3-я
            </p>

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
            <label htmlFor="rail-input" style={{ fontWeight: "600", color: "var(--dark)", marginBottom: "8px", display: "block" }}>
              {mode === "encrypt" ? "Исходное сообщение" : "Зашифрованное сообщение"}
            </label>
            <textarea
              id="rail-input"
              placeholder={mode === "encrypt" ? "Введите ваше сообщение здесь..." : "Введите зашифрованное сообщение здесь..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "6px", fontFamily: "inherit", fontSize: "14px", minHeight: "80px", resize: "vertical" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rail-rails" style={{ fontWeight: "600", color: "var(--dark)", marginBottom: "8px", display: "block" }}>
              🔑 Ключ (количество строк)
            </label>
            <input
              type="number"
              id="rail-rails"
              min="2"
              max="10"
              value={rails}
              onChange={(e) => setRails(parseInt(e.target.value) || 3)}
              style={{ width: "100%", padding: "12px", border: "1px solid var(--border)", borderRadius: "6px", fontFamily: "inherit", fontSize: "14px" }}
            />
          </div>

          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            <button className="btn-primary" onClick={handleTransform} style={{ flex: "1" }}>
              {mode === "encrypt" ? "Зашифровать" : "Расшифровать"}
            </button>
            <button className="btn-secondary" onClick={handleClear} style={{ flex: "1" }}>
              Очистить
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
          <button onClick={() => onBack("polybius")} style={{ background: "white", border: "none", padding: "15px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "var(--dark)" }}>
            Шифр Полибия
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

export default RailFenceCipher;