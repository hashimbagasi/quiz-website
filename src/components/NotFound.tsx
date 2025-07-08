import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container not-found-container">
      <div className="not-found-emoji">😕</div>
      <h2 className="not-found-title">الصفحة غير موجودة</h2>
      <p className="not-found-description">يبدو أنك وصلت إلى رابط غير صحيح أو الصفحة لم تعد متوفرة.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>العودة للرئيسية</button>
    </div>
  );
};

export default NotFound; 