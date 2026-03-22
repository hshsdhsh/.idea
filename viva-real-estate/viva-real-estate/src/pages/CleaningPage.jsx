import React from 'react';

const CleaningPage = () => {
  return (
    <div className="container" style={{padding: '40px 24px'}}>
      <div className="text-center" style={{marginBottom: '48px'}}>
        <h1 className="section-title" style={{marginBottom: '16px'}}>Клининговые услуги</h1>
        <p className="text-muted" style={{fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto'}}>
          Закажите уборку для вашей недвижимости. Платите безопасно напрямую через внутренний кошелек после успешного принятия работы.
        </p>
      </div>

      <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px'}}>
        <div className="card hover-elevate">
          <div className="flex items-center gap-4" style={{marginBottom: '16px'}}>
            <div style={{width: '60px', height: '60px', borderRadius: '12px', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem'}}>✨</div>
            <div>
              <h3 style={{fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '600'}}>CleanHome LLC</h3>
              <span className="badge badge-success">Рейтинг 4.8 ★</span>
            </div>
          </div>
          <p className="text-muted" style={{marginBottom: '24px', lineHeight: '1.5'}}>Генеральная уборка, химчистка мебели, подготовка к заселению. Выезд в течение 2 часов.</p>
          <div className="flex justify-between items-center" style={{borderTop: '1px solid var(--border-color)', paddingTop: '16px'}}>
            <span style={{fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary)'}}>от 15,000 ֏</span>
            <button className="btn btn-outline" style={{padding: '8px 16px'}}>Оформить заказ</button>
          </div>
        </div>

        <div className="card hover-elevate">
          <div className="flex items-center gap-4" style={{marginBottom: '16px'}}>
            <div style={{width: '60px', height: '60px', borderRadius: '12px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem'}}>🧹</div>
            <div>
              <h3 style={{fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '600'}}>Мария К. (Мастер)</h3>
              <span className="badge badge-success">Рейтинг 5.0 ★</span>
            </div>
          </div>
          <p className="text-muted" style={{marginBottom: '24px', lineHeight: '1.5'}}>Тщательная уборка небольших квартир. Отличное качество по доступной цене для посуточной аренды.</p>
          <div className="flex justify-between items-center" style={{borderTop: '1px solid var(--border-color)', paddingTop: '16px'}}>
            <span style={{fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary)'}}>от 8,000 ֏</span>
            <button className="btn btn-outline" style={{padding: '8px 16px'}}>Забронировать</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleaningPage;
