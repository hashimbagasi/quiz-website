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
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            // إيقاف المراقبة بعد ظهور العنصر
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // 10% من العنصر يجب أن يكون ظاهر
        rootMargin: '0px 0px -60px 0px'
      }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const getDifficultyText = (popularity: number) => {
    if (popularity > 3000) return 'صعب';
    if (popularity > 2000) return 'متوسط';
    return 'سهل';
  };

  return (
    <div
      ref={cardRef}
      className={`quiz-card fade-in-card performance-optimized hover-lift${visible ? ' visible' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <div className="quiz-icon performance-animation">
        {quiz.image}
      </div>

      {/* Title with gradient effect */}
      <h3 className="quiz-title optimized-text">
        {quiz.title}
      </h3>

      {/* Description */}
      <p className="quiz-description optimized-text">
        {quiz.description}
      </p>

      {/* Category with enhanced styling */}
      <div className="category-badge">
        {quiz.category}
      </div>

      {/* Action button */}
      <div className="action-button">
        <button
          className="btn btn-primary optimized-button interactive-element"
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
        >
          {isHovered ? '🚀 ابدأ الآن!' : 'ابدأ الاختبار'}
        </button>
      </div>

      {/* Hover overlay effect */}
      <div className="hover-overlay"></div>
    </div>
  );
};

export default QuizCard;