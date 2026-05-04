import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import './styles/App.css';

// Ленивая загрузка страниц
const Home = lazy(() => import('./pages/Home'));
const AboutCiphers = lazy(() => import('./pages/AboutCiphers'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Contacts = lazy(() => import('./pages/Contacts'));
const AboutProject = lazy(() => import('./pages/AboutProject'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// Ленивая загрузка компонентов шифров
const CaesarCipher = lazy(() => import('./components/CaesarCipher'));
const AtbashCipher = lazy(() => import('./components/AtbashCipher'));
const DancingMenCipher = lazy(() => import('./components/DancingMenCipher'));
const MorseCipher = lazy(() => import('./components/MorseCipher'));
const VigenereCipher = lazy(() => import('./components/VigenereCipher'));
const VernamCipher = lazy(() => import('./components/VernamCipher'));
const RailFenceCipher = lazy(() => import('./components/RailFenceCipher'));
const PolybiusCipher = lazy(() => import('./components/PolybiusCipher'));

// Компонент загрузки (спиннер)
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '400px',
    flexDirection: 'column',
    gap: '20px'
  }}>
    <div style={{ 
      width: '50px', 
      height: '50px', 
      border: '4px solid var(--border)',
      borderTop: '4px solid var(--primary)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <p style={{ color: 'var(--gray)', fontSize: '16px' }}>Загрузка...</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

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
      case 'tasks':
        return <Tasks />;
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
        <Suspense fallback={<LoadingSpinner />}>
          {renderPage()}
        </Suspense>
      </main>
      <footer>
        <p>© 2026 Дешифратор для школьников. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default App;