import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizzesActive, setQuizzesActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // مراقبة ظهور قسم #quizzes في الشاشة
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('quizzes');
      if (el) {
        const rect = el.getBoundingClientRect();
        // إذا كان القسم ظاهر بنسبة 40% أو أكثر
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.2) {
          setQuizzesActive(true);
        } else {
          setQuizzesActive(false);
        }
      } else {
        setQuizzesActive(false);
      }
    };
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // تحقق أولي عند التحميل
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // تحديد الصفحة النشطة
  const isActive = (path: string) => {
    if (path === '/#quizzes') {
      // نشط فقط إذا كان قسم الاختبارات ظاهر فعلاً
      return quizzesActive;
    }
    if (path === '/') {
      // إذا كان المستخدم يرى قسم الاختبارات، لا تميز الرئيسية
      return location.pathname === '/' && !quizzesActive;
    }
    return location.pathname === path;
  };

  // دالة للانتقال السلس لقسم الاختبارات من أي صفحة
  const handleQuizzesClick = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('quizzes');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('quizzes');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // تأخير بسيط حتى يتم تحميل الصفحة الرئيسية
    }
  };

  return (
    <div className="layout-root">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-flex">
            {/* زر الدعم */}
            <a
              href="https://coff.ee/hashimbdev"
              target="_blank"
              rel="noopener noreferrer"
              className="support-btn"
              title="ادعمني على كوفي"
            >
              <span className="coffee-icon">☕</span>
              <span>ادعمني</span>
            </a>
            {/* الشعار */}
            <Link to="/" className="link-no-decoration">
              <img src="/quizksa-logo.svg" alt="QuizKSA Logo" className="logo-img" />
            </Link>
            {/* القائمة */}
            <nav>
              <ul className="navbar-links">
                <li>
                  <Link
                    className={`navbar-link${isActive('/blog') ? ' navbar-link--active' : ''}`}
                    to="/blog"
                  >
                    المدونة
                  </Link>
                </li>
                <li>
                  <Link
                    className={`navbar-link${isActive('/#quizzes') ? ' navbar-link--active' : ''}`}
                    to="/#quizzes"
                    onClick={handleQuizzesClick}
                  >
                    الاختبارات
                  </Link>
                </li>
                <li>
                  <Link
                    className={`navbar-link${isActive('/about') ? ' navbar-link--active' : ''}`}
                    to="/about"
                  >
                    عن الموقع
                  </Link>
                </li>
                <li>
                  <Link
                    className={`navbar-link${isActive('/') ? ' navbar-link--active' : ''}`}
                    to="/"
                    onClick={e => {
                      if (location.pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    الرئيسية
                  </Link>
                </li>
              </ul>
            </nav>
            {/* زر الهامبرجر يظهر فقط في الشاشات الصغيرة */}
            <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        {/* قائمة Overlay تظهر عند فتح المنيو في الشاشات الصغيرة */}
        {menuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
            <button className="mobile-menu-link" onClick={() => { setMenuOpen(false); navigate('/'); }}>الرئيسية</button>
            <button className="mobile-menu-link" onClick={() => { setMenuOpen(false); handleQuizzesClick(); }}>الاختبارات</button>
            <button className="mobile-menu-link" onClick={() => { setMenuOpen(false); navigate('/about'); }}>عن الموقع</button>
            <button className="mobile-menu-link" onClick={() => { setMenuOpen(false); navigate('/blog'); }}>المدونة</button>
            <button className="mobile-menu-link mobile-menu-link--close" onClick={() => setMenuOpen(false)}>إغلاق ✕</button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout; 