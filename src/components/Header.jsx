import React, { memo } from 'react';

const Header = memo(({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'ciphers', label: 'О шифрах' },
    { id: 'tasks', label: 'Задания' },
    { id: 'contacts', label: 'Контакты' },
    { id: 'about', label: 'О проекте' }
  ];

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          🔐 Дешифратор
        </div>

        <nav>
          <ul>
            {navItems.map(item => (
              <li key={item.id}>
                <a
                  className={currentPage === item.id ? 'nav-link active' : 'nav-link'}
                  onClick={() => onPageChange(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="btn-primary"
          onClick={() => onPageChange('login')}
          style={{ padding: '8px 20px' }}
        >
          Войти
        </button>
      </div>
    </header>
  );
});

export default Header;