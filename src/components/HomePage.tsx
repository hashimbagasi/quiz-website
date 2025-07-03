import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz, getPopularQuizzes, getQuizzesByCategory } from '../data/quizzes';
import QuizCard from './QuizCard';
import SearchAndFilter from './SearchAndFilter';
import AdsensePlaceholder from './AdsensePlaceholder';
import { blogPosts, BlogPost } from '../data/blogPosts';

interface HomePageProps {
  quizzes: Quiz[];
}

const HomePage: React.FC<HomePageProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

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

  return (
    <div>
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
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '40px', 
          color: '#1A1A1A',
          fontSize: '2rem',
          fontWeight: '600'
        }}>
          جميع الاختبارات
        </h2>
        {/* Search and Filter Section (منقول هنا) */}
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
            <h3 style={{ marginBottom: '10px' }}>لم نجد اختبارات</h3>
            <p>جرب البحث بكلمات مختلفة أو اختر فئة أخرى</p>
          </div>
        ) : (
          <div className="quiz-grid">
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onClick={() => handleQuizClick(quiz.id)}
              />
            ))}
          </div>
        )}
      </section>

      <AdsensePlaceholder height={120} />

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
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 2px 12px rgba(164,80,139,0.08)',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
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
        marginTop: '60px'
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
    </div>
  );
};

export default HomePage; 