import React, { useState } from 'react';

const ProfilePage = ({ navigate, t, lang, setLang }) => {
  const [activeTab, setActiveTab] = useState('listings');
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Արմեն Վ.');
  const [notif, setNotif] = useState(true);

  const tabs = [
    { key: 'listings', label: t.profile?.tListings || '🏠 Объявления' },
    { key: 'bookings', label: t.profile?.tBookings || '📅 Бронирования' },
    { key: 'reviews', label: t.profile?.tReviews || '⭐ Отзывы' },
    { key: 'settings', label: t.profile?.tSettings || '⚙️ Настройки' },
  ];

  return (
    <div className="container" style={{padding: '32px 16px', maxWidth: '900px', margin: '0 auto'}}>
      {/* Profile Header */}
      <div className="card" style={{borderRadius: '24px', padding: '32px', marginBottom: '24px', display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap'}}>
        <div style={{position: 'relative', flexShrink: 0}}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), #1e3a5a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '2.5rem', fontWeight: 700,
            boxShadow: '0 8px 24px rgba(0, 43, 94, 0.25)'
          }}>АВ</div>
          <div style={{
            position: 'absolute', bottom: '4px', right: '4px',
            width: '20px', height: '20px', background: 'var(--success)',
            borderRadius: '50%', border: '3px solid white'
          }} />
        </div>

        <div style={{flex: 1, minWidth: '200px'}}>
          {editing ? (
            <input value={name} onChange={e => setName(e.target.value)} style={{
              fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)',
              border: '1px solid var(--border-color)', borderRadius: '10px',
              padding: '6px 12px', marginBottom: '8px', width: '100%', boxSizing: 'border-box'
            }} />
          ) : (
            <h2 style={{fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '6px'}}>{name}</h2>
          )}
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px'}}>
            <span style={{background: 'rgba(0,43,94,0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem'}}>
              {t.profile?.owner || 'Владелец'}
            </span>
            <span style={{background: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '4px 12px', borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem'}}>
              {t.profile?.verified || '✓ Верифицирован'}
            </span>
          </div>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{t.profile?.since || 'На платформе с 2024 г.'}</p>
        </div>

        <div style={{display: 'flex', gap: '32px', flexWrap: 'wrap'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)'}}>4.9</div>
            <div style={{color: '#f59e0b', marginBottom: '2px'}}>★★★★★</div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>{t.property?.rating || 'Рейтинг'}</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)'}}>14</div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>{t.owner?.count || 'Объявлений'}</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)'}}>82</div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>Сделок</div>
          </div>
        </div>

        <button onClick={() => setEditing(e => !e)} style={{
          padding: '10px 20px', borderRadius: '12px',
          background: editing ? 'var(--success)' : 'transparent',
          color: editing ? 'white' : 'var(--primary)',
          border: '1.5px solid ' + (editing ? 'var(--success)' : 'var(--primary)'),
          fontWeight: 600, cursor: 'pointer'
        }}>
          {editing ? `✓ ${t.owner?.lSave?.split(' ')[0] || 'Сохранить'}` : `✏️ ${t.owner?.mEdit || 'Редактировать'}`}
        </button>
      </div>

      {/* Tabs */}
      <div style={{display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px'}}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: '10px 20px', borderRadius: '24px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
            border: 'none', whiteSpace: 'nowrap',
            background: activeTab === tab.key ? 'var(--primary)' : '#f8fafc',
            color: activeTab === tab.key ? 'white' : 'var(--text-muted)',
            boxShadow: activeTab === tab.key ? '0 4px 12px rgba(0,43,94,0.2)' : 'none',
            transition: 'all 0.2s ease'
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'listings' && (
        <div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px'}}>
            {[
              {title: 'Квартира ул. Абовяна', location: 'Кентрон', price: 250000, status: t.profile?.lActive || 'Активно'},
              {title: 'Студия Арабкир', location: 'Арабкир', price: 180000, status: t.profile?.lRented || 'Сдана'},
            ].map((item, i) => (
              <div key={i} className="card" style={{padding: 0, borderRadius: '20px', overflow: 'hidden'}}>
                <div style={{height: '160px', background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)'}} />
                <div style={{padding: '20px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px'}}>
                    <h4 style={{fontWeight: 700, color: 'var(--primary)', margin: 0}}>{item.title}</h4>
                    <span style={{
                      background: item.status === (t.profile?.lActive || 'Активно') ? 'rgba(16,185,129,0.1)' : '#f1f5f9',
                      color: item.status === (t.profile?.lActive || 'Активно') ? 'var(--success)' : 'var(--text-muted)',
                      padding: '2px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0, marginLeft: '8px'
                    }}>{item.status}</span>
                  </div>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px'}}>📍 {item.location}</p>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem'}}>{item.price.toLocaleString()} ֏</span>
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button style={{padding: '6px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'white', cursor: 'pointer', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.85rem'}}>✏️</button>
                      <button style={{padding: '6px 14px', borderRadius: '10px', border: '1px solid #fecaca', background: '#fff5f5', cursor: 'pointer', fontWeight: 600, color: '#ef4444', fontSize: '0.85rem'}}>🗑️</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="card" onClick={() => navigate('add')} style={{
              borderRadius: '20px', height: '280px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              border: '2px dashed var(--border-color)', background: '#fafafa',
              transition: 'all 0.2s ease', color: 'var(--text-muted)', gap: '12px'
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.8rem'
              }}>+</div>
              <span style={{fontWeight: 600, fontSize: '1rem'}}>{t.owner?.addBtn?.replace('+ ', '') || 'Добавить объявление'}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="card" style={{borderRadius: '24px'}}>
          <h3 style={{color: 'var(--primary)', marginBottom: '20px', fontWeight: 700}}>{t.profile?.tBookings?.replace('📅 ', '') || 'Мои бронирования'}</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {[
              {title: 'Квартира ул. Абовяна', dates: '15 Апр – 20 Апр', price: 120000, status: 'confirmed'},
              {title: 'Студия Арабкир', dates: '10 Май – 10 Июн', price: 180000, status: 'pending'},
              {title: 'Офис Кентрон', dates: '5 Май – 6 Май', price: 45000, status: 'rejected'},
            ].map((b, i) => {
              const statusMap = {
                confirmed: {label: t.profile?.bConfirmed || '✓ Подтверждено', bg: 'rgba(16,185,129,0.1)', color: 'var(--success)'},
                pending: {label: t.profile?.bPending || '⏳ Ожидание', bg: 'rgba(245,158,11,0.1)', color: '#f59e0b'},
                rejected: {label: t.profile?.bRejected || '✕ Отклонено', bg: 'rgba(239,68,68,0.1)', color: '#ef4444'},
              };
              const s = statusMap[b.status];
              return (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px', borderRadius: '16px', background: '#f8fafc', flexWrap: 'wrap', gap: '12px'
                }}>
                  <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                    <div style={{width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)'}} />
                    <div>
                      <div style={{fontWeight: 700, color: 'var(--primary)'}}>{b.title}</div>
                      <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>📅 {b.dates}</div>
                    </div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <div style={{fontWeight: 800, color: 'var(--primary)'}}>{b.price.toLocaleString()} ֏</div>
                    <span style={{background: s.bg, color: s.color, padding: '6px 14px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem'}}>{s.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {[
            {user: 'Ани С.', text: 'Отличный хозяин, квартира идеально соответствует фотографиям!', rating: 5, date: '15 Март 2026'},
            {user: 'Давид М.', text: 'Быстрая связь, чисто и уютно. Рекомендую!', rating: 5, date: '10 Март 2026'},
          ].map((r, i) => (
            <div key={i} className="card" style={{borderRadius: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px'}}>
                <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                  <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700}}>{r.user[0]}</div>
                  <div>
                    <div style={{fontWeight: 700, color: 'var(--primary)'}}>{r.user}</div>
                    <div style={{color: '#f59e0b'}}>{'★'.repeat(r.rating)}</div>
                  </div>
                </div>
                <span style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>{r.date}</span>
              </div>
              <p style={{color: 'var(--text-muted)', lineHeight: 1.6, margin: 0}}>{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="card" style={{borderRadius: '24px'}}>
          <h3 style={{color: 'var(--primary)', marginBottom: '24px', fontWeight: 700}}>{t.profile?.tSettings?.replace('⚙️ ', '') || 'Настройки'}</h3>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>

            {/* Language Switcher */}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)'}}>
              <div>
                <div style={{fontWeight: 600, color: 'var(--primary)'}}>{
                  lang === 'am' ? 'Լե噪ո堮' : lang === 'ru' ? 'Язык' : 'Language'
                }</div>
                <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>HY / RU / EN</div>
              </div>
              <div style={{display: 'flex', gap: '8px'}}>
                {[{code: 'am', label: 'HY'}, {code: 'ru', label: 'RU'}, {code: 'en', label: 'EN'}].map(l => (
                  <button key={l.code} onClick={() => setLang && setLang(l.code)} style={{
                    padding: '8px 18px', borderRadius: '20px', fontWeight: 700, cursor: 'pointer',
                    fontSize: '0.9rem', border: 'none', transition: 'all 0.2s',
                    background: lang === l.code ? 'var(--primary)' : 'rgba(0,43,94,0.07)',
                    color: lang === l.code ? 'white' : 'var(--primary)',
                    boxShadow: lang === l.code ? '0 4px 10px rgba(0,43,94,0.3)' : 'none'
                  }}>{l.label}</button>
                ))}
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)'}}>
              <div>
                <div style={{fontWeight: 600, color: 'var(--primary)'}}>{t.profile?.sNotif || 'Уведомления'}</div>
                <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{t.profile?.sNotifDesc || 'Получать уведомления о бронированиях'}</div>
              </div>
              <div onClick={() => setNotif(n => !n)} style={{
                width: '52px', height: '28px', borderRadius: '14px',
                background: notif ? 'var(--success)' : '#e2e8f0',
                position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease'
              }}>
                <div style={{
                  position: 'absolute', top: '3px',
                  left: notif ? '26px' : '3px',
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'left 0.3s ease'
                }} />
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)'}}>
              <div>
                <div style={{fontWeight: 600, color: 'var(--primary)'}}>{t.profile?.sType || 'Тип аккаунта'}</div>
                <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{t.profile?.sTypeDesc || 'Текущая роль на платформе'}</div>
              </div>
              <span style={{background: 'rgba(0,43,94,0.1)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '20px', fontWeight: 600}}>{t.profile?.owner || 'Владелец'}</span>
            </div>

            <button onClick={() => navigate('home')} style={{
              padding: '14px', borderRadius: '14px',
              background: '#fff5f5', color: '#ef4444',
              border: '1px solid #fecaca', fontWeight: 700, fontSize: '1rem', cursor: 'pointer'
            }}>
              {t.profile?.logout || 'Выйти из аккаунта'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
