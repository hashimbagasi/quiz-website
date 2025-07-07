import React, { useRef, useEffect, useState } from 'react';
import { Quiz } from '../data/quizzes';
import '../styles/QuizCard.css';

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
      <div className="difficulty-badge">
        {getDifficultyText(quiz.popularity)}
      </div>

      {/* Completion count badge */}
      <div className="completion-badge">
        🔥 {completionCount}
      </div>

      {/* Animated icon */}
      <div className="quiz-icon">
        {quiz.image}
      </div>

      {/* Title with gradient effect */}
      <h3 className="quiz-title">
        {quiz.title}
      </h3>

      {/* Description */}
      <p className="quiz-description">
        {quiz.description}
      </p>

      {/* Category with enhanced styling */}
      <div className="category-badge">
        {quiz.category}
      </div>

      {/* Action button */}
      <div className="action-button">
        <button
          className="btn btn-primary"
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
        >
          {isHovered ? '�� ابدأ الآن!' : 'ابدأ الاختبار'}
        </button>
      </div>

      {/* Hover overlay effect */}
      <div className="hover-overlay"></div>
    </div>
  );
};

export default QuizCard;