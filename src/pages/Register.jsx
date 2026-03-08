import React, { useState } from 'react';

const Register = ({ onBack }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Ошибка регистрации");
      }

      alert("Регистрация успешна! Теперь вы можете войти.");
      onBack('login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="cipher-tool" style={{ maxWidth: "500px", margin: "60px auto" }}>

          {error && <div className="result-text" style={{color: 'red'}}>{error}</div>}

          <h2>Регистрация</h2>

          <div className="form-group">
            <label>Имя пользователя</label>
            <input
              type="text"
              placeholder="Введите имя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button className="btn-primary" onClick={handleRegister}>
              Зарегистрироваться
            </button>
            <button className="btn-secondary" onClick={() => onBack('login')}>
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;