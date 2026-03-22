import React from 'react';
import './MobileNav.css';

const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="nav-svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="nav-svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconAdd = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="nav-svg-add">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const IconChat = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="nav-svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconProfile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="nav-svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MobileNav = ({ currentPage, navigate, t }) => {
  // If translation is missing (e.g. before full refresh), fallback gracefully
  const bNav = t.nav || { home: "Главная", search: "Поиск", add: "Добавить", chat: "Чат", profile: "Профиль" };

  return (
    <nav className="mobile-nav">
      <div 
        className={`mobile-nav-item ${currentPage === 'home' || currentPage === 'landing' ? 'active' : ''}`}
        onClick={() => navigate('home')}
      >
        <span className="mobile-nav-icon"><IconHome /></span>
        <span className="mobile-nav-text">{bNav.home}</span>
      </div>

      <div 
        className={`mobile-nav-item ${currentPage === 'search' ? 'active' : ''}`}
        onClick={() => navigate('search')}
      >
        <span className="mobile-nav-icon"><IconSearch /></span>
        <span className="mobile-nav-text">{bNav.search}</span>
      </div>

      <div 
        className={`mobile-nav-item-add`}
        onClick={() => navigate('add')}
      >
        <div className="add-button-bg">
          <IconAdd />
        </div>
        <span className="mobile-nav-text" style={{marginTop: '4px'}}>{bNav.add}</span>
      </div>

      <div 
        className={`mobile-nav-item ${currentPage === 'chat' ? 'active' : ''}`}
        onClick={() => navigate('chat')}
      >
        <span className="mobile-nav-icon"><IconChat /></span>
        <span className="mobile-nav-text">{bNav.chat}</span>
      </div>

      <div 
        className={`mobile-nav-item ${currentPage === 'profile' || currentPage === 'wallet' ? 'active' : ''}`}
        onClick={() => navigate('profile')}
      >
        <span className="mobile-nav-icon"><IconProfile /></span>
        <span className="mobile-nav-text">{bNav.profile}</span>
      </div>
    </nav>
  );
};

export default MobileNav;
