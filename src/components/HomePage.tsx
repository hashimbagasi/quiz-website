import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz, getQuizzesByCategory } from '../data/quizzes';
import QuizCard from './QuizCard';
import SearchAndFilter from './SearchAndFilter';
import { blogPosts, BlogPost } from '../data/blogPosts';
import TopRatedQuizzes from './TopRatedQuizzes';
import { CommentService } from '../services/commentService';
import { QuizStats } from '../lib/supabase';
import '../styles/HomePage.css';

interface HomePageProps {
  quizzes: Quiz[];
}

const HomePage: React.FC<HomePageProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quizStats, setQuizStats] = useState<Record<string, QuizStats>>({});

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#FAFAFA';
      document.body.style.color = '#1A1A1A';
    }
  }, [isDarkMode]);

  useEffect(() => {
    // جلب جميع إحصائيات الاختبارات من Supabase
    const fetchStats = async () => {
      const statsArr = await CommentService.getMostCompletedQuizzes(1000); // جلب كل الإحصائيات
      const statsMap: Record<string, QuizStats> = {};
      statsArr.forEach(stat => {
        statsMap[stat.quiz_id] = stat;
      });
      setQuizStats(statsMap);
    };
    fetchStats();
  }, []);

  const filteredQuizzes = useMemo(() => {
    let filtered = quizzes;

    // تصفية حسب الفئة
    if (selectedCategory !== 'الكل') {
      filtered = getQuizzesByCategory(selectedCategory);
    }

    // تصفية حسب البحث (دائمًا على النتائج المصفاة بالفئة)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(q) ||
        quiz.description.toLowerCase().includes(q) ||
        quiz.category.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [quizzes, searchQuery, selectedCategory]);

  const handleQuizClick = (quizId: string) => {
    navigate(`/quiz/${quizId}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #a4508b 0%, #f7666f 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🧠</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>جاري تحميل الاختبارات...</div>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid rgba(255,255,255,0.3)', 
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '20px auto'
          }}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: isDarkMode ? '#1a1a1a' : '#FAFAFA',
      color: isDarkMode ? '#ffffff' : '#1A1A1A',
      transition: 'all 0.3s ease'
    }}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: '30px',
          left: '30px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: isDarkMode ? 'linear-gradient(135deg, #7209B7, #F72585)' : 'linear-gradient(135deg, #F72585, #7209B7)',
          color: 'white',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(247,37,133,0.3)',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F72585, #7209B7)',
            color: 'white',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(247,37,133,0.3)',
            zIndex: 1000,
            transition: 'all 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          ↑
        </button>
      )}

      {/* Custom Hero Title & Description */}
      <section
        style={{
          background: 'linear-gradient(135deg, #a4508b 0%, #f7666f 100%)',
          color: 'white',
          padding: '48px 16px 32px 16px',
          textAlign: 'center',
          borderRadius: '0 0 32px 32px',
          marginBottom: '32px',
          boxShadow: '0 4px 24px rgba(114,9,183,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="fade-in"
      >
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '60px',
          height: '60px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '40px',
          height: '40px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '18px',
            letterSpacing: '-1px',
            lineHeight: 1.2,
            textShadow: '0 2px 8px rgba(0,0,0,0.10)'
          }}
        >
          <span role="img" aria-label="star">⭐</span> جاهز تتحدى نفسك؟ جرب اختباراتنا وخلك الأسطورة!
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            maxWidth: 600,
            margin: '0 auto',
            background: 'rgba(255,255,255,0.10)',
            borderRadius: '16px',
            padding: '18px 20px',
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            color: '#fff',
            lineHeight: 1.7
          }}
        >
          اختبارات ترفيهية بتعابير ولهجاتنا، من اختبار الذكاء لاختبارات اللهجات.<br/>
          نتيجتك تقدر تشاركها مع أصحابك، وتضحك معهم على النتيجة 😄<br/>
          بسيطة، سريعة، ومجانية!
        </p>
        
        {/* Quick stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{quizzes.length}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>اختبار</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{blogPosts.length}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>مقالة</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>100%</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>مجاني</div>
          </div>
        </div>

        {/* Random Quiz Button */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={() => {
              const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
              handleQuizClick(randomQuiz.id);
            }}
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '32px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(255,107,107,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(255,107,107,0.4)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,107,107,0.3)';
            }}
          >
            🎲 اختبرني عشوائياً!
          </button>
          <p style={{ 
            marginTop: '12px', 
            fontSize: '0.9rem', 
            opacity: 0.8,
            fontStyle: 'italic'
          }}>
            لا تعرف ماذا تختار؟ اضغط هنا واترك الحظ يختار لك! 🍀
          </p>
        </div>
      </section>
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 1s 0.2s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
        .quiz-card {
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 12px rgba(164,80,139,0.08);
          border-radius: 18px !important;
        }
        .quiz-card:hover {
          transform: translateY(-8px) scale(1.04);
          box-shadow: 0 8px 32px rgba(247,102,111,0.18);
        }
        .btn-primary {
          background: linear-gradient(90deg, #a4508b 0%, #f7666f 100%);
          color: #fff;
          border: none;
          border-radius: 24px;
          padding: 12px 32px;
          font-size: 1.1rem;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(164,80,139,0.10);
          transition: background 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .btn-primary:hover {
          background: linear-gradient(90deg, #f7666f 0%, #a4508b 100%);
          transform: scale(1.06);
        }
      `}</style>

      {/* All Quizzes Section */}
      <section id="quizzes" className="container" style={{ marginTop: '80px', marginBottom: '80px' }}>
        {/* Featured Quizzes Section */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: isDarkMode ? '#ffffff' : '#1A1A1A',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            ⭐ الاختبارات المميزة
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {quizzes
              .filter(quiz => quiz.popularity > 2500)
              .slice(0, 2)
              .map((quiz) => (
                <div
                  key={quiz.id}
                  onClick={() => handleQuizClick(quiz.id)}
                  style={{
                    background: isDarkMode ? '#2a2a2a' : 'white',
                    borderRadius: '20px',
                    padding: '32px',
                    boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(164,80,139,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isDarkMode ? '1px solid #333' : '1px solid #f0f0f0',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = isDarkMode 
                      ? '0 16px 48px rgba(247,37,133,0.3)' 
                      : '0 16px 48px rgba(247,37,133,0.25)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = isDarkMode 
                      ? '0 8px 32px rgba(0,0,0,0.3)' 
                      : '0 8px 32px rgba(164,80,139,0.15)';
                  }}
                >
                  {/* Featured Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    zIndex: 2
                  }}>
                    ⭐ مميز
                  </div>

                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{quiz.image}</div>
                    <h4 style={{
                      fontSize: '1.6rem',
                      fontWeight: '700',
                      marginBottom: '12px',
                      color: isDarkMode ? '#ffffff' : '#1A1A1A'
                    }}>
                      {quiz.title}
                    </h4>
                    <p style={{
                      color: isDarkMode ? '#cccccc' : '#666',
                      marginBottom: '20px',
                      lineHeight: 1.6
                    }}>
                      {quiz.description}
                    </p>
                    <div style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #F72585, #7209B7)',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '20px'
                    }}>
                      {quiz.category}
                    </div>
                    <div style={{
                      color: '#F72585',
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom: '24px'
                    }}>
                      🔥 {quiz.popularity.toLocaleString()} تجربة
                    </div>
                    <button
                      style={{
                        background: 'linear-gradient(135deg, #F72585, #7209B7)',
                        color: 'white',
                        border: 'none',
                        padding: '14px 32px',
                        borderRadius: '24px',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(247,37,133,0.3)'
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      🚀 ابدأ الآن
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* All Quizzes Title */}
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '40px', 
          color: isDarkMode ? '#ffffff' : '#1A1A1A',
          fontSize: '2rem',
          fontWeight: '600'
        }}>
          جميع الاختبارات
        </h2>

        {/* New Quizzes Section */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: isDarkMode ? '#ffffff' : '#1A1A1A',
            fontSize: '1.5rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #00D4AA, #0099CC)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '0.8rem',
              fontWeight: '700'
            }}>
              جديد
            </span>
            الاختبارات الجديدة
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {quizzes
              .slice(0, 3)
              .map((quiz, index) => (
                <div
                  key={quiz.id}
                  onClick={() => handleQuizClick(quiz.id)}
                  style={{
                    background: isDarkMode ? '#2a2a2a' : 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,212,170,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isDarkMode ? '1px solid #333' : '1px solid #f0f0f0',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: `slideInFromBottom 0.6s ease-out ${index * 0.1}s both`
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                    e.currentTarget.style.boxShadow = isDarkMode 
                      ? '0 12px 32px rgba(0,212,170,0.3)' 
                      : '0 12px 32px rgba(0,212,170,0.25)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = isDarkMode 
                      ? '0 4px 20px rgba(0,0,0,0.3)' 
                      : '0 4px 20px rgba(0,212,170,0.15)';
                  }}
                >
                  {/* New Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'linear-gradient(135deg, #00D4AA, #0099CC)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    zIndex: 2
                  }}>
                    🆕 جديد
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '3rem', 
                      marginBottom: '12px',
                      animation: 'pulse 2s infinite'
                    }}>
                      {quiz.image}
                    </div>
                    <h4 style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      marginBottom: '8px',
                      color: isDarkMode ? '#ffffff' : '#1A1A1A'
                    }}>
                      {quiz.title}
                    </h4>
                    <p style={{
                      color: isDarkMode ? '#cccccc' : '#666',
                      marginBottom: '16px',
                      lineHeight: 1.5,
                      fontSize: '0.9rem'
                    }}>
                      {quiz.description}
                    </p>
                    <div style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      background: 'linear-gradient(135deg, #00D4AA, #0099CC)',
                      color: 'white',
                      borderRadius: '16px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      marginBottom: '16px'
                    }}>
                      {quiz.category}
                    </div>
                    <button
                      style={{
                        background: 'linear-gradient(135deg, #00D4AA, #0099CC)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: '20px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0,212,170,0.3)'
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      جرب الآن
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Quick Categories Section */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: isDarkMode ? '#ffffff' : '#1A1A1A',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            🎯 تصفح حسب الفئة
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '30px'
          }}>
            {[
              { name: 'الكل', icon: '🌟', color: '#F72585', count: quizzes.length },
              { name: 'لهجات', icon: '🗣️', color: '#96CEB4', count: quizzes.filter(q => q.category === 'لهجات').length },
              { name: 'ذكاء', icon: '🧠', color: '#FF6B6B', count: quizzes.filter(q => q.category === 'ذكاء').length },
              { name: 'معلومات عامة', icon: '📚', color: '#4ECDC4', count: quizzes.filter(q => q.category === 'معلومات عامة').length },
              { name: 'تحليل شخصية', icon: '🎭', color: '#45B7D1', count: quizzes.filter(q => q.category === 'تحليل شخصية').length }
            ].map((category, index) => (
              <div
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                style={{
                  background: isDarkMode ? '#2a2a2a' : 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: isDarkMode ? '1px solid #333' : '1px solid #f0f0f0',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `slideInFromBottom 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 12px 32px ${category.color}40`;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = isDarkMode 
                    ? '0 4px 20px rgba(0,0,0,0.3)' 
                    : '0 4px 20px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '16px',
                  animation: 'pulse 2s infinite'
                }}>
                  {category.icon}
                </div>
                <h4 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: isDarkMode ? '#ffffff' : '#1A1A1A'
                }}>
                  {category.name}
                </h4>
                <div style={{
                  background: category.color,
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  {category.count} اختبار
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          isDarkMode={isDarkMode}
        />
        {filteredQuizzes.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: isDarkMode ? '#cccccc' : '#666'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ marginBottom: '10px', color: isDarkMode ? '#ffffff' : '#1A1A1A' }}>لم نجد اختبارات</h3>
            <p>جرب البحث بكلمات مختلفة أو اختر فئة أخرى</p>
          </div>
        ) : (
          <div className="quiz-grid">
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onClick={() => handleQuizClick(quiz.id)}
                completionCount={quizStats[quiz.id]?.completion_count ?? 0}
              />
            ))}
          </div>
        )}

        {/* Suggested Quizzes Section */}
        {filteredQuizzes.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ 
              textAlign: 'center', 
              marginBottom: '30px', 
              color: isDarkMode ? '#ffffff' : '#1A1A1A',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              💡 قد يعجبك أيضاً
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {quizzes
                .filter(quiz => quiz.popularity > 2000 && !filteredQuizzes.find(fq => fq.id === quiz.id))
                .slice(0, 3)
                .map((quiz, index) => (
                  <div
                    key={quiz.id}
                    onClick={() => handleQuizClick(quiz.id)}
                    style={{
                      background: isDarkMode ? '#2a2a2a' : 'white',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(164,80,139,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: isDarkMode ? '1px solid #333' : '1px solid #f0f0f0',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: `slideInFromBottom 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                      e.currentTarget.style.boxShadow = isDarkMode 
                        ? '0 12px 32px rgba(164,80,139,0.3)' 
                        : '0 12px 32px rgba(164,80,139,0.2)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = isDarkMode 
                        ? '0 4px 20px rgba(0,0,0,0.3)' 
                        : '0 4px 20px rgba(164,80,139,0.1)';
                    }}
                  >
                    {/* Suggested Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      zIndex: 2
                    }}>
                      💡 مقترح
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '3rem', 
                        marginBottom: '12px',
                        animation: 'pulse 2s infinite'
                      }}>
                        {quiz.image}
                      </div>
                      <h4 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        marginBottom: '8px',
                        color: isDarkMode ? '#ffffff' : '#1A1A1A'
                      }}>
                        {quiz.title}
                      </h4>
                      <p style={{
                        color: isDarkMode ? '#cccccc' : '#666',
                        marginBottom: '16px',
                        lineHeight: 1.5,
                        fontSize: '0.9rem'
                      }}>
                        {quiz.description}
                      </p>
                      <div style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, #F72585, #7209B7)',
                        color: 'white',
                        borderRadius: '16px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        marginBottom: '16px'
                      }}>
                        {quiz.category}
                      </div>
                      <button
                        style={{
                          background: 'linear-gradient(135deg, #F72585, #7209B7)',
                          color: 'white',
                          border: 'none',
                          padding: '10px 24px',
                          borderRadius: '20px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(247,37,133,0.3)'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        جرب الآن
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* Blog Section */}
      <section className="container" style={{ marginTop: '60px' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '40px', 
          color: isDarkMode ? '#ffffff' : '#1A1A1A',
          fontSize: '2rem',
          fontWeight: '600'
        }}>
          📚 المدونة
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '32px'
        }}>
          {blogPosts.slice(0, 3).map((post: BlogPost) => (
            <div key={post.id} style={{
              background: isDarkMode ? '#2a2a2a' : '#fff',
              borderRadius: '16px',
              boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(164,80,139,0.08)',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: isDarkMode ? '1px solid #333' : '1px solid #f0f0f0'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = isDarkMode 
                ? '0 12px 32px rgba(0,0,0,0.4)' 
                : '0 8px 24px rgba(164,80,139,0.15)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = isDarkMode 
                ? '0 4px 20px rgba(0,0,0,0.3)' 
                : '0 2px 12px rgba(164,80,139,0.08)';
            }}
            >
              <div>
                <div style={{ color: '#F72585', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{post.category}</div>
                <a href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: isDarkMode ? '#ffffff' : '#1A1A1A' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 10, lineHeight: 1.4 }}>{post.title}</h3>
                </a>
                <div style={{ color: isDarkMode ? '#aaaaaa' : '#888', fontSize: '0.9rem', marginBottom: 10 }}>
                  {new Date(post.date).toLocaleDateString('ar-SA')} • {post.readTime}
                </div>
                <div style={{ color: isDarkMode ? '#cccccc' : '#666', fontSize: '1rem', marginBottom: 12 }}>{post.excerpt}</div>
              </div>
              <a href={`/blog/${post.id}`} style={{
                background: 'linear-gradient(135deg, #F72585, #7209B7)',
                color: 'white',
                padding: '8px 18px',
                borderRadius: '20px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                alignSelf: 'flex-start',
                marginTop: 'auto',
                transition: 'background 0.2s, transform 0.2s'
              }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >اقرأ المزيد →</a>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <a href="/blog" style={{
            background: 'linear-gradient(135deg, #F72585, #7209B7)',
            color: 'white',
            padding: '10px 32px',
            borderRadius: '24px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(164,80,139,0.10)',
            transition: 'background 0.2s, transform 0.2s'
          }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >عرض كل المقالات</a>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        background: isDarkMode ? '#2a2a2a' : 'white', 
        padding: '80px 20px',
        marginTop: '60px',
        borderTop: isDarkMode ? '1px solid #333' : '1px solid #f0f0f0'
      }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '60px', 
            color: isDarkMode ? '#ffffff' : '#1A1A1A',
            fontSize: '2rem',
            fontWeight: '600'
          }}>
            لماذا تختار اختباراتنا؟
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
              <h3 style={{ marginBottom: '15px', color: isDarkMode ? '#ffffff' : '#1A1A1A' }}>اختبارات متنوعة</h3>
              <p style={{ color: isDarkMode ? '#cccccc' : '#666' }}>لهجات، ذكاء، معلومات عامة، وتحليل شخصية</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📱</div>
              <h3 style={{ marginBottom: '15px', color: isDarkMode ? '#ffffff' : '#1A1A1A' }}>متجاوب بالكامل</h3>
              <p style={{ color: isDarkMode ? '#cccccc' : '#666' }}>يعمل بشكل مثالي على جميع الأجهزة</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚀</div>
              <h3 style={{ marginBottom: '15px', color: isDarkMode ? '#ffffff' : '#1A1A1A' }}>سريع وسهل</h3>
              <p style={{ color: isDarkMode ? '#cccccc' : '#666' }}>ابدأ الاختبار فوراً بدون تسجيل دخول</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📤</div>
              <h3 style={{ marginBottom: '15px', color: isDarkMode ? '#ffffff' : '#1A1A1A' }}>شارك النتائج</h3>
              <p style={{ color: isDarkMode ? '#cccccc' : '#666' }}>شارك نتائجك مع أصدقائك بسهولة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Quizzes Section */}
      <TopRatedQuizzes />

      {/* Statistics Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
        padding: '80px 20px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ 
            marginBottom: '60px', 
            fontSize: '2.5rem',
            fontWeight: '700',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            إحصائيات الموقع
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3.5rem', 
                fontWeight: '800',
                marginBottom: '10px',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                animation: 'bounce 2s infinite'
              }}>
                {quizzes.length}+
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>اختبار متنوع</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3.5rem', 
                fontWeight: '800',
                marginBottom: '10px',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                animation: 'bounce 2s infinite 0.5s'
              }}>
                {blogPosts.length}+
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>مقالة تعليمية</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3.5rem', 
                fontWeight: '800',
                marginBottom: '10px',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                animation: 'bounce 2s infinite 1s'
              }}>
                100%
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>مجاني تماماً</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3.5rem', 
                fontWeight: '800',
                marginBottom: '10px',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                animation: 'bounce 2s infinite 1.5s'
              }}>
                24/7
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>متاح دائماً</div>
            </div>
          </div>

          {/* Interactive Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {[
              { icon: '🎯', title: 'دقة الاختبارات', value: '95%', color: '#FFD700' },
              { icon: '⚡', title: 'سرعة التحميل', value: '< 2s', color: '#00D4AA' },
              { icon: '📱', title: 'متوافق مع', value: 'جميع الأجهزة', color: '#4ECDC4' },
              { icon: '🌟', title: 'تقييم المستخدمين', value: '4.8/5', color: '#FF6B6B' }
            ].map((stat, index) => (
              <div
                key={stat.title}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '32px 24px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  animation: `slideInFromBottom 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}>
                  {stat.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '12px',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}>
                  {stat.title}
                </h3>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: stat.color,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div style={{ 
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '40px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ 
              fontSize: '1.8rem',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              جاهز تبدأ رحلتك؟
            </h3>
            <p style={{ 
              fontSize: '1.1rem',
              marginBottom: '30px',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto 30px auto'
            }}>
              انضم لآلاف المستخدمين الذين يختبرون معرفتهم ويستمتعون بوقتهم
            </p>
            <button
              onClick={() => document.getElementById('quizzes')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'white',
                color: '#F72585',
                border: 'none',
                padding: '16px 40px',
                borderRadius: '32px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              🚀 ابدأ الآن مجاناً
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 