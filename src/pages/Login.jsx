import React, { useState } from 'react';

const Login = ({ onLogin, onBack }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {

    if (username === "admin" && password === "1234") {
      localStorage.setItem("user", username);
      onLogin();
    } else {
      setError("Неверный логин или пароль");
    }

  };

  return (
    <div className="page">
      <div className="container">

        <div className="cipher-tool" style={{ maxWidth: "500px", margin: "60px auto" }}>

          <h2>Авторизация</h2>

          {error && (
            <div className="result show">
              <div className="result-text">{error}</div>
            </div>
          )}

          <div className="form-group">
            <label>Логин</label>
            <input
              type="text"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

            <button
              className="btn-primary"
              onClick={handleLogin}
            >
              Войти
            </button>

            <button
              className="btn-secondary"
              onClick={() => onBack('register')}
            >
              Регистрация
            </button>

            <button
              className="btn-secondary"
              onClick={() => onBack('home')}
            >
              Назад
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;