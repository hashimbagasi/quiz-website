import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
      <div style={{ fontSize: '5rem', marginBottom: 20 }}>😕</div>
      <h2 style={{ color: '#F72585', marginBottom: 16 }}>الصفحة غير موجودة</h2>
      <p style={{ color: '#666', marginBottom: 32 }}>يبدو أنك وصلت إلى رابط غير صحيح أو الصفحة لم تعد متوفرة.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>العودة للرئيسية</button>
    </div>
  );
};

export default NotFound; 