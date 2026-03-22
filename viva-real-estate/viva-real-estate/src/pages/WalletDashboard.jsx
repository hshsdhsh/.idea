import React, { useState } from 'react';
import './WalletDashboard.css';

const WalletDashboard = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('wallet');
  const [balance, setBalance] = useState(145000);

  const topUp = (amount) => setBalance(prev => prev + amount);

  return (
    <div className="container" style={{padding: '40px 24px'}}>
      <div className="flex justify-between items-center" style={{marginBottom: '32px'}}>
        <h1 className="section-title" style={{marginBottom: 0}}>Личный кабинет</h1>
        <div className="flex gap-4">
          <div className="text-right">
            <h3 style={{color: 'var(--primary)'}}>Армен В.</h3>
            <p className="text-muted" style={{fontSize: '0.9rem'}}>На платформе с 2024 г. • Рейтинг: 4.9 ★</p>
          </div>
          <div style={{width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold'}}>АВ</div>
        </div>
      </div>

      <div className="tabs-container flex gap-4" style={{marginBottom: '32px', borderBottom: '1px solid var(--border-color)', overflowX: 'auto'}}>
        <button className={`tab-btn ${activeTab === 'wallet' ? 'active' : ''}`} onClick={() => setActiveTab('wallet')}>Кошелек</button>
        <button className={`tab-btn ${activeTab === 'subscriptions' ? 'active' : ''}`} onClick={() => setActiveTab('subscriptions')}>Подписки (Уровни)</button>
        <button className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>Мои бронирования</button>
      </div>

      {activeTab === 'wallet' && (
        <div className="wallet-grid">
          <div className="card balance-card">
            <h3 className="text-muted" style={{marginBottom: '8px'}}>Доступный баланс</h3>
            <h1 style={{fontSize: '3rem', color: 'var(--primary)', marginBottom: '8px'}}>{balance.toLocaleString()} ֏</h1>
            
            <div className="fast-topup flex gap-4" style={{marginTop: '24px', marginBottom: '24px'}}>
              <button className="btn btn-outline flex-1" onClick={() => topUp(5000)}>+ 5,000 ֏</button>
              <button className="btn btn-outline flex-1" onClick={() => topUp(10000)}>+ 10,000 ֏</button>
              <button className="btn btn-outline flex-1" onClick={() => topUp(25000)}>+ 25,000 ֏</button>
            </div>

            <div className="flex gap-4">
              <button className="btn btn-primary flex-1">Пополнить картой</button>
              <button className="btn btn-outline flex-1">Telcell / Idram</button>
            </div>
          </div>
          
          <div className="card tx-card">
            <h3 style={{marginBottom: '24px', color: 'var(--primary)'}}>История транзакций</h3>
            <div className="tx-list flex flex-col gap-4">
              <div className="tx-item flex justify-between items-center pb-4 border-b">
                <div>
                  <h4 style={{fontWeight: 600}}>Оплата уборки (CleanHome LLC)</h4>
                  <p className="text-muted" style={{fontSize: '0.85rem'}}>Сегодня, 10:45</p>
                </div>
                <span style={{color: 'var(--danger)', fontWeight: 600}}>- 15,000 ֏</span>
              </div>
              <div className="tx-item flex justify-between items-center pb-4 border-b">
                <div>
                  <h4 style={{fontWeight: 600}}>Пополнение (Telcell)</h4>
                  <p className="text-muted" style={{fontSize: '0.85rem'}}>Вчера, 18:20</p>
                </div>
                <span style={{color: 'var(--success)', fontWeight: 600}}>+ 50,000 ֏</span>
              </div>
              <div className="tx-item flex justify-between items-center pb-4 border-b">
                <div>
                  <h4 style={{fontWeight: 600}}>Оплата подписки Pro</h4>
                  <p className="text-muted" style={{fontSize: '0.85rem'}}>15 Марта 2026</p>
                </div>
                <span style={{color: 'var(--danger)', fontWeight: 600}}>- 15,000 ֏</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'subscriptions' && (
        <div className="subscriptions-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px'}}>
          <div className="card sub-card text-center" style={{opacity: 0.7}}>
            <h3 style={{fontSize: '1.5rem', marginBottom: '8px'}}>Бесплатно</h3>
            <h2 style={{fontSize: '2rem', color: 'var(--primary)', marginBottom: '24px'}}>0 ֏ <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/ мес</span></h2>
            <ul className="text-muted text-left" style={{lineHeight: 2, marginBottom: '24px', listStyle: 'none', padding: 0}}>
              <li>✓ Базовый доступ</li>
              <li>✓ 5,000 ֏ за каждое объявление</li>
              <li>✓ Стандартная поддержка</li>
            </ul>
            <button className="btn btn-outline w-full text-muted" disabled>Вы используете</button>
          </div>

          <div className="card sub-card text-center" style={{border: '2px solid var(--accent)', transform: 'scale(1.05)', position: 'relative'}}>
            <div className="badge badge-success" style={{position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)'}}>Популярный</div>
            <h3 style={{fontSize: '1.5rem', marginBottom: '8px', color: 'var(--accent)'}}>Pro</h3>
            <h2 style={{fontSize: '2rem', color: 'var(--primary)', marginBottom: '24px'}}>15,000 ֏ <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/ мес</span></h2>
            <ul className="text-muted text-left" style={{lineHeight: 2, marginBottom: '24px', listStyle: 'none', padding: 0}}>
              <li>✓ <b>Безлимитные</b> объявления</li>
              <li>✓ Значок "Featured" в поиске</li>
              <li>✓ Приоритетная поддержка</li>
            </ul>
            <button className="btn btn-primary w-full shadow-lg">Активировать</button>
          </div>

          <div className="card sub-card text-center">
            <h3 style={{fontSize: '1.5rem', marginBottom: '8px'}}>Business</h3>
            <h2 style={{fontSize: '2rem', color: 'var(--primary)', marginBottom: '24px'}}>45,000 ֏ <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/ мес</span></h2>
            <ul className="text-muted text-left" style={{lineHeight: 2, marginBottom: '24px', listStyle: 'none', padding: 0}}>
              <li>✓ Все функции тарифа Pro</li>
              <li>✓ Статус "Verified" агента</li>
              <li>✓ Доступ к глубокой аналитике</li>
              <li>✓ Персональный менеджер</li>
            </ul>
            <button className="btn btn-outline w-full">Активировать</button>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="card">
          <h3 style={{marginBottom: '24px', color: 'var(--primary)'}}>Активные и Прошлые Бронирования</h3>
          <div className="flex flex-col gap-4">
            <div className="search-input w-full flex justify-between items-center" style={{background: 'var(--surface)', border: 'none'}}>
              <div className="flex gap-4 items-center">
                 <div style={{width: '60px', height: '60px', borderRadius: '8px', background: 'linear-gradient(45deg, #e2e8f0, #cbd5e1)'}}></div>
                 <div>
                   <h4 style={{fontWeight: 600}}>Квартира ул. Абовяна</h4>
                   <p className="text-muted" style={{fontSize: '0.9rem'}}>15 Апр - 20 Апр 2026 (5 дней)</p>
                 </div>
              </div>
              <div className="text-right">
                 <h4 style={{fontWeight: 700, color: 'var(--primary)'}}>120,000 ֏</h4>
                 <span className="badge badge-success">Подтверждено</span>
              </div>
            </div>

             <div className="search-input w-full flex justify-between items-center" style={{background: 'var(--surface)', border: 'none', opacity: 0.7}}>
              <div className="flex gap-4 items-center">
                 <div style={{width: '60px', height: '60px', borderRadius: '8px', background: 'linear-gradient(45deg, #cbd5e1, #94a3b8)'}}></div>
                 <div>
                   <h4 style={{fontWeight: 600}}>Студия Арабкир</h4>
                   <p className="text-muted" style={{fontSize: '0.9rem'}}>10 Май - 10 Июн 2026 (1 Месяц)</p>
                 </div>
              </div>
              <div className="text-right">
                 <h4 style={{fontWeight: 700, color: 'var(--primary)'}}>180,000 ֏</h4>
                 <span className="badge" style={{background: 'var(--warning)', color: 'white'}}>Ожидание</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletDashboard;
