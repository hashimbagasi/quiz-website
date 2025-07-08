import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz, getQuizzesByCategory } from '../data/quizzes';
import QuizCard from './QuizCard';
import SearchAndFilter from './SearchAndFilter';
import { blogPosts, BlogPost } from '../data/blogPosts';
import TopRatedQuizzes from './TopRatedQuizzes';
import { CommentService } from '../services/commentService';
import { QuizStats, Comment } from '../lib/supabase';
import CommentsMarquee from './CommentsMarquee';
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
  const [quizStats, setQuizStats] = useState<Record<string, QuizStats>>({});
  const [allComments, setAllComments] = useState<Comment[]>([]);

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

    // جلب كل التعليقات
    const fetchAllComments = async () => {
      const comments = await CommentService.getAllComments();
      setAllComments(comments);
    };
    fetchAllComments();
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

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-emoji">🧠</div>
          <div className="loading-text">جاري تحميل الاختبارات...</div>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-top-btn"
        >
          ↑
        </button>
      )}

      {/* Custom Hero Title & Description */}
      <section className="hero-section fade-in">
        {/* Animated background elements */}
        <div className="hero-background-element hero-background-element-1"></div>
        <div className="hero-background-element hero-background-element-2"></div>

        <h1 className="hero-title">
          <span role="img" aria-label="star">⭐</span> تبغى تعرف مستواك؟ جرّب اختباراتنا وعيش التحدي!
        </h1>
        <p className="hero-description">
          اختبارات ترفيهية باللهجة السعودية وبأسلوب ممتع!<br/>
          من اختبارات الذكاء إلى اللهجات، تقدر تشارك نتيجتك مع أصحابك وتضحكون عليها سوا 😄<br/>
          بسيطة، سريعة، ومجانية!
        </p>
        
        {/* Quick stats */}
        <div className="hero-stats">
          <div className="hero-stat-item">
            <div className="hero-stat-number">{quizzes.length}</div>
            <div className="hero-stat-label">اختبار</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-number">{blogPosts.length}</div>
            <div className="hero-stat-label">مقالة</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-number">100%</div>
            <div className="hero-stat-label">مجاني</div>
          </div>
        </div>

        {/* Random Quiz Button */}
        <div className="hero-random-button">
          <button
            onClick={() => {
              const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
              handleQuizClick(randomQuiz.id);
            }}
            className="random-quiz-btn"
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
            color: '#1A1A1A',
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
                    background: 'white',
                    borderRadius: '20px',
                    padding: '32px',
                    boxShadow: '0 8px 32px rgba(164,80,139,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid #f0f0f0',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(247,37,133,0.25)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(164,80,139,0.15)';
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
                      color: '#1A1A1A'
                    }}>
                      {quiz.title}
                    </h4>
                    <p style={{
                      color: '#666',
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
        <h2 className="all-quizzes-title">
          جميع الاختبارات
        </h2>

        {/* New Quizzes Section */}
        <div className="new-quizzes-section">
          <h3 className="new-quizzes-title">
            <span className="new-badge">
              جديد
            </span>
            الاختبارات الجديدة
          </h3>
          <div className="new-quizzes-grid">
            {quizzes
              .slice(0, 3)
              .map((quiz, index) => (
                <div
                  key={quiz.id}
                  onClick={() => handleQuizClick(quiz.id)}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 4px 20px rgba(0,212,170,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid #f0f0f0',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: `slideInFromBottom 0.6s ease-out ${index * 0.1}s both`
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,212,170,0.25)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,212,170,0.15)';
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
                      color: '#1A1A1A'
                    }}>
                      {quiz.title}
                    </h4>
                    <p style={{
                      color: '#666',
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
            color: '#1A1A1A',
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
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid #f0f0f0',
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
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
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
                  color: '#1A1A1A'
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
        />
        {filteredQuizzes.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: '#666'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ marginBottom: '10px', color: '#1A1A1A' }}>لم نجد اختبارات</h3>
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
              color: '#1A1A1A',
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
                      background: 'white',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(164,80,139,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '1px solid #f0f0f0',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: `slideInFromBottom 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(164,80,139,0.2)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(164,80,139,0.1)';
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
                        color: '#1A1A1A'
                      }}>
                        {quiz.title}
                      </h4>
                      <p style={{
                        color: '#666',
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
          color: '#1A1A1A',
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
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 2px 12px rgba(164,80,139,0.08)',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: '1px solid #f0f0f0'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(164,80,139,0.15)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(164,80,139,0.08)';
            }}
            >
              <div>
                <div style={{ color: '#F72585', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{post.category}</div>
                <a href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: '#1A1A1A' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 10, lineHeight: 1.4 }}>{post.title}</h3>
                </a>
                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: 10 }}>
                  {new Date(post.date).toLocaleDateString('ar-SA')} • {post.readTime}
                </div>
                <div style={{ color: '#666', fontSize: '1rem', marginBottom: 12 }}>{post.excerpt}</div>
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
        background: 'white', 
        padding: '80px 20px',
        marginTop: '60px',
        borderTop: '1px solid #f0f0f0'
      }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '60px', 
            color: '#1A1A1A',
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
              <h3 style={{ marginBottom: '15px', color: '#1A1A1A' }}>اختبارات متنوعة</h3>
              <p style={{ color: '#666' }}>لهجات، ذكاء، معلومات عامة، وتحليل شخصية</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📱</div>
              <h3 style={{ marginBottom: '15px', color: '#1A1A1A' }}>متجاوب بالكامل</h3>
              <p style={{ color: '#666' }}>يعمل بشكل مثالي على جميع الأجهزة</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚀</div>
              <h3 style={{ marginBottom: '15px', color: '#1A1A1A' }}>سريع وسهل</h3>
              <p style={{ color: '#666' }}>ابدأ الاختبار فوراً بدون تسجيل دخول</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📤</div>
              <h3 style={{ marginBottom: '15px', color: '#1A1A1A' }}>شارك النتائج</h3>
              <p style={{ color: '#666' }}>شارك نتائجك مع أصدقائك بسهولة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Quizzes Section */}
      <TopRatedQuizzes />
      <CommentsMarquee comments={allComments} />

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