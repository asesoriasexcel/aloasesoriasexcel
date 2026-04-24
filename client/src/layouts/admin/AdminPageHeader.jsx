import React from 'react';

const AdminPageHeader = ({ title, subtitle, actions }) => (
  <div className="admin-page-header">
    <div className="admin-page-header__text">
      <h1 className="admin-page-header__title">{title}</h1>
      {subtitle && (
        <p className="admin-page-header__subtitle">{subtitle}</p>
      )}
    </div>
    {actions && (
      <div className="admin-page-header__actions">{actions}</div>
    )}
  </div>
);

export default AdminPageHeader;
