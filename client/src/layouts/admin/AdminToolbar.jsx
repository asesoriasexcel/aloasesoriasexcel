import React from 'react';

const AdminToolbar = ({ children, primaryAction }) => (
  <div className="admin-toolbar">
    {children}
    {primaryAction && (
      <div className="admin-toolbar__primary">{primaryAction}</div>
    )}
  </div>
);

export default AdminToolbar;
