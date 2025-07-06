import React, { useRef, useEffect, useState } from 'react';
import { Quiz } from '../data/quizzes';

interface QuizCardProps {
  quiz: Quiz;
  onClick: () => void;
  completionCount?: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick, completionCount = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          setVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDifficultyColor = (popularity: number) => {
    if (popularity > 3000) return '#FF6B6B'; // صعب
    if (popularity > 2000) return '#4ECDC4'; // متوسط
    return '#45B7D1'; // سهل
  };

  const getDifficultyText = (popularity: number) => {
    if (popularity > 3000) return 'صعب';
    if (popularity > 2000) return 'متوسط';
    return 'سهل';
  };

  return (
    <div
      ref={cardRef}
      className={`quiz-card fade-in-card${visible ? ' visible' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Difficulty badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        background: getDifficultyColor(quiz.popularity),
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 600,
        zIndex: 2
      }}>
        {getDifficultyText(quiz.popularity)}
      </div>

      {/* Completion count badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: 'rgba(0,0,0,0.1)',
        color: '#666',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 500,
        zIndex: 2
      }}>
        🔥 {completionCount}
      </div>

      {/* Animated icon */}
      <div style={{
        textAlign: 'center',
        marginBottom: '16px',
        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
        transition: 'all 0.3s ease'
      }}>
        <span className="quiz-icon" style={{ fontSize: '3.5rem' }}>{quiz.image}</span>
      </div>

      {/* Title with gradient effect */}
      <h3 className="quiz-title" style={{
        fontSize: '1.4rem',
        fontWeight: 700,
        marginBottom: '12px',
        background: isHovered ? 'linear-gradient(135deg, #F72585, #7209B7)' : 'none',
        backgroundClip: isHovered ? 'text' : 'unset',
        WebkitBackgroundClip: isHovered ? 'text' : 'unset',
        WebkitTextFillColor: isHovered ? 'transparent' : 'unset',
        transition: 'all 0.3s ease'
      }}>
        {quiz.title}
      </h3>

      {/* Description */}
      <p className="quiz-description" style={{
        color: '#666',
        marginBottom: '16px',
        lineHeight: 1.6,
        fontSize: '0.95rem'
      }}>
        {quiz.description}
      </p>

      {/* Category with enhanced styling */}
      <div style={{
        display: 'inline-block',
        padding: '6px 14px',
        background: isHovered ? 'linear-gradient(135deg, #F72585, #7209B7)' : '#F0F0F0',
        color: isHovered ? 'white' : '#666',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 600,
        marginBottom: '20px',
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? '0 4px 12px rgba(247,37,133,0.3)' : 'none'
      }}>
        {quiz.category}
      </div>

      {/* Action button */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 'auto'
      }}>
        <button
          className="btn btn-primary"
          style={{ 
            fontSize: '1rem', 
            padding: '12px 32px',
            borderRadius: '24px',
            background: isHovered ? 'linear-gradient(135deg, #7209B7, #F72585)' : 'linear-gradient(135deg, #F72585, #7209B7)',
            border: 'none',
            color: 'white',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            boxShadow: isHovered ? '0 8px 25px rgba(247,37,133,0.4)' : '0 4px 15px rgba(247,37,133,0.2)'
          }}
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
        >
          {isHovered ? '🚀 ابدأ الآن!' : 'ابدأ الاختبار'}
        </button>
      </div>

      {/* Hover overlay effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isHovered ? 'linear-gradient(135deg, rgba(247,37,133,0.05), rgba(114,9,183,0.05))' : 'transparent',
        transition: 'all 0.3s ease',
        pointerEvents: 'none'
      }}></div>
    </div>
  );
};

export default QuizCard;

<style>{`
  .fade-in-card {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s, transform 0.7s;
  }
  .fade-in-card.visible {
    opacity: 1;
    transform: none;
  }
  
  .quiz-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .quiz-card:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 40px rgba(247,37,133,0.15);
  }
`}</style> 