import React, { useState } from 'react';

const TYPES = ['Apartment', 'House', 'Office', 'Room'];
const AMENITIES_LIST = ['Wi-Fi', 'A/C', 'Washer', 'Parking', 'Smart TV', 'Balcony', 'Elevator', 'Security'];

const defaultListings = [
  { id: 1, title: 'Квартира ул. Абовяна', location: 'Кентрон, Ереван', type: 'Apartment', price: 250000, status: 'active' },
  { id: 2, title: 'Студия Арабкир', location: 'Арабкир, Ереван', type: 'Apartment', price: 180000, status: 'rented' },
];

const OwnerDashboard = ({ navigate, t }) => {
  const [listings, setListings] = useState(defaultListings);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', location: '', type: TYPES[0], price: '', description: '', amenities: [], imgUrl: '' });
  const [errors, setErrors] = useState({});
  const [imgPreview, setImgPreview] = useState(null);

  const resetForm = () => {
    setForm({ title: '', location: '', type: TYPES[0], price: '', description: '', amenities: [], imgUrl: '' });
    setErrors({});
    setEditId(null);
    setImgPreview(null);
  };

  const openAdd = () => { resetForm(); setShowForm(true); };
  const openEdit = (li) => {
    setForm({ title: li.title, location: li.location, type: li.type, price: String(li.price), description: li.description || '', amenities: li.amenities || [], imgUrl: li.imgUrl || '' });
    setImgPreview(li.imgUrl || null);
    setEditId(li.id);
    setShowForm(true);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setErrors(prev => ({ ...prev, img: 'Фото слишком большое (макс. 1МБ)' }));
      return;
    }
    setErrors(prev => ({ ...prev, img: null }));
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgPreview(ev.target.result);
      setForm(f => ({ ...f, imgUrl: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Введите название';
    if (!form.location.trim()) e.location = 'Введите адрес';
    if (!form.price || Number(form.price) <= 0) e.price = 'Укажите цену';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    if (editId) {
      setListings(ls => ls.map(l => l.id === editId ? {...l, ...form, price: Number(form.price)} : l));
    } else {
      setListings(ls => [...ls, { id: Date.now(), ...form, price: Number(form.price), status: 'active' }]);
    }
    setShowForm(false);
    resetForm();
  };

  const handleDelete = (id) => setListings(ls => ls.filter(l => l.id !== id));

  const toggleAmenity = (a) => {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a]
    }));
  };

  return (
    <div className="container" style={{padding: '32px 16px', maxWidth: '900px', margin: '0 auto'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px'}}>
        <div>
          <h1 style={{color: 'var(--primary)', fontWeight: 800, fontSize: '1.8rem', margin: 0}}>{t?.owner?.title || 'Моя недвижимость'}</h1>
          <p style={{color: 'var(--text-muted)', marginTop: '4px'}}>{listings.length} {t?.owner?.count || 'объявлений'}</p>
        </div>
        <button onClick={openAdd} style={{
          padding: '12px 24px', borderRadius: '24px', background: 'var(--primary)', color: 'white',
          border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,43,94,0.3)'
        }}>{t?.owner?.addBtn || '+ Добавить объект'}</button>
      </div>

      {/* Stats */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px'}}>
        {[
          { label: t?.owner?.sActive || 'Активных', value: listings.filter(l => l.status === 'active').length, color: 'var(--success)' },
          { label: t?.owner?.sRented || 'Сдано', value: listings.filter(l => l.status === 'rented').length, color: 'var(--accent)' },
          { label: t?.owner?.sIncome || 'Доход / мес', value: listings.reduce((s, l) => l.status === 'rented' ? s + l.price : s, 0).toLocaleString() + ' ֏', color: 'var(--primary)' },
        ].map((s, i) => (
          <div key={i} className="card" style={{borderRadius: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '1.8rem', fontWeight: 800, color: s.color}}>{s.value}</div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px'}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Listings Grid */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px'}}>
        {listings.map(li => (
          <div key={li.id} className="card" style={{padding: 0, borderRadius: '20px', overflow: 'hidden'}}>
            <div style={{height: '160px', background: li.imgUrl ? 'none' : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)', position: 'relative', overflow: 'hidden'}}>
              {li.imgUrl && <img src={li.imgUrl} alt={li.title} style={{width:'100%',height:'100%',objectFit:'cover'}} />}
              <span style={{
                position: 'absolute', top: '12px', right: '12px',
                background: li.status === 'active' ? 'var(--success)' : '#94a3b8',
                color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700
              }}>● {li.status === 'active' ? (t?.profile?.lActive || 'Активно') : (t?.profile?.lRented || 'Сдано')}</span>
            </div>
            <div style={{padding: '20px'}}>
              <h4 style={{fontWeight: 700, color: 'var(--primary)', margin: '0 0 4px'}}>{li.title}</h4>
              <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 4px'}}>📍 {li.location}</p>
              <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 14px'}}>{li.type}</p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem'}}>{li.price.toLocaleString()} ֏</span>
                <div style={{display: 'flex', gap: '8px'}}>
                  <button onClick={() => openEdit(li)} style={{padding: '6px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'white', cursor: 'pointer', fontWeight: 600, color: 'var(--primary)', fontSize: '0.85rem'}}>✏️</button>
                  <button onClick={() => handleDelete(li.id)} style={{padding: '6px 14px', borderRadius: '10px', border: '1px solid #fecaca', background: '#fff5f5', cursor: 'pointer', fontWeight: 600, color: '#ef4444', fontSize: '0.85rem'}}>🗑️</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'}}>
          <div style={{background: 'white', borderRadius: '24px', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 25px 60px rgba(0,0,0,0.2)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h2 style={{color: 'var(--primary)', fontWeight: 800, margin: 0}}>{editId ? (t?.owner?.mEdit || 'Редактировать') : (t?.owner?.mNew || 'Новое объявление')}</h2>
              <button onClick={() => setShowForm(false)} style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)'}}>✕</button>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>

              {/* Image Upload */}
              <div>
                <label style={{display: 'block', fontWeight: 600, color: 'var(--primary)', marginBottom: '8px', fontSize: '0.9rem'}}>🖼️ Фотография</label>
                <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start'}}>
                  <label style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                    borderRadius: '12px', border: '1.5px dashed var(--border-color)', cursor: 'pointer',
                    color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', background: '#f8fafc'
                  }}>
                    📁 Загрузить файл
                    <input type="file" accept="image/*" onChange={handleImageFile} style={{display:'none'}} />
                  </label>
                  <input
                    type="url"
                    value={form.imgUrl.startsWith('data:') ? '' : form.imgUrl}
                    onChange={e => { setForm(f => ({...f, imgUrl: e.target.value})); setImgPreview(e.target.value || null); }}
                    placeholder="Или вставьте URL фото..."
                    style={{flex: 1, minWidth: '180px', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid var(--border-color)', outline: 'none', fontSize: '0.9rem'}}
                  />
                </div>
                {errors.img && <p style={{color: '#ef4444', fontSize: '0.85rem', margin: '4px 0 0'}}>{errors.img}</p>}
                {imgPreview && (
                  <div style={{marginTop: '10px', borderRadius: '12px', overflow: 'hidden', height: '120px', position: 'relative'}}>
                    <img src={imgPreview} alt="preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={() => setImgPreview(null)} />
                    <button onClick={() => { setImgPreview(null); setForm(f => ({...f, imgUrl: ''})); }} style={{position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '0.9rem'}}>✕</button>
                  </div>
                )}
              </div>
              {[
                {key: 'title', label: t?.owner?.fTitle || 'Название объекта', placeholder: t?.owner?.pTitle || 'Уютная квартира у центра'},
                {key: 'location', label: t?.owner?.fLoc || 'Адрес / Район', placeholder: t?.owner?.pLoc || 'ул. Абовяна, Кентрон'},
              ].map(f => (
                <div key={f.key}>
                  <label style={{display: 'block', fontWeight: 600, color: 'var(--primary)', marginBottom: '6px', fontSize: '0.9rem'}}>{f.label}</label>
                  <input
                    value={form[f.key]}
                    onChange={e => setForm(fm => ({...fm, [f.key]: e.target.value}))}
                    placeholder={f.placeholder}
                    style={{width: '100%', padding: '12px 16px', borderRadius: '12px', border: errors[f.key] ? '1.5px solid #ef4444' : '1.5px solid var(--border-color)', outline: 'none', fontSize: '1rem', boxSizing: 'border-box'}}
                  />
                  {errors[f.key] && <p style={{color: '#ef4444', fontSize: '0.85rem', margin: '4px 0 0'}}>{errors[f.key]}</p>}
                </div>
              ))}

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <div>
                  <label style={{display: 'block', fontWeight: 600, color: 'var(--primary)', marginBottom: '6px', fontSize: '0.9rem'}}>{t?.owner?.fType || 'Тип'}</label>
                  <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))} style={{width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid var(--border-color)', outline: 'none', fontSize: '1rem', background: 'white'}}>
                    {TYPES.map(type => <option key={type}>{type}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{display: 'block', fontWeight: 600, color: 'var(--primary)', marginBottom: '6px', fontSize: '0.9rem'}}>{t?.owner?.fPrice || 'Цена (֏ / мес)'}</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm(f => ({...f, price: e.target.value}))}
                    placeholder="250000"
                    style={{width: '100%', padding: '12px 16px', borderRadius: '12px', border: errors.price ? '1.5px solid #ef4444' : '1.5px solid var(--border-color)', outline: 'none', fontSize: '1rem', boxSizing: 'border-box'}}
                  />
                  {errors.price && <p style={{color: '#ef4444', fontSize: '0.85rem', margin: '4px 0 0'}}>{errors.price}</p>}
                </div>
              </div>

              <div>
                <label style={{display: 'block', fontWeight: 600, color: 'var(--primary)', marginBottom: '6px', fontSize: '0.9rem'}}>{t?.property?.descTitle || 'Описание'}</label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={e => setForm(f => ({...f, description: e.target.value}))}
                  placeholder={t?.owner?.pDesc || "Опишите объект..."}
                  style={{width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid var(--border-color)', outline: 'none', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit'}}
                />
              </div>

              <div>
                <label style={{display: 'block', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px', fontSize: '0.9rem'}}>{t?.property?.amTitle || 'Удобства'}</label>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px'}}>
                  {AMENITIES_LIST.map(a => (
                    <div key={a} onClick={() => toggleAmenity(a)} style={{
                      padding: '10px 8px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer',
                      fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s ease',
                      background: form.amenities.includes(a) ? 'rgba(0,43,94,0.1)' : '#f8fafc',
                      color: form.amenities.includes(a) ? 'var(--primary)' : 'var(--text-muted)',
                      border: form.amenities.includes(a) ? '1.5px solid var(--primary)' : '1.5px solid transparent'
                    }}>{a}</div>
                  ))}
                </div>
              </div>

              <div style={{display: 'flex', gap: '12px', marginTop: '8px'}}>
                <button onClick={() => setShowForm(false)} style={{flex: 1, padding: '14px', borderRadius: '14px', background: '#f8fafc', border: '1px solid var(--border-color)', fontWeight: 600, cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1rem'}}>{t?.owner?.lCancel || 'Отмена'}</button>
                <button onClick={handleSubmit} style={{flex: 2, padding: '14px', borderRadius: '14px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 12px rgba(0,43,94,0.3)'}}>
                  {editId ? (t?.owner?.lSave || 'Сохранить изменения') : (t?.owner?.lPublish || 'Опубликовать объявление')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
