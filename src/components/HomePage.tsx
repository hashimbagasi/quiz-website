import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz, getPopularQuizzes, getQuizzesByCategory } from '../data/quizzes';
import QuizCard from './QuizCard';
import SearchAndFilter from './SearchAndFilter';
import AdsensePlaceholder from './AdsensePlaceholder';

interface HomePageProps {
  quizzes: Quiz[];
}

const HomePage: React.FC<HomePageProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const popularQuizzes = useMemo(() => getPopularQuizzes(), []);

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
          background: 'linear-gradient(90deg, #f72585 0%, #7209b7 100%)',
          color: 'white',
          padding: '48px 16px 32px 16px',
          textAlign: 'center',
          borderRadius: '0 0 32px 32px',
          marginBottom: '32px',
          boxShadow: '0 4px 24px rgba(114,9,183,0.08)'
        }}
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
          جاهز تتحدى نفسك؟ جرب اختباراتنا وخلك الأسطورة!
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

      {/* Popular Quizzes Section */}
      <section className="container" style={{ marginTop: '60px' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '40px', 
          color: '#1A1A1A',
          fontSize: '2rem',
          fontWeight: '600'
        }}>
          🔥 أشهر الاختبارات
        </h2>
        <div className="quiz-grid">
          {popularQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onClick={() => handleQuizClick(quiz.id)}
            />
          ))}
        </div>
      </section>

      <AdsensePlaceholder height={120} />

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