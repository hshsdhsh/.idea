import React, { useState } from 'react';

const OwnerDashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="container" style={{padding: '40px 24px'}}>
      <div className="flex justify-between items-center" style={{marginBottom: '32px'}}>
        <h1 className="section-title" style={{marginBottom: 0}}>Моя недвижимость</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Добавить объект</button>
      </div>

      <div className="card" style={{marginBottom: '24px'}}>
        <div className="flex justify-between items-center">
          <div>
            <h3 style={{fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '4px', fontWeight: '600'}}>Квартира в центре, ул. Абовяна</h3>
            <p className="text-muted">Статус: <span style={{color: 'var(--success)', fontWeight: '600'}}>Сдана</span> (Через Escrow)</p>
          </div>
          <div className="text-right">
            <h4 style={{fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '700'}}>250,000 ֏ / мес</h4>
            <p className="text-muted" style={{fontSize: '0.9rem'}}>Поступление: завтра</p>
          </div>
        </div>
        <div style={{marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-color)'}}>
          <h4 style={{marginBottom: '12px', color: 'var(--primary)', fontWeight: '600'}}>Управление недвижимостью</h4>
          <div className="flex gap-4">
            <button className="btn btn-outline" style={{padding: '8px 16px'}}>Редактировать</button>
            <button className="btn btn-outline" style={{padding: '8px 16px'}}>Нанять клининг-сервис</button>
          </div>
        </div>
      </div>
      
      {showAddModal && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div className="card glass-search flex flex-col gap-4" style={{width: '90%', maxWidth: '600px', padding: '32px', background: 'white', border: 'none'}}>
            <h2 style={{color: 'var(--primary)'}}>Новое объявление</h2>
            <p className="text-muted" style={{marginBottom: '8px'}}>Заполните данные для размещения в системе Escrow.</p>
            
            <input type="text" placeholder="Название объекта (напр. Уютная квартира)" className="search-input w-full" />
            
            <div className="flex gap-4">
              <input type="text" placeholder="Локация" className="search-input w-full" />
              <select className="search-input fluid" style={{minWidth: '150px'}}>
                <option>Квартира</option>
                <option>Дом</option>
                <option>Офис</option>
              </select>
            </div>
            
            <input type="number" placeholder="Цена в ֏ за месяц" className="search-input w-full" />
            <textarea placeholder="Описание объекта..." className="search-input w-full" rows="4"></textarea>
            
            <div className="flex justify-end gap-4" style={{marginTop: '16px'}}>
              <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Отмена</button>
              <button className="btn btn-primary" onClick={() => setShowAddModal(false)}>Опубликовать (5,000 ֏)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
