import React, { useRef, useEffect, useState } from 'react';
import { Quiz } from '../data/quizzes';

interface QuizCardProps {
  quiz: Quiz;
  onClick: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <div
      ref={cardRef}
      className={`quiz-card fade-in-card${visible ? ' visible' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <span className="quiz-icon">{quiz.image}</span>
      <h3 className="quiz-title">{quiz.title}</h3>
      <p className="quiz-description">{quiz.description}</p>
      <span className="quiz-category">{quiz.category}</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="quiz-popularity">🔥 {quiz.popularity.toLocaleString()} تجربة</span>
        <button
          className="btn btn-primary"
          style={{ fontSize: '0.9rem', padding: '8px 20px' }}
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
        >
          ابدأ
        </button>
      </div>
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
`}</style> 