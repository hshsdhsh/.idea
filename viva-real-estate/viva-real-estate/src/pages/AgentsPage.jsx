import React from 'react';

const AgentsPage = () => {
  return (
    <div className="container" style={{padding: '40px 24px'}}>
      <div className="text-center" style={{marginBottom: '48px'}}>
        <h1 className="section-title" style={{marginBottom: '16px'}}>Надежные брокеры и агенты</h1>
        <p className="text-muted" style={{fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto'}}>
          Профессионалы, которые помогут безопасно купить или продать недвижимость. Рейтинги формируются автоматически на основе реальных проверенных Escrow-сделок.
        </p>
      </div>

      <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
        <div className="card text-center">
          <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #60a5fa)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 'bold'}}>ДА</div>
          <h3 style={{fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '600'}}>Давид Арутюнян</h3>
          <p className="text-muted" style={{marginBottom: '16px'}}>Эксперт по Центру и Арабкиру</p>
          <div className="flex justify-center gap-2" style={{marginBottom: '24px'}}>
            <span className="badge badge-success">Рейтинг: 4.9 ★</span>
            <span className="badge" style={{background: '#f8fafc', border: '1px solid #e2e8f0'}}>45 Сделок</span>
          </div>
          <button className="btn btn-primary w-full">Связаться в чате</button>
        </div>

        <div className="card text-center">
          <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 'bold'}}>AA</div>
          <h3 style={{fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '600'}}>Ани Асатрян</h3>
          <p className="text-muted" style={{marginBottom: '16px'}}>Коммерческая недвижимость</p>
          <div className="flex justify-center gap-2" style={{marginBottom: '24px'}}>
            <span className="badge badge-success">Рейтинг: 5.0 ★</span>
            <span className="badge" style={{background: '#f8fafc', border: '1px solid #e2e8f0'}}>120 Сделок</span>
          </div>
          <button className="btn btn-primary w-full">Связаться в чате</button>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
