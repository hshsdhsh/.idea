import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import WalletDashboard from './pages/WalletDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AgentsPage from './pages/AgentsPage';
import CleaningPage from './pages/CleaningPage';
import Messenger from './pages/Messenger';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import MobileNav from './components/MobileNav';
import { translations } from './translations';
import './index.css';

const getDefaultLang = () => {
  const saved = localStorage.getItem('viva_lang');
  if (saved && ['am', 'ru', 'en'].includes(saved)) return saved;

  try {
    // Check browser locale primarily
    const browserLang = navigator.language?.toLowerCase() || '';
    if (browserLang.startsWith('hy') || browserLang.startsWith('am')) return 'am';
    if (browserLang.startsWith('ru')) return 'ru';
    
    // Fallback region check via time zone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Asia/Yerevan') return 'am';
    if (tz.startsWith('Europe/Moscow')) return 'ru';
    
    return 'en'; // Default
  } catch (e) {
    return 'en';
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [lang, setLang] = useState(getDefaultLang());
  const [chatSeed, setChatSeed] = useState(null);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('viva_lang', newLang);
  };

  const handleOpenChat = (chatEntry) => {
    setChatSeed(chatEntry);
    setCurrentPage('chat');
  };

  const t = translations[lang] || translations['en'];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
      case 'rent': 
        return <LandingPage navigate={setCurrentPage} t={t} onOpenChat={handleOpenChat} />;
      case 'search':
        return <SearchPage navigate={setCurrentPage} t={t} onOpenChat={handleOpenChat} />;
      case 'wallet': 
        return <WalletDashboard navigate={setCurrentPage} t={t} />;
      case 'profile':
        return <ProfilePage navigate={setCurrentPage} t={t} lang={lang} setLang={handleLangChange} />;
      case 'owner': 
      case 'add':
        return <OwnerDashboard navigate={setCurrentPage} t={t} />;
      case 'agents': return <AgentsPage navigate={setCurrentPage} t={t} />;
      case 'cleaning': return <CleaningPage navigate={setCurrentPage} t={t} />;
      case 'chat':
        return <Messenger navigate={setCurrentPage} t={t} chatSeed={chatSeed} onChatSeeded={() => setChatSeed(null)} />;
      case 'admin': return <AdminDashboard navigate={setCurrentPage} t={t} />;
      default: return <LandingPage navigate={setCurrentPage} t={t} onOpenChat={handleOpenChat} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar currentPage={currentPage} navigate={setCurrentPage} lang={lang} setLang={handleLangChange} t={t} />
      <main className="main-content pb-mobile-nav">
        {renderPage()}
      </main>
      <MobileNav currentPage={currentPage} navigate={setCurrentPage} t={t} />
    </div>
  );
}

export default App;
