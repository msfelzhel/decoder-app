import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import AboutCiphers from './pages/AboutCiphers';
import Contacts from './pages/Contacts';
import AboutProject from './pages/AboutProject';
import CaesarCipher from './components/CaesarCipher';
import AtbashCipher from './components/AtbashCipher';
import DancingMenCipher from './components/DancingMenCipher';
import MorseCipher from './components/MorseCipher';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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