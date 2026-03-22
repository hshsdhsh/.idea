import React from 'react';

const AgentsPage = () => {
  return (
    <div className="container" style={{padding: '24px 16px', maxWidth: '400px', margin: '0 auto'}}>
       {/* Simulate Phone 1 Mobile view exactly as in mockup */}
       <div className="card" style={{padding: 0, overflow: 'hidden', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', border: 'none'}}>
         <div style={{background: 'var(--primary)', padding: '32px 24px', textAlign: 'center', color: 'white', position: 'relative'}}>
            <div style={{position: 'absolute', top: '16px', left: '16px', fontSize: '1.2rem'}}>←</div>
            <div style={{position: 'absolute', top: '16px', right: '16px', fontSize: '1.2rem'}}>⚙️</div>

            <div style={{width: '90px', height: '90px', borderRadius: '50%', margin: '0 auto 16px', overflow: 'hidden', border: '3px solid white', background: '#e2e8f0'}}>
               <img src="https://i.pravatar.cc/150?img=11" alt="Armen" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <h2 style={{fontSize: '1.4rem', marginBottom: '4px', fontWeight: '600'}}>Արմեն Խաչատրյան</h2>
            <p style={{opacity: 0.9, fontSize: '0.95rem', marginBottom: '8px'}}>Գույքի Գործակալ</p>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', color: '#fbbf24', fontWeight: '600'}}>
               4.8 <span style={{fontSize: '1.1rem'}}>★</span>
            </div>
         </div>
         
         <div style={{padding: '24px'}}>
            <button className="btn btn-primary w-full" style={{marginBottom: '24px', borderRadius: '12px', padding: '14px', fontSize: '1.1rem', background: 'var(--primary)'}}>Կապվել</button>
            
            <div className="flex" style={{borderBottom: '1px solid var(--border-color)', marginBottom: '24px'}}>
               <div style={{flex: 1, textAlign: 'center', padding: '12px', borderBottom: '3px solid var(--primary)', color: 'var(--primary)', fontWeight: '700'}}>Ակտիվ</div>
               <div style={{flex: 1, textAlign: 'center', padding: '12px', color: 'var(--text-muted)', fontWeight: '500'}}>Active</div>
            </div>

            <div className="property-card" style={{border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden'}}>
               <div className="property-image img-1" style={{height: '160px'}}>
                  <span className="verified-badge">Ստուգված</span>
               </div>
               <div style={{padding: '16px'}}>
                  <h4 style={{fontSize: '1.1rem', marginBottom: '4px', color: 'var(--primary)', fontWeight: '700'}}>Վարձակալություն</h4>
                  <div className="flex justify-between items-end">
                     <span style={{fontWeight: '700', fontSize: '1.2rem'}}>250,000 ֏</span>
                     <span style={{color: 'var(--success)', fontWeight: '600', fontSize: '0.9rem', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '8px'}}>Ստուգված</span>
                  </div>
               </div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default AgentsPage;
