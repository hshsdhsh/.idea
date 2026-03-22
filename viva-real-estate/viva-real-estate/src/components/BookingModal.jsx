import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ property, onClose, navigate }) => {
  const [days, setDays] = useState(1);
  const total = property.price * days;

  return (
    <div className="modal-overlay glass-search" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
      <div className="card booking-modal">
        <div className="flex justify-between items-center" style={{marginBottom: '16px'}}>
          <h2 style={{color: 'var(--primary)'}}>{property.title}</h2>
          <button className="btn btn-outline" style={{padding: '4px 12px'}} onClick={onClose}>✕</button>
        </div>
        
        <div className="gallery">
          <div className={`gallery-main ${property.img}`}></div>
          <div className="gallery-thumbs">
            <div className={`thumb ${property.img}`}></div>
            <div className={`thumb ${property.img}`}></div>
            <div className={`thumb ${property.img}`}></div>
          </div>
        </div>

        <div className="flex gap-6 split-view">
          <div className="property-details">
            <p className="text-muted" style={{marginBottom: '16px'}}>{property.location} • ★ {property.rating}</p>
            <h4 style={{marginBottom: '8px', color: 'var(--primary)'}}>Описание</h4>
            <p className="text-muted" style={{lineHeight: 1.6}}>Отличный вариант со всеми удобствами. Идеально подходит как для краткосрочной, так и для длительной аренды. Включает базовую мебель, скоростной интернет и бытовую технику. Готов к заселению сразу после оплаты через Escrow.</p>
            
            <h4 style={{marginTop: '24px', marginBottom: '8px', color: 'var(--primary)'}}>Удобства</h4>
            <ul className="amenities text-muted">
              <li>✓ Wi-Fi</li>
              <li>✓ Кондиционер</li>
              <li>✓ Стиральная машина</li>
              <li>✓ Парковка</li>
              <li>✓ Смарт ТВ</li>
              <li>✓ Утюг</li>
            </ul>
          </div>

          <div className="booking-form card bg-surface">
            <h3 style={{marginBottom: '16px'}}>{property.price.toLocaleString()} ֏ <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/ период</span></h3>
            
            <label className="text-muted" style={{display: 'block', marginBottom: '8px', fontWeight: 600}}>Даты заезда</label>
            <input type="date" className="search-input w-full" style={{marginBottom: '16px'}} />
            
            <label className="text-muted" style={{display: 'block', marginBottom: '8px', fontWeight: 600}}>Длительность аренды</label>
            <input type="number" min="1" value={days} onChange={(e) => setDays(Number(e.target.value) || 1)} className="search-input w-full" style={{marginBottom: '24px'}} />
            
            <div className="flex justify-between items-center" style={{borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginBottom: '24px'}}>
              <span style={{fontWeight: 600}}>Итого к оплате:</span>
              <span style={{fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)'}}>{total.toLocaleString()} ֏</span>
            </div>

            <button className="btn btn-primary w-full" onClick={() => navigate('wallet')}>Забронировать (Escrow)</button>
            <p className="text-center text-muted" style={{fontSize: '0.8rem', marginTop: '12px'}}>*Сумма будет надежно заморожена в вашем кошельке до успешного заселения</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
