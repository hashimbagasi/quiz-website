import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Quiz, getSimilarQuizzes, getHejaziResultMessage, getNajdiResultMessage } from '../data/quizzes';
import QuizCard from './QuizCard';
import AdsensePlaceholder from './AdsensePlaceholder';

interface QuizPageProps {
  quizzes: Quiz[];
}

const QuizPage: React.FC<QuizPageProps> = ({ quizzes }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [similarQuizzes, setSimilarQuizzes] = useState<Quiz[]>([]);
  const [userName, setUserName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [nameError, setNameError] = useState('');
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  // عند تحميل الصفحة، جلب الاسم من localStorage إذا كان موجود
  React.useEffect(() => {
    const savedName = localStorage.getItem('quizUserName') || '';
    if (savedName) {
      setUserName(savedName);
      setNameSubmitted(true);
    }
  }, []);

  useEffect(() => {
    const foundQuiz = quizzes.find(q => q.id === id);
    if (foundQuiz && id) {
      setQuiz(foundQuiz);
      setSimilarQuizzes(getSimilarQuizzes(id));
    }
  }, [id, quizzes]);

  useEffect(() => {
    // أنيميشن ظهور السؤال عند تغييره
    if (questionRef.current) {
      questionRef.current.classList.remove('fade-in-question');
      void questionRef.current.offsetWidth; // إعادة تشغيل الأنيميشن
      questionRef.current.classList.add('fade-in-question');
    }
  }, [currentQuestionIndex]);

  if (!quiz) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // اسم المستخدم قبل بدء الاختبار (إذا لم يكن محفوظًا)
  if (!nameSubmitted) {
    return (
      <div className="container">
        <div className="quiz-container" style={{ maxWidth: 400, margin: '80px auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 30, color: '#1A1A1A' }}>قبل ما تبدأ الاختبار</h2>
          <p style={{ marginBottom: 20, color: '#666' }}>اكتب اسمك عشان نعرض نتيجتك باسمك بعد نهاية الاختبار</p>
          <input
            type="text"
            className="search-input"
            placeholder="اكتب اسمك هنا..."
            value={userName}
            onChange={e => setUserName(e.target.value)}
            style={{ marginBottom: 10 }}
            maxLength={20}
          />
          <br />
          {nameError && <div style={{ color: 'red', marginBottom: 10 }}>{nameError}</div>}
          <button
            className="btn btn-primary"
            onClick={() => {
              if (userName.trim().length < 2) {
                setNameError('الرجاء كتابة اسم صحيح (على الأقل حرفين)');
              } else {
                setNameSubmitted(true);
                setNameError('');
                localStorage.setItem('quizUserName', userName.trim());
              }
            }}
            style={{ width: '100%', marginTop: 10 }}
          >
            ابدأ الاختبار
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedOption !== null) return; // منع اختيار أكثر من خيار
    setSelectedOption(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setAnswerStatus(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => {
      setAnswerStatus(null);
      setSelectedOption(null);
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    }, 1100);
  };

  const calculateResults = () => {
    if (quiz.category === 'تحليل شخصية') {
      const personalityTypes = selectedAnswers.map((answer, index) => quiz.questions[index].personalityType);
      const mostCommon = personalityTypes.reduce((acc, type) => {
        acc[type!] = (acc[type!] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const dominantType = Object.keys(mostCommon).reduce((a, b) => mostCommon[a] > mostCommon[b] ? a : b);
      return {
        type: 'personality',
        personalityType: dominantType,
        score: 0,
        totalQuestions: quiz.questions.length
      };
    } else {
      let correctAnswers = 0;
      selectedAnswers.forEach((answer, index) => {
        if (answer === quiz.questions[index].correctAnswer) {
          correctAnswers++;
        }
      });
      return {
        type: 'score',
        score: correctAnswers,
        totalQuestions: quiz.questions.length
      };
    }
  };

  const getResultMessage = (results: any) => {
    if (results.type === 'personality') {
      const messages = {
        extrovert: 'أنت شخصية اجتماعية ومتفائلة! تحب التواصل مع الآخرين وتستمتع بالحفلات والأنشطة الجماعية.',
        analytical: 'أنت شخصية تحليلية وعقلانية! تحب التفكير العميق وتحليل الأمور قبل اتخاذ القرارات.',
        'team-player': 'أنت شخصية تعاونية! تحب العمل في فريق وتساعد الآخرين على النجاح.',
        intellectual: 'أنت شخصية فكرية! تحب التعلم والقراءة واكتشاف أشياء جديدة.',
        logical: 'أنت شخصية منطقية! تعتمد على العقل والمنطق في اتخاذ قراراتك.'
      };
      return messages[results.personalityType as keyof typeof messages] || 'شخصية فريدة ومميزة!';
    } else {
      const percentage = (results.score / results.totalQuestions) * 100;
      if (percentage >= 80) return 'ممتاز! لديك معرفة واسعة في هذا المجال.';
      if (percentage >= 60) return 'جيد جداً! معرفتك جيدة ولكن يمكن تحسينها.';
      if (percentage >= 40) return 'جيد! حاول التعلم أكثر في هذا المجال.';
      return 'حاول مرة أخرى! التعلم المستمر هو المفتاح.';
    }
  };

  const shareResult = () => {
    const results = calculateResults();
    const message = results.type === 'personality' 
      ? `اكتشفت أن شخصيتي ${results.personalityType} في اختبار ${quiz.title}!`
      : `حصلت على ${results.score}/${results.totalQuestions} في اختبار ${quiz.title}!`;
    const shareText = `${userName ? `(${userName}) ` : ''}${message} جرب الاختبار هنا: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: quiz.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('تم نسخ النتيجة إلى الحافظة!');
    }
  };

  if (showResults) {
    let results = calculateResults();
    let resultMessage = getResultMessage(results);
    let customResult = null;
    if (quiz.id === 'hejazi-dialect-quiz') {
      customResult = getHejaziResultMessage(results.score);
    } else if (quiz.id === 'najdi-dialect-quiz') {
      customResult = getNajdiResultMessage(results.score);
    }

    // استخراج الأسئلة التي أخطأ فيها المستخدم
    const wrongAnswers = quiz.questions
      .map((q, idx) => ({
        question: q.text,
        userAnswer: selectedAnswers[idx],
        correctAnswer: q.correctAnswer,
        options: q.options
      }))
      .filter((q, idx) =>
        typeof q.correctAnswer === 'number' &&
        selectedAnswers[idx] !== undefined &&
        selectedAnswers[idx] !== q.correctAnswer
      );

    return (
      <div className="container">
        <div className="quiz-container">
          <AdsensePlaceholder height={90} />
          <div className="results-container">
            <h2 style={{ marginBottom: '20px', color: '#1A1A1A' }}>نتيجة اختبار {quiz.title}</h2>
            {userName && (
              <div style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: 10, color: '#F72585' }}>
                يا {userName}،
              </div>
            )}
            {customResult ? (
              <>
                <div className="score-display" style={{ fontSize: '2.5rem' }}>
                  {customResult.emoji} {customResult.title}
                </div>
                <p className="result-message">{customResult.message}</p>
              </>
            ) : (
              <>
                {results.type === 'score' ? (
                  <div className="score-display">
                    {results.score}/{results.totalQuestions}
                  </div>
                ) : (
                  <div className="score-display">
                    {results.personalityType}
                  </div>
                )}
                <p className="result-message">{resultMessage}</p>
              </>
            )}
            {/* عرض الأسئلة التي أخطأ فيها المستخدم */}
            {wrongAnswers.length > 0 && (
              <div style={{ marginTop: 40, textAlign: 'right' }}>
                <h3 style={{ color: '#F72585', marginBottom: 20 }}>الأسئلة التي أخطأت فيها وإجاباتها الصحيحة:</h3>
                <ul style={{ paddingRight: 0, listStyle: 'none' }}>
                  {wrongAnswers.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 24, background: '#FFF5F8', borderRadius: 10, padding: 16, border: '1px solid #F7258533' }}>
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>{item.question}</div>
                      <div style={{ color: '#F44336', marginBottom: 4 }}>
                        إجابتك: {typeof item.userAnswer === 'number' ? item.options[item.userAnswer] : 'لم تجب'}
                      </div>
                      <div style={{ color: '#4CAF50' }}>
                        الإجابة الصحيحة: {typeof item.correctAnswer === 'number' ? item.options[item.correctAnswer] : ''}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="share-section">
              <h3 style={{ marginBottom: '15px' }}>شارك نتيجتك</h3>
              <button className="btn share-btn" onClick={shareResult}>
                📱 مشاركة النتيجة
              </button>
            </div>
            <div style={{ marginTop: '30px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => navigate('/')}
                style={{ marginRight: '10px' }}
              >
                العودة للرئيسية
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers([]);
                  setShowResults(false);
                  setNameSubmitted(false);
                }}
              >
                إعادة الاختبار
              </button>
            </div>
          </div>
          <AdsensePlaceholder height={90} />
          {similarQuizzes.length > 0 && (
            <div className="similar-quizzes">
              <h3>اختبارات مشابهة</h3>
              <div className="quiz-grid">
                {similarQuizzes.map((similarQuiz) => (
                  <QuizCard
                    key={similarQuiz.id}
                    quiz={similarQuiz}
                    onClick={() => navigate(`/quiz/${similarQuiz.id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="quiz-container">
        <AdsensePlaceholder height={90} />
        <div ref={questionRef} className="fade-in-question" style={{ marginBottom: 40 }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F72585', marginBottom: 16 }}>
            سؤال {currentQuestionIndex + 1} من {quiz.questions.length}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 24, color: '#1A1A1A' }}>
            {currentQuestion.text}
          </div>
          <div className="options-list">
            {currentQuestion.options.map((option, idx) => {
              let optionClass = 'option-btn';
              if (selectedOption !== null) {
                if (idx === selectedOption) {
                  optionClass += answerStatus === 'correct' ? ' correct' : ' wrong';
                }
                if (idx === currentQuestion.correctAnswer && answerStatus === 'wrong') {
                  optionClass += ' correct';
                }
              }
              return (
                <button
                  key={idx}
                  className={optionClass}
                  onClick={() => handleAnswerSelect(idx)}
                  disabled={selectedOption !== null}
                  style={{
                    margin: '12px 0',
                    width: '100%',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    borderRadius: 16,
                    padding: '16px 12px',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(164,80,139,0.08)',
                    background: '#fff',
                    color: '#1A1A1A',
                    cursor: selectedOption === null ? 'pointer' : 'default',
                    position: 'relative',
                    transition: 'background 0.2s, color 0.2s, transform 0.2s',
                    outline: 'none',
                    ...(selectedOption !== null && idx === selectedOption && answerStatus === 'wrong' ? { animation: 'shake 0.4s' } : {})
                  }}
                >
                  {option}
                  {selectedOption !== null && idx === selectedOption && answerStatus === 'correct' && (
                    <span style={{ marginRight: 10, color: '#43a047', fontSize: '1.3em' }}>✔️</span>
                  )}
                  {selectedOption !== null && idx === selectedOption && answerStatus === 'wrong' && (
                    <span style={{ marginRight: 10, color: '#e53935', fontSize: '1.3em' }}>❌</span>
                  )}
                  {selectedOption !== null && idx === currentQuestion.correctAnswer && answerStatus === 'wrong' && (
                    <span style={{ marginRight: 10, color: '#43a047', fontSize: '1.3em' }}>✔️</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <style>{`
          .fade-in-question {
            opacity: 0;
            transform: translateY(40px);
            animation: fadeInUpQ 0.7s forwards;
          }
          @keyframes fadeInUpQ {
            to {
              opacity: 1;
              transform: none;
            }
          }
          .option-btn.correct {
            background: linear-gradient(90deg, #a8e063 0%, #56ab2f 100%) !important;
            color: #fff !important;
            font-weight: 700;
          }
          .option-btn.wrong {
            background: linear-gradient(90deg, #f85032 0%, #e73827 100%) !important;
            color: #fff !important;
            font-weight: 700;
          }
          @keyframes shake {
            10%, 90% { transform: translateX(-2px); }
            20%, 80% { transform: translateX(4px); }
            30%, 50%, 70% { transform: translateX(-8px); }
            40%, 60% { transform: translateX(8px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default QuizPage; 