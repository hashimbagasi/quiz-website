import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <Link to="/privacy" className="footer-link">سياسة الخصوصية</Link>
          <Link to="/contact" className="footer-link">تواصل معنا</Link>
          <Link to="/about" className="footer-link">عن الموقع</Link>
        </div>
        
        <div className="footer-text">
          <p className="footer-text-p">
            ⭐ أضفنا للمفضلة، وارجع يوميًا لاختبارات جديدة!
          </p>
          <p>© 2025 موقع الاختبارات الترفيهية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 