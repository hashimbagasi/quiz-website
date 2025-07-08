import React, { useState, useEffect, useCallback } from 'react';
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

  // تحسين أداء مراقبة التمرير باستخدام Intersection Observer
  useEffect(() => {
    if (location.pathname !== '/') {
      setQuizzesActive(false);
      return;
    }

    const el = document.getElementById('quizzes');
    if (!el) {
      setQuizzesActive(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setQuizzesActive(entry.isIntersecting);
        });
      },
      {
        threshold: 0.4, // 40% من العنصر يجب أن يكون ظاهر
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
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
    <div className="layout-root optimized-page">
      {/* Header */}
      <header className="header optimized-header">
        <div className="header-container optimized-layout">
          <div className="header-flex optimized-layout">
            {/* زر الدعم */}
            <a
              href="https://coff.ee/hashimbdev"
              target="_blank"
              rel="noopener noreferrer"
              className="support-btn optimized-button interactive-element"
              title="ادعمني على كوفي"
            >
              <span className="coffee-icon">☕</span>
              <span>ادعمني</span>
            </a>
            {/* قائمة الروابط */}
            <nav className="optimized-nav">
              <ul className="navbar-links optimized-list">
                <li>
                  <Link
                    className={`navbar-link optimized-nav-link${isActive('/') ? ' navbar-link--active' : ''}`}
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
                <li>
                  <Link
                    className={`navbar-link optimized-nav-link${isActive('/about') ? ' navbar-link--active' : ''}`}
                    to="/about"
                  >
                    عن الموقع
                  </Link>
                </li>
                <li>
                  <Link
                    className={`navbar-link optimized-nav-link${isActive('/#quizzes') ? ' navbar-link--active' : ''}`}
                    to="/#quizzes"
                    onClick={handleQuizzesClick}
                  >
                    الاختبارات
                  </Link>
                </li>
                <li>
                  <Link
                    className={`navbar-link optimized-nav-link${isActive('/blog') ? ' navbar-link--active' : ''}`}
                    to="/blog"
                  >
                    المدونة
                  </Link>
                </li>
              </ul>
            </nav>
            {/* الشعار */}
            <Link to="/" className="link-no-decoration optimized-image">
              <img src="/quizksa-logo.svg" alt="QuizKSA Logo" className="logo-img" />
            </Link>
            {/* زر الهامبرجر يظهر فقط في الشاشات الصغيرة */}
            <button className="hamburger optimized-button interactive-element" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        {/* قائمة Overlay تظهر عند فتح المنيو في الشاشات الصغيرة */}
        {menuOpen && (
          <div className="mobile-menu-overlay optimized-layout" onClick={() => setMenuOpen(false)}>
            <button className="mobile-menu-link optimized-nav-link" onClick={() => { setMenuOpen(false); navigate('/'); }}>الرئيسية</button>
            <button className="mobile-menu-link optimized-nav-link" onClick={() => { setMenuOpen(false); handleQuizzesClick(); }}>الاختبارات</button>
            <button className="mobile-menu-link optimized-nav-link" onClick={() => { setMenuOpen(false); navigate('/about'); }}>عن الموقع</button>
            <button className="mobile-menu-link optimized-nav-link" onClick={() => { setMenuOpen(false); navigate('/blog'); }}>المدونة</button>
            <button className="mobile-menu-link mobile-menu-link--close optimized-nav-link" onClick={() => setMenuOpen(false)}>إغلاق ✕</button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="optimized-main">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout; 