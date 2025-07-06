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
        <style>{`
          @media (max-width: 900px) {
            .header-flex {
              flex-direction: column !important;
              gap: 12px !important;
              align-items: stretch !important;
            }
            .navbar-logo {
              font-size: 1.1rem !important;
              max-width: 100px !important;
              text-align: center !important;
            }
            .navbar-links {
              flex-direction: column !important;
              gap: 12px !important;
              align-items: center !important;
              margin: 0 !important;
            }
            .support-btn {
              align-self: center !important;
              margin: 0 0 8px 0 !important;
            }
          }
          .support-btn {
            background: linear-gradient(135deg, #FFD700 0%, #F72585 100%);
            color: #fff;
            border-radius: 24px;
            padding: 8px 20px;
            font-size: 1rem;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(247,37,133,0.10);
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            transition: all 0.3s;
            cursor: pointer;
            border: none;
            height: 40px;
            margin-left: 16px;
          }
          .support-btn:hover {
            filter: brightness(1.1);
            box-shadow: 0 4px 16px #F7258540;
          }
        `}</style>
        <div className="container">
          <div className="header-flex" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {/* زر الدعم */}
            <a
              href="https://coff.ee/hashimbdev"
              target="_blank"
              rel="noopener noreferrer"
              className="support-btn"
              title="ادعمني على كوفي"
            >
              <span style={{ fontSize: '1.2rem' }}>☕</span>
              <span>ادعمني</span>
            </a>
            {/* الشعار */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 8 }}>
              <img src="/quizksa-logo.svg" alt="QuizKSA Logo" style={{ height: 48, display: 'block' }} />
            </Link>
            {/* القائمة */}
            <nav style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
              <ul className="navbar-links" style={{ 
                display: 'flex', 
                listStyle: 'none', 
                gap: '30px',
                margin: 0,
                padding: 0,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
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
                      fontFamily: 'inherit',
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
                <li>
                  <Link
                    className="navbar-link"
                    to="/blog"
                    style={{
                      color: isActive('/blog') ? '#F72585' : '#1A1A1A',
                      textDecoration: 'none',
                      fontWeight: isActive('/blog') ? '700' : '500',
                      fontSize: '1.1rem',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: isActive('/blog') ? 'rgba(247,37,133,0.08)' : 'transparent',
                      transition: 'all 0.2s',
                      display: 'inline-block',
                    }}
                  >
                    المدونة
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