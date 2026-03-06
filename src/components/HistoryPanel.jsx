import React from 'react';

const HistoryPanel = () => {

  const history = JSON.parse(localStorage.getItem("cipherHistory")) || [];

  const clearHistory = () => {
    localStorage.removeItem("cipherHistory");
    window.location.reload();
  };

  if (history.length === 0) return null;

  return (

    <div className="container" style={{ marginTop: "40px" }}>

      <div className="cipher-tool">

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px"
        }}>

          <h3>История операций</h3>

          <button
            className="btn-secondary"
            onClick={clearHistory}
          >
            Очистить историю
          </button>

        </div>

        {history.slice().reverse().map((item, index) => (

          <div
            key={index}
            style={{
              padding: "10px",
              borderBottom: "1px solid var(--border)"
            }}
          >

            <strong>{item.type}</strong>

            <div style={{
              fontSize: "14px",
              color: "#666",
              marginTop: "4px"
            }}>
              {item.input} → {item.result}
            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default HistoryPanel;