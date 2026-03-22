import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container" style={{padding: '40px 24px'}}>
      <h1 className="section-title">Панель Администратора</h1>
      
      <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px'}}>
        <div className="card text-center">
          <h3 className="text-muted">Всего пользователей</h3>
          <h1 style={{color: 'var(--primary)', fontSize: '3rem'}}>1,248</h1>
          <p style={{color: 'var(--success)', fontWeight: 600}}>+ 42 за неделю</p>
        </div>
        <div className="card text-center">
          <h3 className="text-muted">Активные объявления</h3>
          <h1 style={{color: 'var(--primary)', fontSize: '3rem'}}>890</h1>
        </div>
        <div className="card text-center">
          <h3 className="text-muted">Объем Escrow</h3>
          <h1 style={{color: 'var(--primary)', fontSize: '3rem'}}>$12.5M</h1>
        </div>
      </div>

      <div className="card" style={{marginBottom: '24px'}}>
        <h3 style={{color: 'var(--primary)', marginBottom: '16px'}}>Управление Пользователями (RBAC)</h3>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid var(--border-color)'}}>
                <th style={{padding: '12px 8px'}}>ID</th>
                <th style={{padding: '12px 8px'}}>Имя</th>
                <th style={{padding: '12px 8px'}}>Роль</th>
                <th style={{padding: '12px 8px'}}>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom: '1px solid var(--border-color)'}}>
                <td style={{padding: '12px 8px'}}>#A982</td>
                <td style={{padding: '12px 8px'}}>Армен В.</td>
                <td style={{padding: '12px 8px'}}><span className="badge badge-success">Владелец (Pro)</span></td>
                <td style={{padding: '12px 8px'}}><button className="btn btn-outline" style={{padding: '4px 8px'}}>Редактировать</button></td>
              </tr>
              <tr style={{borderBottom: '1px solid var(--border-color)'}}>
                <td style={{padding: '12px 8px'}}>#B451</td>
                <td style={{padding: '12px 8px'}}>Ани Асатрян</td>
                <td style={{padding: '12px 8px'}}><span className="badge" style={{background: 'var(--warning)', color: 'white'}}>Агент (Business)</span></td>
                <td style={{padding: '12px 8px'}}><button className="btn btn-outline" style={{padding: '4px 8px'}}>Редактировать</button></td>
              </tr>
              <tr>
                <td style={{padding: '12px 8px'}}>#C122</td>
                <td style={{padding: '12px 8px'}}>Анна С.</td>
                <td style={{padding: '12px 8px'}}><span className="badge" style={{background: '#e2e8f0', color: '#64748b'}}>Пользователь (Арендатор)</span></td>
                <td style={{padding: '12px 8px'}}><button className="btn btn-outline flex-1" style={{padding: '4px 8px', color: 'var(--danger)', borderColor: 'var(--danger)'}}>Забанить</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 style={{color: 'var(--primary)', marginBottom: '16px'}}>Жалобы и Модерация Контента</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between" style={{padding: '16px', background: 'var(--surface)', borderRadius: '8px'}}>
             <div>
               <h4 style={{fontWeight: 600}}>Квартира ул. Пушкина (id: 45)</h4>
               <p className="text-muted" style={{fontSize: '0.9rem'}}>Жалоба: Несоответствие фотографий реальности</p>
             </div>
             <div className="flex gap-4">
               <button className="btn btn-outline">Игнорировать</button>
               <button className="btn btn-primary" style={{background: 'var(--danger)', borderColor: 'var(--danger)'}}>Удалить объект</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
