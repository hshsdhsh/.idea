import React, { useState } from 'react';
import AdBanner from '../components/AdBanner';
import BookingModal from '../components/BookingModal';
import './RentDashboard.css';

const mockProperties = [
  { id: 1, title: 'Квартира в центре', location: 'ул. Абовяна, Ереван', type: 'Квартира', price: 250000, img: 'img-1', rating: 4.8 },
  { id: 2, title: 'Уютная студия', location: 'Арабкир, Ереван', type: 'Квартира', price: 180000, img: 'img-2', rating: 4.6 },
  { id: 3, title: 'Офис Open Space', location: 'Кентрон, Ереван', type: 'Офис', price: 400000, img: 'img-1', rating: 5.0 },
  { id: 4, title: 'Частный дом с садом', location: 'Нор Норк, Ереван', type: 'Дом', price: 350000, img: 'img-2', rating: 4.9 },
];

const RentDashboard = ({ navigate, t }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Любой тип');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProps = mockProperties.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = category === 'Любой тип' || p.type === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="rent-page container">
      <AdBanner title={t ? t.ad : "Реклама"} />
      <h1 className="section-title" style={{marginBottom: '24px', marginTop: '24px'}}>Аренда недвижимости</h1>
      
      {/* Glassmorphism Search Bar */}
      <div className="search-bar glass-search items-center">
        <input 
          type="text" 
          placeholder="Живой поиск по названию или локации..." 
          className="search-input fluid" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 category-filters">
          {['Любой тип', 'Квартира', 'Дом', 'Офис'].map(type => (
            <button 
              key={type} 
              className={`btn ${category === type ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setCategory(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="property-grid" style={{marginTop: '32px'}}>
        {filteredProps.length > 0 ? filteredProps.map(p => (
          <div key={p.id} className="card property-card">
            <div className={`property-image ${p.img}`}></div>
            <div className="property-content">
              <div className="flex justify-between items-center" style={{marginBottom: '8px'}}>
                <h3 className="property-title">{p.title}</h3>
                <span className="badge badge-success">Escrow</span>
              </div>
              <div className="flex justify-between">
                <p className="property-location text-muted">{p.location}</p>
                <span className="text-muted" style={{fontWeight: 'bold', color: '#f59e0b'}}>★ {p.rating}</span>
              </div>
              <p className="text-muted" style={{marginTop: '8px', fontSize: '0.9rem'}}>Тип: <span style={{fontWeight: 600}}>{p.type}</span></p>
              
              <div className="property-price" style={{marginTop: 'auto', paddingTop: '16px'}}>{p.price.toLocaleString()} ֏ <span>/ месяц</span></div>
              
              <div className="flex gap-4">
                <button className="btn btn-outline flex-1" onClick={() => setSelectedProperty(p)}>Детали</button>
                <button className="btn btn-primary flex-1" onClick={() => setSelectedProperty(p)}>Бронь</button>
              </div>
            </div>
          </div>
        )) : (
          <div className="card text-center" style={{gridColumn: '1 / -1', padding: '40px'}}>
            <h3 style={{color: 'var(--text-muted)'}}>Ничего не найдено по вашему запросу "{searchTerm}"</h3>
          </div>
        )}
      </div>

      {selectedProperty && (
        <BookingModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
          navigate={navigate} 
        />
      )}
    </div>
  );
};

export default RentDashboard;
