import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Состояние загрузки

  const sendMessage = async () => {
    if (name && email && message) {
      setIsSubmitting(true);
      setErrorMsg('');

      try {
        // Отправляем данные на наш FastAPI бэкенд
        const response = await fetch('http://localhost:8000/api/contacts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
          throw new Error('Произошла ошибка при отправке на сервер.');
        }

        // Если сервер ответил успешно (200 OK), показываем ваше уведомление
        setShowSuccess(true);
        setName('');
        setEmail('');
        setMessage('');

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);

      } catch (error) {
        console.error('Ошибка:', error);
        setErrorMsg('Не удалось отправить сообщение. Проверьте подключение к серверу.');
      } finally {
        setIsSubmitting(false); // Снимаем блокировку с кнопки
      }

    } else {
      alert('Пожалуйста, заполните все поля!');
    }
  };

  return (
    <div className="contacts-section">
      <h2>Контакты</h2>

      <div className="contact-form">
        {showSuccess && (
          <div className="success-message show" style={{ color: 'green', marginBottom: '15px' }}>
            Спасибо! Ваше сообщение отправлено.
          </div>
        )}

        {/* Вывод ошибки, если сервер недоступен */}
        {errorMsg && (
          <div className="error-message show" style={{ color: 'red', marginBottom: '15px' }}>
            {errorMsg}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Ваше имя:</label>
          <input
            type="text"
            id="name"
            placeholder="Введите ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            placeholder="Введите ваше сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <button 
          className="btn-primary" 
          onClick={sendMessage} 
          style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
