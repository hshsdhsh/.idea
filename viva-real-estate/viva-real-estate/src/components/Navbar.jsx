import React from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, navigate, lang, setLang, t }) => {
  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <div className="navbar-brand" onClick={() => navigate('home')}>
          <div className="logo-icon">🏠🗝️</div>
          <span className="logo-text" style={{fontFamily: 'serif', letterSpacing: '-0.5px'}}>Գույք&Վարձ</span>
        </div>
        
        <div className="navbar-links">
          <button className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={() => navigate('home')}>{t.nav.home}</button>
          <button className={`nav-link ${currentPage === 'search' ? 'active' : ''}`} onClick={() => navigate('search')}>{t.nav.search}</button>
          <button className={`nav-link ${currentPage === 'add' ? 'active' : ''}`} onClick={() => navigate('add')}>{t.nav.add}</button>
          <button className={`nav-link ${currentPage === 'chat' ? 'active' : ''}`} onClick={() => navigate('chat')}>{t.nav.chat}</button>
          <button className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`} onClick={() => navigate('profile')}>{t.nav.profile}</button>
        </div>

        <div className="navbar-actions flex items-center gap-4">
          <button className="btn desktop-only" style={{padding: '6px 10px', background: 'transparent'}} onClick={() => navigate('chat')}>
            <span style={{fontSize: '1.25rem'}}>💬</span>
          </button>
          <button className={`btn btn-outline wallet-btn desktop-only ${currentPage === 'wallet' ? 'wallet-active' : ''}`} onClick={() => navigate('wallet')} style={{border: 'none'}}>
            <span className="balance">{t.walletBtn}</span>
            <div className="wallet-icon">💳</div>
          </button>
          <select className="lang-switcher" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="am">AM</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
          <button className="btn btn-primary" style={{borderRadius: '24px', padding: '10px 24px', backgroundColor: 'var(--primary)', color: 'white'}} onClick={() => navigate('owner')}>
            {t.offerBtn}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
