import React from 'react';

const AdminStats = ({ items }) => (
  <div className="admin-stats">
    {items.map((item) => (
      <div key={item.label} className="admin-stat-item">
        <p className="admin-stat-item__label">{item.label}</p>
        <p className={`admin-stat-item__value${item.variant ? ` admin-stat-item__value--${item.variant}` : ''}`}>
          {item.value}
        </p>
      </div>
    ))}
  </div>
);

export default AdminStats;
