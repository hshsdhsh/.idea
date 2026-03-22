import React from 'react';

const CleaningPage = () => {
  return (
    <div className="container" style={{padding: '24px 16px', maxWidth: '400px', margin: '0 auto'}}>
       {/* Simulate Phone 3 Mobile view exactly as in mockup */}
       <div className="card" style={{borderRadius: '24px', overflow: 'hidden', padding: 0, boxShadow: 'var(--shadow-lg)', border: 'none'}}>
          <div style={{height: '160px', background: 'linear-gradient(45deg, #e2e8f0, #cbd5e1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
             <div style={{position: 'absolute', top: '16px', left: '16px', fontSize: '1.2rem', color: 'var(--primary)'}}>←</div>
             <span style={{fontSize: '3rem'}}>🧹</span>
          </div>
          <div style={{padding: '24px'}}>
             <div className="flex justify-between items-center" style={{marginBottom: '24px', marginTop: '-48px'}}>
                <div className="flex flex-col items-center w-full">
                  <div style={{width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', background: '#e2e8f0', border: '3px solid white', marginBottom: '8px', boxShadow: 'var(--shadow-sm)'}}>
                     <img src="https://i.pravatar.cc/150?img=5" alt="Shoghik" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  </div>
                  <h2 style={{fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '700'}}>Շողիկ Մաքրում</h2>
                  <div style={{color: '#f59e0b', fontSize: '1rem', fontWeight: '600'}}>4.9 ★</div>
                </div>
             </div>

             <div className="flex" style={{borderBottom: '1px solid var(--border-color)', marginBottom: '24px'}}>
               <div style={{flex: 1, textAlign: 'center', padding: '12px', borderBottom: '3px solid var(--primary)', color: 'var(--primary)', fontWeight: '700'}}>Services</div>
               <div style={{flex: 1, textAlign: 'center', padding: '12px', color: 'var(--text-muted)', fontWeight: '500'}}>Reviews</div>
             </div>

             <h3 style={{fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '16px', fontWeight: '700'}}>Services</h3>
             
             <div className="flex items-center justify-between" style={{padding: '16px 0', borderBottom: '1px solid var(--border-color)'}}>
               <div className="flex items-center gap-3">
                 <span style={{fontSize: '1.2rem'}}>🧹</span>
                 <span style={{fontWeight: '600', color: 'var(--text-main)'}}>Մաքրում</span>
               </div>
               <button className="btn btn-outline" style={{padding: '6px 20px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600'}}>Պատվիրել</button>
             </div>
             
             <div className="flex items-center justify-between" style={{padding: '16px 0', borderBottom: '1px solid var(--border-color)'}}>
               <div className="flex items-center gap-3">
                 <span style={{fontSize: '1.2rem'}}>🧽</span>
                 <span style={{fontWeight: '600', color: 'var(--text-main)'}}>Ապակիների Մաքրում</span>
               </div>
               <button className="btn btn-outline" style={{padding: '6px 20px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600'}}>Պատվիրել</button>
             </div>
             
             <div className="flex items-center justify-between" style={{padding: '16px 0'}}>
               <div className="flex items-center gap-3">
                 <span style={{fontSize: '1.2rem'}}>🧴</span>
                 <span style={{fontWeight: '600', color: 'var(--text-main)'}}>Քիմ Մաքրում</span>
               </div>
               <button className="btn btn-outline" style={{padding: '6px 20px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600'}}>Պատվիրել</button>
             </div>

             <button className="btn btn-primary w-full" style={{marginTop: '24px', borderRadius: '12px', padding: '14px', fontSize: '1.1rem', background: 'var(--primary)'}}>Պատվիրել</button>
          </div>
       </div>
    </div>
  );
};

export default CleaningPage;
