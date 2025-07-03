import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdsensePlaceholder from './AdsensePlaceholder';

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Adsense Sidebars - تظهر فقط على الشاشات الكبيرة */}
      <div style={{
        position: 'fixed',
        top: 120,
        right: 24,
        zIndex: 999,
        display: 'none',
      }}
      className="adsense-sidebar adsense-sidebar-right"
      >
        <AdsensePlaceholder height={300} />
      </div>
      <div style={{
        position: 'fixed',
        top: 120,
        left: 24,
        zIndex: 999,
        display: 'none',
      }}
      className="adsense-sidebar adsense-sidebar-left"
      >
        <AdsensePlaceholder height={300} />
      </div>
      {/* Header */}
      <header style={{ 
        background: 'white', 
        padding: '20px 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* تحسين تجاوب الهيدر للشاشات الصغيرة + منيو هامبرجر */}
        <style>{`
          @media (max-width: 500px) {
            .header-flex {
              flex-direction: column !important;
              gap: 8px !important;
              align-items: stretch !important;
            }
            .navbar-logo {
              font-size: 1.1rem !important;
              max-width: 100px !important;
              text-align: center !important;
            }
            .navbar-links {
              display: none !important;
            }
            .hamburger {
              display: flex !important;
            }
          }
          .hamburger {
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 102;
          }
          .hamburger span {
            display: block;
            width: 28px;
            height: 4px;
            margin: 4px 0;
            background: #F72585;
            border-radius: 2px;
            transition: 0.3s;
          }
          .mobile-menu-overlay {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(255,255,255,0.98);
            z-index: 101;
            transition: opacity 0.3s;
          }
          .mobile-menu-link {
            font-size: 1.3rem;
            color: #F72585;
            margin: 18px 0;
            text-decoration: none;
            font-weight: 700;
            background: none;
            border: none;
            cursor: pointer;
          }
        `}</style>
        <div className="container">
          <div className="header-flex" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '10px',
              flex: 1,
              minWidth: 0
            }}>
              <span style={{ fontSize: '2rem' }}>🧠</span>
              <h1 className="navbar-logo" style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#F72585',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                اختباراتي
              </h1>
            </div>
            {/* زر الهامبرجر يظهر فقط في الشاشات الصغيرة */}
            <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'flex-end' }}>
              <ul className="navbar-links" style={{ 
                display: 'flex', 
                listStyle: 'none', 
                gap: '30px',
                margin: 0,
                padding: 0,
                justifyContent: 'flex-end',
                width: '100%'
              }}>
                <li>
                  <Link
                    className="navbar-link"
                    to="/"
                    style={{
                      color: isActive('/') ? '#F72585' : '#1A1A1A',
                      textDecoration: 'none',
                      fontWeight: isActive('/') ? '700' : '500',
                      fontSize: '1.1rem',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: isActive('/') ? 'rgba(247,37,133,0.08)' : 'transparent',
                      transition: 'all 0.2s',
                      display: 'inline-block',
                    }}
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
                  <button
                    className="navbar-link"
                    style={{
                      background: isActive('/#quizzes') ? 'rgba(247,37,133,0.08)' : 'transparent',
                      border: 'none',
                      color: isActive('/#quizzes') ? '#F72585' : '#1A1A1A',
                      textDecoration: 'none',
                      fontWeight: isActive('/#quizzes') ? '700' : '500',
                      fontSize: '1.1rem',
                      borderRadius: '20px',
                      padding: '4px 12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'inline-block',
                    }}
                    onClick={handleQuizzesClick}
                  >
                    الاختبارات
                  </button>
                </li>
                <li>
                  <Link
                    className="navbar-link"
                    to="/about"
                    style={{
                      color: isActive('/about') ? '#F72585' : '#1A1A1A',
                      textDecoration: 'none',
                      fontWeight: isActive('/about') ? '700' : '500',
                      fontSize: '1.1rem',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: isActive('/about') ? 'rgba(247,37,133,0.08)' : 'transparent',
                      transition: 'all 0.2s',
                      display: 'inline-block',
                    }}
                  >
                    عن الموقع
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* قائمة Overlay تظهر عند فتح المنيو في الشاشات الصغيرة */}
        {menuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
            <button className="mobile-menu-link" onClick={() => { setMenuOpen(false); navigate('/'); }}>الرئيسية</button>
            <button className="mobile-menu-link" onClick={() => { setMenuOpen(false); handleQuizzesClick(); }}>الاختبارات</button>
            <button className="mobile-menu-link" onClick={() => { setMenuOpen(false); navigate('/about'); }}>عن الموقع</button>
            <button className="mobile-menu-link" style={{color:'#888',fontSize:'1rem',marginTop:'30px'}} onClick={() => setMenuOpen(false)}>إغلاق ✕</button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <AdsensePlaceholder height={90} />
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout; 