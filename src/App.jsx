import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import AboutCiphers from './pages/AboutCiphers';
import Contacts from './pages/Contacts';
import AboutProject from './pages/AboutProject';
import CaesarCipher from './components/CaesarCipher';
import AtbashCipher from './components/AtbashCipher';
import DancingMenCipher from './components/DancingMenCipher';
import MorseCipher from './components/MorseCipher';
import VigenereCipher from './components/VigenereCipher';
import VernamCipher from './components/VernamCipher';
import Login from './pages/Login';
import Register from './pages/Register';
import RailFenceCipher from './components/RailFenceCipher';
import PolybiusCipher from './components/PolybiusCipher';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Скролл наверх при смене страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onCipherSelect={setCurrentPage} />;
      case 'ciphers':
        return <AboutCiphers onCipherSelect={setCurrentPage} />;
      case 'contacts':
        return <Contacts />;
      case 'about':
        return <AboutProject />;
      case 'caesar':
        return <CaesarCipher onBack={setCurrentPage} />;
      case 'atbash':
        return <AtbashCipher onBack={setCurrentPage} />;
      case 'dancing':
        return <DancingMenCipher onBack={setCurrentPage} />;
      case 'morse':
        return <MorseCipher onBack={setCurrentPage} />;
      case 'vigenere':
        return <VigenereCipher onBack={setCurrentPage} />;
      case 'vernam':
        return <VernamCipher onBack={setCurrentPage} />;
      case 'login':
        return <Login onLogin={() => setCurrentPage('home')} onBack={setCurrentPage} />;
      case 'register':
        return <Register onBack={setCurrentPage} />;
      case 'rail':
        return <RailFenceCipher onBack={setCurrentPage} />;
      case 'polybius':
        return <PolybiusCipher onBack={setCurrentPage} />;
      default:
        return <Home onCipherSelect={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <footer>
        <p>&copy; 2025 Дешифратор для школьников. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default App;