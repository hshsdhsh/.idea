import React from 'react';
import AdBanner from '../components/AdBanner';
import './LandingPage.css';

const LandingPage = ({ navigate, t }) => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <div className="badge badge-success" style={{marginBottom: '20px'}}>
              {t.hero.badge}
            </div>
            <h1 className="hero-title">{t.hero.title1}<br/>{t.hero.title2}</h1>
            <p className="hero-subtitle">
              {t.hero.sub}
            </p>
            <div className="hero-actions flex justify-center gap-4">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('rent')}>{t.hero.btn1}</button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate('owner')}>{t.hero.btn2}</button>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section container">
        <AdBanner title={t.ad} />
        
        <h2 className="section-title text-center" style={{marginTop: '40px'}}>{t.featuresTitle}</h2>
        
        <div className="features-grid">
          <div className="card feature-card">
            <div className="feature-icon">🏠</div>
            <h3>{t.features.t1}</h3>
            <p>Забудьте о фальшивых объявлениях. Ваши средства надежно заморожены системой Escrow до успешного заселения.</p>
          </div>
          
          <div className="card feature-card">
            <div className="feature-icon">🔑</div>
            <h3>{t.features.t2}</h3>
            <p>Сдавайте квартиры. Управляйте всем сами, экономьте 30% на комиссиях и получайте средства моментально после заселения гостя.</p>
          </div>
          
          <div className="card feature-card">
            <div className="feature-icon">👔</div>
            <h3>{t.features.t3}</h3>
            <p>Создайте персональную страницу, собирайте отзывы, повышайте рейтинг доверия. Проводите сделки безопасно.</p>
          </div>
          
          <div className="card feature-card">
            <div className="feature-icon">✨</div>
            <h3>{t.features.t4}</h3>
            <p>Отдельные профили для специалистов по уборке. Получайте заказы напрямую от владельцев квартир.</p>
          </div>
        </div>
      </section>
      
      <section className="escrow-banner container">
        <div className="escrow-content">
          <h2>{t.escrowBannerTitle}</h2>
          <p>{t.escrowBannerSub}</p>
          <button className="btn btn-primary" onClick={() => navigate('wallet')}>{t.openWallet}</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
