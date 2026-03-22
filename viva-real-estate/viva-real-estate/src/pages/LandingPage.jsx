import React, { useState } from 'react';
import PropertyDetail from './PropertyDetail';
import './LandingPage.css';

const mockProperties = [
  { id: 1, title: 'Квартира в центре', location: 'ул. Абовяна, Ереван', type: 'Օրավարձ', price: 270000, img: 'img-1', rating: 4.8 },
  { id: 2, title: 'Уютная студия', location: 'Арабкир, Ереван', type: 'Կարճաժամկետ', price: 280000, img: 'img-2', rating: 5.0 },
  { id: 3, title: 'Офис Open Space', location: 'Кентрон, Ереван', type: 'Երկարاժamketi', price: 220000, img: 'img-1', rating: 4.9 },
  { id: 4, title: 'Дом с садом', location: 'Норк, Ереван', type: 'Երкarаzhамкеtи', price: 340000, img: 'img-2', rating: 4.7 },
  { id: 5, title: 'Пентхаус с видом', location: 'Кентрон, Ереван', type: 'Օravaerdz', price: 450000, img: 'img-1', rating: 5.0 },
  { id: 6, title: 'Студия у парка', location: 'Малатия, Ереван', type: 'Кar-chazhаmketi', price: 150000, img: 'img-2', rating: 4.6 },
];

const DEMO_PROPS = [
  { id: 101, title: 'Пентхаус Малатия', location: 'Малатия, Ереван', type: 'Apartment', price: 380000, img: 'img-1', rating: 4.9 },
  { id: 102, title: 'Студия Норк', location: 'Норк, Ереван', type: 'Apartment', price: 160000, img: 'img-2', rating: 4.5 },
  { id: 103, title: 'Дом Себастия', location: 'Себастия, Ереван', type: 'House', price: 420000, img: 'img-1', rating: 4.8 },
];




const LandingPage = ({ navigate, t, onOpenChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Բоlory');
  const [maxPrice, setMaxPrice] = useState(500000);
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState(mockProperties);
  const [demoAdded, setDemoAdded] = useState(false);

  const handleAddDemo = () => {
    if (!demoAdded) {
      setProperties(prev => [...prev, ...DEMO_PROPS]);
      setDemoAdded(true);
    }
  };

  const handleDeleteListing = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setSelectedProperty(null);
  };

  const filteredProps = properties
    .filter(p => {
      const searchLower = searchTerm.toLowerCase();
      const matchSearch = !searchTerm || p.title.toLowerCase().includes(searchLower) || p.location.toLowerCase().includes(searchLower);
      const matchPrice = p.price <= maxPrice;
      return matchSearch && matchPrice;
    })
    .sort((a, b) => {
      if (sortOrder === 'price_asc') return a.price - b.price;
      if (sortOrder === 'price_desc') return b.price - a.price;
      if (sortOrder === 'rating') return b.rating - a.rating;
      return 0;
    });


  return (
    <div className="homepage-wrapper">
      {/* SOLID BLUE HERO */}
      <section className="hero-solid">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{t.hero.title1}<br/>{t.hero.title2}</h1>
            <div className="hero-search">
              <div className="hero-search-input">
                <span style={{fontSize: '1.2rem'}}>🔍</span>
                <input
                  type="text"
                  placeholder={t.sidebar?.city || 'Поиск по названию или адресу...'}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.2rem'}}>✕</button>
                )}
              </div>
              <button className="btn" style={{background: 'var(--accent)', color: 'white', borderRadius: '12px', padding: '12px 24px', fontWeight: 700}}>
                {t.hero.btn1 || 'Поиск'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OVERLAPPING FEATURES */}
      <section className="features-overlap container">
        <div className="features-grid">
          <div className="card feature-card">
            <div className="feature-icon text-success">🛡️</div>
            <h3>{t.features.t1}</h3>
          </div>
          <div className="card feature-card">
            <div className="feature-icon text-accent">👥</div>
            <h3>{t.features.t2}</h3>
          </div>
          <div className="card feature-card">
            <div className="feature-icon text-success">🏷️</div>
            <h3>{t.features.t3}</h3>
          </div>
          <div className="card feature-card">
            <div className="feature-icon text-primary">📄</div>
            <h3>{t.features.t4}</h3>
          </div>
        </div>
      </section>

      {/* 🌟 PREMIUM AD BANNER SECTION 🌟 */}
      <section className="container" style={{marginBottom: '60px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h3 style={{color: 'var(--primary)', fontWeight: 800, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', margin: 0}}>
            <span style={{fontSize: '1.8rem'}}>💎</span> {t.ads?.title || 'Эксклюзивные предложения партнеров'}
          </h3>
          <button style={{background: 'rgba(0,43,94,0.06)', color: 'var(--primary)', border: 'none', borderRadius: '20px', padding: '8px 18px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s ease'}}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,43,94,0.06)'; e.currentTarget.style.color = 'var(--primary)'; }}
          >
            {t.ads?.placeAd?.split(' ')[1] || 'Разместить рекламу'} +
          </button>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
          {[
            { name: t.ads?.bName || 'FinBank Armenia', slogan: t.ads?.bSlogan || 'Ипотека от 6.5%', tag: t.ads?.bTag || '🏦 Банк', grad1: '#1e3a5a', grad2: '#3b82f6', bgIcon: '💰' },
            { name: t.ads?.iName || 'InsurePro', slogan: t.ads?.iSlogan || 'Надёжное страхование', tag: t.ads?.iTag || '🛡️ Страхование', grad1: '#064e3b', grad2: '#10b981', bgIcon: '🏠' },
            { name: t.ads?.mName || 'MoveCargo AM', slogan: t.ads?.mSlogan || 'Бережные переезды', tag: t.ads?.mTag || '🚛 Транспорт', grad1: '#4c1d95', grad2: '#8b5cf6', bgIcon: '📦' },
          ].map((ad, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, ${ad.grad1}, ${ad.grad2})`,
              borderRadius: '24px', padding: '32px 24px', cursor: 'pointer',
              position: 'relative', overflow: 'hidden', color: 'white',
              boxShadow: `0 12px 30px ${ad.grad1}40`,
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 20px 40px ${ad.grad1}60`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 12px 30px ${ad.grad1}40`; }}
            >
              {/* Decorative shapes */}
              <div style={{position: 'absolute', top: '-10%', right: '-5%', fontSize: '8rem', opacity: 0.1, transform: 'rotate(15deg)'}}>{ad.bgIcon}</div>
              <div style={{position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'white', opacity: 0.05}} />
              
              <div style={{position: 'relative', zIndex: 1}}>
                <span style={{background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em'}}>
                  {ad.tag}
                </span>
                <h4 style={{fontSize: '1.6rem', fontWeight: 800, margin: '20px 0 8px', lineHeight: 1.1}}>{ad.name}</h4>
                <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '1rem', margin: '0 0 24px', fontWeight: 500}}>{ad.slogan}</p>
                <button style={{
                  background: 'white', color: ad.grad1, border: 'none', borderRadius: '14px',
                  padding: '10px 20px', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease'
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                >
                  {t.ads?.moreBtn || 'Подробнее →'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN FEED */}
      <section className="feed-section container">
        <div className="feed-layout">
          {/* SIDEBAR */}
          <aside className="feed-sidebar">
            <h3 className="sidebar-title">{t.sidebar?.title || 'Фильтры'}</h3>
            
            <div className="filter-group">
              <h4>{t.sidebar?.city || 'Город'} <span>^</span></h4>
              <div className="input-with-icon" style={{borderRadius: '12px'}}>
                <span>📍</span>
                <input type="text" placeholder={t.sidebar?.yerevan || 'Ереван'} style={{background: 'transparent', border: 'none', outline: 'none', width: '100%'}} />
              </div>
            </div>

            <div className="filter-group">
              <h4>{t.sidebar?.price || 'Макс. цена'} <span>^</span></h4>
              <div style={{marginBottom: '8px', fontWeight: 700, color: 'var(--primary)', fontSize: '1.05rem'}}>{maxPrice.toLocaleString()} ֏</div>
              <input
                type="range"
                className="price-slider"
                min={50000}
                max={500000}
                step={10000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
              />
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px'}}>
                <span>50,000</span><span>500,000 ֏</span>
              </div>
            </div>

            <div className="filter-group" style={{borderBottom: 'none'}}>
              <h4>Сортировка <span>^</span></h4>
              {[
                {value: 'default', label: 'По умолчанию'},
                {value: 'price_asc', label: 'Цена ↑'},
                {value: 'price_desc', label: 'Цена ↓'},
                {value: 'rating', label: 'Рейтинг ★'},
              ].map(o => (
                <label key={o.value} className="checkbox-label">
                  <input type="radio" name="sort" onChange={() => setSortOrder(o.value)} checked={sortOrder === o.value} />
                  {o.label}
                </label>
              ))}
            </div>
          </aside>

          {/* GRID */}
          <main className="feed-grid-container">
            <div className="feed-header flex justify-between items-center">
              <h2 style={{margin: 0}}>
                {filteredProps.length > 0
                  ? `${filteredProps.length} объект${filteredProps.length !== 1 ? 'ов' : ''}`
                  : 'Ничего не найдено'}
              </h2>
              <div style={{display:'flex', gap:'10px', alignItems:'center', flexWrap:'wrap'}}>
                {searchTerm && (
                  <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                    Поиск: «{searchTerm}»
                  </span>
                )}
                <button
                  onClick={handleAddDemo}
                  disabled={demoAdded}
                  style={{
                    padding: '6px 14px', borderRadius: '20px', border: '1.5px dashed var(--border-color)',
                    background: demoAdded ? '#f1f5f9' : 'white', color: demoAdded ? 'var(--text-muted)' : 'var(--primary)',
                    fontSize: '0.8rem', fontWeight: 700, cursor: demoAdded ? 'default' : 'pointer', transition: 'all 0.2s'
                  }}
                >
                  {demoAdded ? '✓ Демо добавлено' : '+ Демо данные'}
                </button>
              </div>
            </div>
            
            {filteredProps.length === 0 ? (
              <div style={{textAlign: 'center', padding: '60px 16px', color: 'var(--text-muted)'}}>
                <div style={{fontSize: '3rem', marginBottom: '16px'}}>🔍</div>
                <h3 style={{marginBottom: '8px'}}>Ничего не найдено</h3>
                <p>Попробуйте изменить параметры поиска</p>
                <button onClick={() => { setSearchTerm(''); setMaxPrice(500000); setSortOrder('default'); }} style={{marginTop: '16px', padding: '10px 24px', borderRadius: '24px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer'}}>
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="property-grid">
                {filteredProps.map(p => (
                  <div key={p.id} className="card property-card" onClick={() => setSelectedProperty(p)} style={{cursor: 'pointer'}}>
                    <div className={`property-image ${p.img}`}>
                      <span className="verified-badge">✓ {t.verifiedBadge || 'Verified'}</span>
                      <span style={{position: 'absolute', bottom: '12px', left: '12px', background: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', boxShadow: '0 2px 6px rgba(0,0,0,0.1)'}}>
                        ★ {p.rating}
                      </span>
                    </div>
                    <div className="property-content">
                      <h3 className="property-title">{p.title}</h3>
                      <p className="property-location text-muted">📍 {p.location}</p>
                      <div className="property-price">
                        {p.price.toLocaleString()} ֏
                        <span style={{fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '4px'}}>/мес</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </section>




      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onDelete={handleDeleteListing}
          onOpenChat={onOpenChat}
          navigate={navigate}
          t={t}
        />
      )}
    </div>
  );
};

export default LandingPage;
