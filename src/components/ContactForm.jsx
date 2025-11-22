import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const sendMessage = () => {
    if (name && email && message) {
      setShowSuccess(true);
      setName('');
      setEmail('');
      setMessage('');

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      alert('Пожалуйста, заполните все поля!');
    }
  };

  return (
    <div className="contacts-section">
      <h2>Контакты</h2>

      <div className="contact-form">
        {showSuccess && (
          <div className="success-message show">
            Спасибо! Ваше сообщение отправлено.
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            placeholder="Введите ваше сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button className="btn-primary" onClick={sendMessage} style={{ width: '100%' }}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ContactForm;