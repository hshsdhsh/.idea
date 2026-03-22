import React from 'react';
import './AdBanner.css';

const AdBanner = ({ title }) => {
  return (
    <div className="ad-container">
      <div className="ad-content">
        <span className="ad-icon">⭐</span>
        <span className="ad-text">{title}</span>
        <button className="ad-btn">Узнать больше</button>
      </div>
    </div>
  );
};

export default AdBanner;
