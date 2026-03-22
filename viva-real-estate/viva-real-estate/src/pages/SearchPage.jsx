import React, { useState } from 'react';
import PropertyDetail from './PropertyDetail';

const ALL_PROPERTIES = [
  { id: 1, title: 'Квартира в центре', location: 'ул. Абовяна, Кентрон', type: 'Apartment', price: 270000, rooms: 2, area: 65, img: 'img-1', rating: 4.8 },
  { id: 2, title: 'Уютная студия', location: 'Арабкир, Ереван', type: 'Apartment', price: 150000, rooms: 1, area: 32, img: 'img-2', rating: 5.0 },
  { id: 3, title: 'Офис Open Space', location: 'Кентрон, Ереван', type: 'Office', price: 220000, rooms: 3, area: 120, img: 'img-1', rating: 4.9 },
  { id: 4, title: 'Дом с садом', location: 'Норк, Ереван', type: 'House', price: 340000, rooms: 4, area: 180, img: 'img-2', rating: 4.7 },
  { id: 5, title: 'Пентхаус с видом', location: 'Кентрон, Ереван', type: 'Apartment', price: 450000, rooms: 3, area: 130, img: 'img-1', rating: 5.0 },
  { id: 6, title: 'Студия у парка', location: 'Малатия, Ереван', type: 'Apartment', price: 150000, rooms: 1, area: 30, img: 'img-2', rating: 4.6 },
  { id: 7, title: 'Просторный офис', location: 'Давташен, Ереван', type: 'Office', price: 180000, rooms: 2, area: 90, img: 'img-1', rating: 4.5 },
  { id: 8, title: 'Дуплекс в тихом районе', location: 'Арабкир, Ереван', type: 'House', price: 380000, rooms: 5, area: 210, img: 'img-2', rating: 4.8 },
  { id: 9, title: 'Комната для студента', location: 'Нор Норк, Ереван', type: 'Room', price: 80000, rooms: 1, area: 18, img: 'img-1', rating: 4.4 },
];

const TYPES = ['Все', 'Apartment', 'House', 'Office', 'Room'];

const SearchPage = ({ navigate, t, onOpenChat }) => {
  const SORT_OPTIONS = [
    { value: 'default', label: t.search?.sortDef || 'По умолчанию' },
    { value: 'price_asc', label: t.search?.sortPa || 'Цена ↑' },
    { value: 'price_desc', label: t.search?.sortPd || 'Цена ↓' },
    { value: 'rating', label: t.search?.sortR || 'Рейтинг ★' },
    { value: 'area', label: t.search?.sortA || 'Площадь' },
  ];

  const [query, setQuery] = useState('');
  const [type, setType] = useState('Все');
  const [sort, setSort] = useState('default');
  const [maxPrice, setMaxPrice] = useState(500000);
  const [rooms, setRooms] = useState(0); // 0 = any
  const [viewMode, setViewMode] = useState('grid'); // grid | list
  const [selected, setSelected] = useState(null);
  const [properties, setProperties] = useState(ALL_PROPERTIES);

  const handleDelete = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setSelected(null);
  };

  const filtered = properties
    .filter(p => {
      const q = query.toLowerCase();
      const matchQ = !query || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      const matchType = type === 'Все' || p.type === type;
      const matchPrice = p.price <= maxPrice;
      const matchRooms = rooms === 0 || p.rooms >= rooms;
      return matchQ && matchType && matchPrice && matchRooms;
    })
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'area') return b.area - a.area;
      return 0;
    });

  const resetAll = () => {
    setQuery(''); setType('Все'); setSort('default');
    setMaxPrice(500000); setRooms(0);
  };

  return (
    <div style={{minHeight: '100vh', background: '#f8fafc', paddingBottom: '80px'}}>
      {/* Search Header */}
      <div style={{background: 'var(--primary)', padding: '24px 0 32px'}}>
        <div className="container">
          <h1 style={{color: 'white', fontWeight: 800, fontSize: '1.8rem', marginBottom: '20px'}}>
            🔍 {t.search?.title || 'Поиск недвижимости'}
          </h1>
          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'white', borderRadius: '14px',
              padding: '12px 20px', flex: 1, minWidth: '200px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}>
              <span style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>🔍</span>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t.search?.pSearch || "Название, адрес, район..."}
                style={{flex: 1, border: 'none', outline: 'none', fontSize: '1rem', color: 'var(--text-main)', background: 'transparent'}}
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery('')} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.1rem'}}>✕</button>
              )}
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                padding: '12px 18px', borderRadius: '14px', border: 'none',
                background: 'white', fontWeight: 600, color: 'var(--primary)',
                fontSize: '0.95rem', cursor: 'pointer', outline: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="container" style={{padding: '32px 16px'}}>
        {/* Type Tabs + View Mode */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px'}}>
          <div style={{display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px'}}>
            {TYPES.map(tp => (
              <button key={tp} onClick={() => setType(tp)} style={{
                padding: '8px 20px', borderRadius: '24px', fontWeight: 600, fontSize: '0.9rem',
                cursor: 'pointer', border: 'none', whiteSpace: 'nowrap',
                background: type === tp ? 'var(--primary)' : 'white',
                color: type === tp ? 'white' : 'var(--text-muted)',
                boxShadow: type === tp ? '0 4px 12px rgba(0,43,94,0.2)' : '0 1px 4px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease'
              }}>{tp === 'Все' ? (t.search?.tAll || '🏠 Все') : tp === 'Apartment' ? (t.search?.tApt || '🏢 Квартира') : tp === 'House' ? (t.search?.tHouse || '🏡 Дом') : tp === 'Office' ? (t.search?.tOffice || '💼 Офис') : (t.search?.tRoom || '🚪 Комната')}</button>
            ))}
          </div>
          <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
            <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{filtered.length} {t.owner?.count || 'объявлений'}</span>
            <div style={{display: 'flex', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)'}}>
              {[['grid', '⊞'], ['list', '≡']].map(([mode, icon]) => (
                <button key={mode} onClick={() => setViewMode(mode)} style={{
                  padding: '8px 14px', border: 'none', cursor: 'pointer', fontSize: '1.1rem',
                  background: viewMode === mode ? 'var(--primary)' : 'transparent',
                  color: viewMode === mode ? 'white' : 'var(--text-muted)',
                  transition: 'all 0.2s ease'
                }}>{icon}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{display: 'flex', gap: '24px', alignItems: 'flex-start'}}>
          {/* Sidebar Filters */}
          <aside style={{width: '240px', flexShrink: 0, position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <h3 style={{color: 'var(--primary)', fontWeight: 700, margin: 0, fontSize: '1rem'}}>{t.sidebar?.title || 'Фильтры'}</h3>
                <button onClick={resetAll} style={{background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem'}}>{t.search?.fReset || 'Сбросить'}</button>
              </div>

              <div style={{marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)'}}>
                <label style={{fontWeight: 600, color: 'var(--primary)', marginBottom: '12px', display: 'block', fontSize: '0.9rem'}}>
                  {t.search?.fPrice || 'Макс. цена'}: <span style={{color: 'var(--accent)'}}>{maxPrice.toLocaleString()} ֏</span>
                </label>
                <input type="range" min={50000} max={500000} step={10000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
                  style={{width: '100%', accentColor: 'var(--primary)'}}
                />
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px'}}>
                  <span>50K</span><span>500K ֏</span>
                </div>
              </div>

              <div>
                <label style={{fontWeight: 600, color: 'var(--primary)', marginBottom: '12px', display: 'block', fontSize: '0.9rem'}}>{t.search?.fRooms || 'Кол-во комнат'}</label>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px'}}>
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setRooms(n)} style={{
                      padding: '8px', borderRadius: '10px', border: '1.5px solid',
                      borderColor: rooms === n ? 'var(--primary)' : 'var(--border-color)',
                      background: rooms === n ? 'rgba(0,43,94,0.08)' : 'white',
                      color: rooms === n ? 'var(--primary)' : 'var(--text-muted)',
                      fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
                      transition: 'all 0.2s ease'
                    }}>{n === 0 ? (t.search?.tAll?.replace('🏠 ', '') || 'Все') : n === 5 ? '5+' : n}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main style={{flex: 1}}>
            {filtered.length === 0 ? (
              <div style={{textAlign: 'center', padding: '80px 16px', color: 'var(--text-muted)', background: 'white', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                <div style={{fontSize: '4rem', marginBottom: '16px'}}>🔍</div>
                <h3 style={{color: 'var(--primary)', marginBottom: '8px', fontWeight: 700}}>{t.search?.eEmpty || 'Ничего не найдено'}</h3>
                <p style={{marginBottom: '20px'}}>{t.search?.eSub || 'Попробуйте изменить параметры поиска'}</p>
                <button onClick={resetAll} style={{padding: '12px 28px', borderRadius: '24px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer'}}>{t.search?.bReset || 'Сбросить фильтры'}</button>
              </div>
            ) : viewMode === 'grid' ? (
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px'}}>
                {filtered.map(p => (
                  <div key={p.id} onClick={() => setSelected(p)} style={{background: 'white', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s ease, box-shadow 0.2s ease'}}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
                  >
                    <div className={p.img} style={{height: '180px', position: 'relative', background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)'}}>
                      <span style={{position: 'absolute', top: '12px', right: '12px', background: 'var(--success)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700}}>✓ {t.verifiedBadge || 'Verified'}</span>
                      <div style={{position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px'}}>
                        <span style={{background: 'white', padding: '3px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)'}}>★ {p.rating}</span>
                        <span style={{background: 'white', padding: '3px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)'}}>{p.area} м²</span>
                      </div>
                    </div>
                    <div style={{padding: '16px'}}>
                      <h3 style={{fontWeight: 700, color: 'var(--primary)', margin: '0 0 4px', fontSize: '1.05rem'}}>{p.title}</h3>
                      <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 12px'}}>📍 {p.location}</p>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{fontWeight: 800, color: 'var(--primary)', fontSize: '1.15rem'}}>{p.price.toLocaleString()} ֏</span>
                        <span style={{background: '#f1f5f9', color: 'var(--text-muted)', padding: '3px 10px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600}}>🛏️ {p.rooms}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
                {filtered.map(p => (
                  <div key={p.id} onClick={() => setSelected(p)} style={{background: 'white', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', display: 'flex', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s ease'}}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
                  >
                    <div className={p.img} style={{width: '200px', flexShrink: 0, background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)', position: 'relative'}}>
                      <span style={{position: 'absolute', top: '10px', right: '10px', background: 'var(--success)', color: 'white', padding: '3px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 700}}>✓</span>
                    </div>
                    <div style={{padding: '20px', flex: 1}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px'}}>
                        <h3 style={{fontWeight: 700, color: 'var(--primary)', margin: 0, fontSize: '1.1rem'}}>{p.title}</h3>
                        <span style={{fontWeight: 800, color: 'var(--primary)', fontSize: '1.15rem', flexShrink: 0, marginLeft: '16px'}}>{p.price.toLocaleString()} ֏</span>
                      </div>
                      <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 12px'}}>📍 {p.location}</p>
                      <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                        {[`🛏️ ${p.rooms}`, `${p.area} м²`, `★ ${p.rating}`, p.type].map((tag, i) => (
                          <span key={i} style={{background: '#f1f5f9', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600}}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {selected && (
        <PropertyDetail
          property={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
          onOpenChat={onOpenChat}
          navigate={navigate}
          t={t}
        />
      )}
    </div>
  );
};

export default SearchPage;
