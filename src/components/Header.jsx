import React, { useState, useEffect } from 'react';

const Header = ({ currentPage, onPageChange }) => {
  const [username, setUsername] = useState(null);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'ciphers', label: 'О шифрах' },
    { id: 'contacts', label: 'Контакты' },
    { id: 'about', label: 'О проекте' }
  ];

  // Проверяем авторизацию при монтировании и при каждой смене страницы
  useEffect(() => {
    const checkAuth = async () => {
      const user = localStorage.getItem('user');

      if (user) {
        try {
          // Идем на бэкенд и проверяем куку
          const response = await fetch('http://localhost:8000/api/auth/me', {
            credentials: 'include' // ВАЖНО: передаем HttpOnly куку серверу
          });

          if (response.ok) {
            // Кука валидна
            setUsername(user);
          } else {
            // Кука истекла или недействительна (401 Unauthorized)
            localStorage.removeItem('user');
            setUsername(null);
          }
        } catch (error) {
          // Если сервер временно недоступен, оставляем пользователя залогиненным локально
          setUsername(user);
        }
      } else {
        // Нет имени - гость
        setUsername(null);
      }
    };

    checkAuth();
  }, [currentPage]);

  // Функция выхода из аккаунта
  const handleLogout = async () => {
    try {
      // Говорим серверу удалить куку
      await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (e) {
      console.error('Ошибка при выходе', e);
    }
    
    // Очищаем фронтенд
    localStorage.removeItem('user');
    setUsername(null);
    onPageChange('home'); // Возвращаем на главную страницу после выхода
  };

  return (
    <header>
      <div className="header-container">

        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => onPageChange('home')}>
          🔐 Дешифратор
        </div>

        <nav>
          <ul>
            {navItems.map(item => (
              <li key={item.id}>
                <a
                  className={currentPage === item.id ? 'nav-link active' : 'nav-link'}
                  onClick={() => onPageChange(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Блок авторизации */}
        <div className="auth-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {username ? (
            <>
              {/* Аватарка с первой буквой имени */}
              <div 
                className="avatar" 
                title={username}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50', // Можете поменять цвет на свой вкус
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {username.charAt(0)}
              </div>
              
              <button
                className="btn-secondary"
                onClick={handleLogout}
                style={{ padding: '8px 15px' }}
              >
                Выйти
              </button>
            </>
          ) : (
            <button
              className="btn-primary"
              onClick={() => onPageChange('login')}
              style={{ padding: '8px 20px' }}
            >
              Войти
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
