import React from 'react';
import { Quiz } from '../data/quizzes';

interface QuizCardProps {
  quiz: Quiz;
  onClick: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick }) => {
  return (
    <div className="quiz-card fade-in" onClick={onClick} style={{ cursor: 'pointer' }}>
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