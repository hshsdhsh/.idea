import React from 'react';
import './MobileNav.css';

const MobileNav = ({ currentPage, navigate, t }) => {
  return (
    <nav className="mobile-nav">
      <div 
        className={`mobile-nav-item ${currentPage === 'home' || currentPage === 'landing' ? 'active' : ''}`}
        onClick={() => navigate('home')}
      >
        <span className="mobile-nav-icon">🏠</span>
        <span className="mobile-nav-text">Home</span>
      </div>

      <div 
        className={`mobile-nav-item ${currentPage === 'rent' ? 'active' : ''}`}
        onClick={() => navigate('rent')}
      >
        <span className="mobile-nav-icon">🗝️</span>
        <span className="mobile-nav-text">{t.nav.rent}</span>
      </div>

      <div 
        className={`mobile-nav-item ${currentPage === 'wallet' ? 'active' : ''}`}
        onClick={() => navigate('wallet')}
      >
        <span className="mobile-nav-icon">💳</span>
        <span className="mobile-nav-text">{t.walletBtn}</span>
      </div>

      <div 
        className={`mobile-nav-item ${currentPage === 'chat' ? 'active' : ''}`}
        onClick={() => navigate('chat')}
      >
        <span className="mobile-nav-icon">💬</span>
        <span className="mobile-nav-text">Chat</span>
      </div>

      <div 
        className={`mobile-nav-item ${currentPage === 'owner' ? 'active' : ''}`}
        onClick={() => navigate('owner')}
      >
        <span className="mobile-nav-icon">🏢</span>
        <span className="mobile-nav-text">{t.nav.let}</span>
      </div>
    </nav>
  );
};

export default MobileNav;
