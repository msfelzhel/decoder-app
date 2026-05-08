import React, { useState } from 'react';

const Login = ({ onLogin, onBack }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Введите логин/email и пароль");
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      // ВНИМАНИЕ: Если тестируете с телефона, замените localhost на IP-адрес вашего компьютера
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
        credentials: 'include' // Разрешаем браузеру принимать и отправлять HttpOnly куки
      });

      if (!response.ok) {
        throw new Error("Неверный логин/email или пароль");
      }

      const data = await response.json();
      
      // Сохраняем ТОЛЬКО имя пользователя, чтобы отображать его в шапке сайта
      localStorage.setItem("user", data.username);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="cipher-tool" style={{ maxWidth: "500px", margin: "60px auto" }}>

          <h2>Авторизация</h2>

        {error && (
          <div className="error-alert">
            <div className="error-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="error-message">{error}</div>
          </div>
        )}

          <div className="form-group">
            <label>Логин или Email</label>
            <input
              type="text"
              placeholder="Введите логин или email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="button-group">

            <button
              className="btn-primary"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
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
