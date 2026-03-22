import React, { useState } from 'react';

const amenitiesAll = ['Wi-Fi', 'Кондиционер', 'Стиральная машина', 'Парковка', 'Смарт ТВ', 'Балкон', 'Лифт', 'Охрана'];

const PropertyDetail = ({ property, onClose, onDelete, onOpenChat, navigate, t }) => {
  const [days, setDays] = useState(1);
  const total = property.price * days;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', width: '100%', maxWidth: '820px',
        maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.15)'
      }}>
        {/* Header Image */}
        <div className={`${property.img}`} style={{height: '280px', borderRadius: '24px 24px 0 0', position: 'relative', background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)'}}>
          <button onClick={onClose} style={{
            position: 'absolute', top: '16px', left: '16px',
            width: '40px', height: '40px', borderRadius: '50%', background: 'white',
            border: 'none', cursor: 'pointer', fontSize: '1.2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>←</button>
          {onDelete && (
            <button onClick={() => onDelete(property.id)} title="Удалить" style={{
              position: 'absolute', top: '16px', left: '68px',
              width: '40px', height: '40px', borderRadius: '50%', background: 'white',
              border: 'none', cursor: 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)', color: '#ef4444'
            }}>🗑️</button>
          )}
          <span style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'var(--success)', color: 'white',
            padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700,
            boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)'
          }}>✓ {t.verifiedBadge || 'Ստուգված'}</span>
          <div style={{
            position: 'absolute', bottom: '16px', left: '24px',
            background: 'white', padding: '8px 16px', borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span style={{color: '#f59e0b', fontSize: '1.1rem'}}>★</span>
            <strong style={{color: 'var(--primary)'}}>{property.rating}</strong>
            <span style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>(34 {t.property?.reviews || 'отзыва'})</span>
          </div>
        </div>

        <div style={{display: 'flex', gap: '32px', padding: '32px', flexWrap: 'wrap'}}>
          {/* Details Column */}
          <div style={{flex: 2, minWidth: '280px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px'}}>
              <h2 style={{color: 'var(--primary)', fontSize: '1.6rem', fontWeight: 800, margin: 0}}>{property.title}</h2>
              <span style={{background: '#f1f5f9', color: 'var(--text-muted)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, flexShrink: 0, marginLeft: '12px'}}>{property.type}</span>
            </div>
            <p style={{color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1rem'}}>📍 {property.location}</p>

            <h4 style={{color: 'var(--primary)', fontWeight: 700, marginBottom: '12px'}}>{t.property?.descTitle || 'Описание'}</h4>
            <p style={{color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px'}}>
              Отличный вариант со всеми удобствами. Идеально подходит как для краткосрочной, так и для длительной аренды.
              Включает базовую мебель, скоростной интернет и бытовую технику. Готов к заселению сразу после оплаты.
            </p>

            <h4 style={{color: 'var(--primary)', fontWeight: 700, marginBottom: '16px'}}>{t.property?.amTitle || 'Удобства'}</h4>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px'}}>
              {amenitiesAll.map(a => (
                <div key={a} style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)'}}>
                  <span style={{color: 'var(--success)', fontWeight: 700}}>✓</span> {a}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Column */}
          <div style={{flex: 1, minWidth: '240px'}}>
            <div style={{background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px'}}>
              <div style={{fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px'}}>
                {property.price.toLocaleString()} ֏
              </div>
              <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px'}}>{t.property?.bookPeriod || 'за период'}</p>

              <label style={{display: 'block', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem'}}>{t.property?.dateIn || 'Дата заезда'}</label>
              <input type="date" style={{
                width: '100%', padding: '10px 14px', borderRadius: '12px',
                border: '1px solid var(--border-color)', marginBottom: '16px',
                outline: 'none', fontSize: '1rem', boxSizing: 'border-box'
              }} />

              <label style={{display: 'block', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem'}}>{t.property?.days || 'Кол-во дней'}</label>
              <input type="number" min="1" value={days} onChange={e => setDays(Number(e.target.value) || 1)}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '12px',
                  border: '1px solid var(--border-color)', marginBottom: '20px',
                  outline: 'none', fontSize: '1rem', boxSizing: 'border-box'
                }}
              />

              <div style={{display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid var(--border-color)', marginBottom: '16px'}}>
                <span style={{fontWeight: 600}}>{t.property?.total || 'Итого:'}</span>
                <span style={{fontWeight: 800, color: 'var(--primary)', fontSize: '1.25rem'}}>{total.toLocaleString()} ֏</span>
              </div>

              <button onClick={() => navigate('wallet')} style={{
                width: '100%', padding: '14px', borderRadius: '14px',
                background: 'var(--primary)', color: 'white', border: 'none',
                fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 43, 94, 0.3)',
                marginBottom: '10px'
              }}>
                {t.property?.bookBtn || 'Забронировать (Escrow)'}
              </button>
              <button onClick={() => {
                if (onOpenChat) {
                  onOpenChat({ id: property.id, name: property.title, avatar: '🏠', role: property.location, online: true });
                } else {
                  navigate('chat');
                }
              }} style={{
                width: '100%', padding: '12px', borderRadius: '14px',
                background: 'white', color: 'var(--primary)', border: '1.5px solid var(--primary)',
                fontWeight: 600, fontSize: '1rem', cursor: 'pointer'
              }}>
                {t.property?.msgBtn || '💬 Написать владельцу'}
              </button>
              <p style={{textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '12px'}}>
                {t.property?.escrowNote || '*Оплата заморожена до заселения'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
