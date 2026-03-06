import React, { useState } from 'react';

const Register = ({ onBack }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    alert("Регистрация пока не подключена к серверу");
  };

  return (
    <div className="page">
      <div className="container">

        <div className="cipher-tool" style={{ maxWidth: "500px", margin: "60px auto" }}>

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