import React, { useState, useEffect } from 'react';
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
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    }, 1000);
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
        <div className="quiz-header">
          <h1 style={{ marginBottom: '10px', color: '#1A1A1A' }}>{quiz.title}</h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>{quiz.description}</p>
          
          <div className="quiz-progress">
            <div 
              className="quiz-progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            السؤال {currentQuestionIndex + 1} من {quiz.questions.length}
          </p>
        </div>

        <div className="question-container slide-in">
          <h2 className="question-text">{currentQuestion.text}</h2>
          
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedAnswers[currentQuestionIndex] === index ? 'selected' : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswers[currentQuestionIndex] !== undefined}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 