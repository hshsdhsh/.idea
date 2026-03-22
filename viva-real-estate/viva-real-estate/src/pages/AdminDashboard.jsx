import React, { useState } from 'react';

const ROLES = ['Tenant', 'Owner', 'Agent', 'Cleaner', 'Admin'];

const initUsers = [
  { id: 'A982', name: 'Армен В.', role: 'Owner', plan: 'Pro', status: 'active' },
  { id: 'B451', name: 'Ани Асатрян', role: 'Agent', plan: 'Business', status: 'active' },
  { id: 'C122', name: 'Анна С.', role: 'Tenant', plan: 'Free', status: 'active' },
  { id: 'D301', name: 'Самвел К.', role: 'Cleaner', plan: 'Free', status: 'banned' },
];

const initComplaints = [
  { id: 1, title: 'Квартира ул. Пушкина (id: 45)', desc: 'Несоответствие фотографий реальности', resolved: false },
  { id: 2, title: 'Агент: Ани А.', desc: 'Попытка получить предоплату вне системы', resolved: false },
];

const AdminDashboard = ({ t }) => {
  const [users, setUsers] = useState(initUsers);
  const [complaints, setComplaints] = useState(initComplaints);
  const [confirmBan, setConfirmBan] = useState(null);

  const changeRole = (id, newRole) => {
    setUsers(us => us.map(u => u.id === id ? {...u, role: newRole} : u));
  };

  const toggleBan = (id) => {
    setUsers(us => us.map(u => u.id === id ? {...u, status: u.status === 'banned' ? 'active' : 'banned'} : u));
    setConfirmBan(null);
  };

  const resolveComplaint = (id) => setComplaints(cs => cs.map(c => c.id === id ? {...c, resolved: true} : c));
  const deleteComplaint = (id) => setComplaints(cs => cs.filter(c => c.id !== id));

  return (
    <div className="container" style={{padding: '32px 16px', maxWidth: '1000px', margin: '0 auto'}}>
      <h1 style={{color: 'var(--primary)', fontWeight: 800, fontSize: '1.8rem', marginBottom: '32px'}}>{t?.admin?.title || 'Панель Администратора'}</h1>

      {/* Stats */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px'}}>
        {[
          { label: t?.admin?.users || 'Пользователей', value: '1,248', delta: '+42', color: 'var(--primary)' },
          { label: t?.admin?.listings || 'Объявлений', value: '890', delta: '+18', color: 'var(--accent)' },
          { label: t?.admin?.escrowAmt || 'Escrow объём', value: '$12.5M', delta: '+$1.2M', color: 'var(--success)' },
        ].map((s, i) => (
          <div key={i} className="card" style={{borderRadius: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '2rem', fontWeight: 800, color: s.color}}>{s.value}</div>
            <div style={{color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px'}}>{s.delta}</div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* User Management */}
      <div className="card" style={{borderRadius: '24px', marginBottom: '24px', overflow: 'hidden'}}>
        <h3 style={{color: 'var(--primary)', fontWeight: 700, marginBottom: '20px'}}>{t?.admin?.userMgmt || 'Управление пользователями'}</h3>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid var(--border-color)'}}>
                {['ID', t?.admin?.thName || 'Имя', t?.admin?.thRole || 'Роль', t?.admin?.thPlan || 'Тариф', t?.admin?.thStatus || 'Статус', t?.admin?.thActions || 'Действия'].map((h, idx) => (
                  <th key={idx} style={{padding: '10px 12px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{borderBottom: '1px solid var(--border-color)', opacity: u.status === 'banned' ? 0.6 : 1}}>
                  <td style={{padding: '12px', color: 'var(--text-muted)', fontSize: '0.9rem'}}>#{u.id}</td>
                  <td style={{padding: '12px', fontWeight: 600, color: 'var(--primary)'}}>{u.name}</td>
                  <td style={{padding: '12px'}}>
                    <select value={u.role} onChange={e => changeRole(u.id, e.target.value)} style={{
                      padding: '6px 10px', borderRadius: '10px', border: '1px solid var(--border-color)',
                      background: 'white', fontWeight: 600, color: 'var(--primary)', fontSize: '0.9rem', cursor: 'pointer', outline: 'none'
                    }}>
                      {ROLES.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </td>
                  <td style={{padding: '12px'}}>
                    <span style={{
                      background: u.plan === 'Business' ? 'rgba(249,115,22,0.1)' : u.plan === 'Pro' ? 'rgba(0,43,94,0.08)' : '#f1f5f9',
                      color: u.plan === 'Business' ? 'var(--accent)' : u.plan === 'Pro' ? 'var(--primary)' : 'var(--text-muted)',
                      padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700
                    }}>{u.plan}</span>
                  </td>
                  <td style={{padding: '12px'}}>
                    <span style={{
                      background: u.status === 'banned' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                      color: u.status === 'banned' ? '#ef4444' : 'var(--success)',
                      padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700
                    }}>{u.status === 'banned' ? (t?.admin?.sBanned || 'Banned') : (t?.admin?.sActive || 'Active')}</span>
                  </td>
                  <td style={{padding: '12px'}}>
                    <button onClick={() => setConfirmBan(u)} style={{
                      padding: '6px 14px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', border: 'none',
                      background: u.status === 'banned' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                      color: u.status === 'banned' ? 'var(--success)' : '#ef4444'
                    }}>{u.status === 'banned' ? (t?.admin?.unban || '✓ Разбанить') : (t?.admin?.ban || '✕ Забанить')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complaints */}
      <div className="card" style={{borderRadius: '24px'}}>
        <h3 style={{color: 'var(--primary)', fontWeight: 700, marginBottom: '20px'}}>{t?.admin?.complaints || 'Жалобы и модерация'}</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          {complaints.map(c => (
            <div key={c.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px', borderRadius: '16px',
              background: c.resolved ? 'rgba(16,185,129,0.05)' : '#f8fafc',
              border: c.resolved ? '1px solid rgba(16,185,129,0.2)' : '1px solid var(--border-color)',
              flexWrap: 'wrap', gap: '12px', opacity: c.resolved ? 0.7 : 1
            }}>
              <div>
                <div style={{fontWeight: 700, color: 'var(--primary)', marginBottom: '4px'}}>{c.title}</div>
                <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>⚠️ {c.desc}</div>
              </div>
              {!c.resolved ? (
                <div style={{display: 'flex', gap: '10px'}}>
                  <button onClick={() => resolveComplaint(c.id)} style={{padding: '8px 16px', borderRadius: '12px', border: 'none', background: 'rgba(16,185,129,0.1)', color: 'var(--success)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem'}}>{t?.admin?.resolved || '✓ Решено'}</button>
                  <button onClick={() => deleteComplaint(c.id)} style={{padding: '8px 16px', borderRadius: '12px', border: 'none', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem'}}>{t?.admin?.delete || '✕ Удалить'}</button>
                </div>
              ) : (
                <span style={{color: 'var(--success)', fontWeight: 700, fontSize: '0.9rem'}}>{t?.admin?.resolved || '✓ Решено'}</span>
              )}
            </div>
          ))}
          {complaints.length === 0 && (
            <div style={{textAlign: 'center', color: 'var(--text-muted)', padding: '40px'}}>{t?.admin?.noComplaints || 'Нет активных жалоб 🎉'}</div>
          )}
        </div>
      </div>

      {/* Ban Confirmation Dialog */}
      {confirmBan && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'}}>
          <div style={{background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 25px 60px rgba(0,0,0,0.2)'}}>
            <div style={{fontSize: '3rem', marginBottom: '16px'}}>{confirmBan.status === 'banned' ? '✅' : '⛔'}</div>
            <h3 style={{color: 'var(--primary)', marginBottom: '12px', fontWeight: 800}}>
              {confirmBan.status === 'banned' ? (t?.admin?.qUnban || 'Разбанить пользователя?') : (t?.admin?.qBan || 'Забанить пользователя?')}
            </h3>
            <p style={{color: 'var(--text-muted)', marginBottom: '24px'}}>
              <strong>{confirmBan.name}</strong> — {confirmBan.role}
            </p>
            <div style={{display: 'flex', gap: '12px'}}>
              <button onClick={() => setConfirmBan(null)} style={{flex: 1, padding: '12px', borderRadius: '14px', background: '#f8fafc', border: '1px solid var(--border-color)', fontWeight: 600, cursor: 'pointer', color: 'var(--text-muted)'}}>{t?.owner?.lCancel || 'Отмена'}</button>
              <button onClick={() => toggleBan(confirmBan.id)} style={{flex: 1, padding: '12px', borderRadius: '14px', border: 'none', fontWeight: 700, cursor: 'pointer', background: confirmBan.status === 'banned' ? 'var(--success)' : '#ef4444', color: 'white'}}>
                {confirmBan.status === 'banned' ? (t?.admin?.unban?.replace('✓ ', '') || 'Разбанить') : (t?.admin?.ban?.replace('✕ ', '') || 'Забанить')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
