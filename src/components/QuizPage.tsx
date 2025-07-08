import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Quiz, getSimilarQuizzes, getHejaziResultMessage, getNajdiResultMessage, getQahtaniResultMessage, getSouthernResultMessage, getQassimiResultMessage } from '../data/quizzes';
import QuizCard from './QuizCard';
import CommentsSection from './CommentsSection';
import { CommentService } from '../services/commentService';
import '../styles/QuizPage.css';

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

  // تسجيل إكمال الاختبار عند ظهور النتائج
  useEffect(() => {
    if (showResults && quiz) {
      CommentService.recordQuizCompletion(quiz.id);
    }
  }, [showResults, quiz]);

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
        <div className="quiz-container quiz-name-container">
          <h2 className="quiz-name-title">قبل ما تبدأ الاختبار</h2>
          <p className="quiz-name-description">اكتب اسمك عشان نعرض نتيجتك باسمك بعد نهاية الاختبار</p>
          <input
            type="text"
            className="search-input quiz-name-input"
            placeholder="اكتب اسمك هنا..."
            value={userName}
            onChange={e => setUserName(e.target.value)}
            maxLength={20}
          />
          <br />
          {nameError && <div className="quiz-name-error">{nameError}</div>}
          <button
            className="btn btn-primary quiz-name-button"
            onClick={() => {
              if (userName.trim().length < 2) {
                setNameError('الرجاء كتابة اسم صحيح (على الأقل حرفين)');
              } else {
                setNameSubmitted(true);
                setNameError('');
                localStorage.setItem('quizUserName', userName.trim());
              }
            }}
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
    
    // حفظ الإجابة في المصفوفة
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    
    // في اختبارات تحليل الشخصية، لا توجد إجابات خاطئة
    if (quiz.category === 'تحليل شخصية') {
      // لا تضع أي status، فقط أنيميشن اختيار عادي
    } else {
      const isCorrect = answerIndex === currentQuestion.correctAnswer;
      setAnswerStatus(isCorrect ? 'correct' : 'wrong');
    }
    
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
      if (quiz.id === 'personality-quiz-1') {
        // نظام MBTI الجديد: حساب النقاط لكل بعد من أبعاد MBTI
        let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;
        
        selectedAnswers.forEach((answer, index) => {
          const question = quiz.questions[index];
          
          if (question && question.personalityMap && typeof answer === 'number') {
            const selectedTrait = question.personalityMap[answer];
            
            if (selectedTrait) {
              switch (selectedTrait) {
                case 'E': E++; break;
                case 'I': I++; break;
                case 'S': S++; break;
                case 'N': N++; break;
                case 'T': T++; break;
                case 'F': F++; break;
                case 'J': J++; break;
                case 'P': P++; break;
              }
            }
          }
        });
        
        // تحديد النوع بناءً على الأبعاد الأربعة
        const firstDimension = E > I ? 'E' : 'I';
        const secondDimension = S > N ? 'S' : 'N';
        const thirdDimension = T > F ? 'T' : 'F';
        const fourthDimension = J > P ? 'J' : 'P';
        
        const personalityType = firstDimension + secondDimension + thirdDimension + fourthDimension;
        
        return {
          type: 'personality',
          personalityType: personalityType,
          score: 0,
          totalQuestions: quiz.questions.length,
          mbtiScores: { E, I, S, N, T, F, J, P }
        };
      } else {
        // النظام القديم للاختبارات الأخرى
        const personalityScores: Record<string, number> = {};
        quiz.questions.forEach((q, idx) => {
          const answerIdx = selectedAnswers[idx];
          if (typeof answerIdx === 'number' && q.personalityMap) {
            const type = q.personalityMap[answerIdx];
            if (type) {
              personalityScores[type] = (personalityScores[type] || 0) + 1;
            }
          }
        });
        
        const personalityTypes = Object.keys(personalityScores);
        if (personalityTypes.length === 0) {
          return {
            type: 'personality',
            personalityType: 'extrovert',
            score: 0,
            totalQuestions: quiz.questions.length
          };
        }
        const dominantType = personalityTypes.reduce((a, b) => personalityScores[a] > personalityScores[b] ? a : b);
      return {
        type: 'personality',
        personalityType: dominantType,
        score: 0,
        totalQuestions: quiz.questions.length
      };
      }
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
    // نتيجة مخصصة لاختبار القحطانية
    if (quiz && quiz.id === 'qahtani-dialect-quiz' && results.type === 'score') {
      return getQahtaniResultMessage(results.score);
    }
    // نتيجة مخصصة لاختبار اللهجة الجنوبية
    if (quiz && quiz.id === 'southern-dialect-quiz' && results.type === 'score') {
      return getSouthernResultMessage(results.score);
    }
    if (results.type === 'personality') {
      // تحليل الـ 16 نوع شخصية MBTI
      const mbtiAnalysis: Record<string, any> = {
        'ISTJ': {
          title: 'المفتش - المنظم المنهجي 🏛️',
          description: 'شخصية عملية ومنظمة، تثق بالحقائق والتجربة. تحب النظام والترتيب، وتلتزم بالمسؤوليات.',
          strengths: ['منظم ومنهجي', 'موثوق ومسؤول', 'عملي وواقعي', 'مخلص ومخلص', 'دقيق في التفاصيل'],
          weaknesses: ['عنيد ومقاوم للتغيير', 'قد يكون صارماً جداً', 'لا يعبر عن مشاعره بسهولة'],
          advice: ['حاول أن تكون أكثر مرونة مع التغييرات', 'اعمل على التعبير عن مشاعرك أكثر', 'تعلم الاستماع لآراء الآخرين'],
          careers: 'محاسب، مدير مشاريع، محقق، مهندس، مدير إداري'
        },
        'ISFJ': {
          title: 'المدافع - الحامي المخلص 🛡️',
          description: 'شخصية دافئة ومخلصة، تهتم بالآخرين وتعمل بجد لحمايتهم. تحب الاستقرار والتناسق.',
          strengths: ['مخلص ومتفاني', 'مهتم بالآخرين', 'عملي وموثوق', 'صبر وتحمل', 'منظم ومرتب'],
          weaknesses: ['متواضع جداً', 'يخشى التغيير', 'قد يهمل احتياجاته'],
          advice: ['تعلم أن تقول "لا" أحياناً', 'اهتم بنفسك كما تهتم بالآخرين', 'كن أكثر ثقة بنفسك'],
          careers: 'ممرض، معلم، مدير موارد بشرية، مصمم داخلي، كاتب'
        },
        'INFJ': {
          title: 'المستشار - المثالي المبدع 🌟',
          description: 'شخصية مثالية ومبدعة، تبحث عن المعنى العميق في الحياة. تحب مساعدة الآخرين على النمو.',
          strengths: ['مبدع ومثالي', 'مهتم بالآخرين', 'صاحب رؤية', 'مخلص ومخلص', 'ذكي عاطفياً'],
          weaknesses: ['حساس جداً', 'مثالي جداً', 'قد يكون منعزلاً'],
          advice: ['تعلم أن تكون أكثر واقعية', 'اعمل على تطوير مهاراتك الاجتماعية', 'لا تبالغ في المثالية'],
          careers: 'كاتب، معالج نفسي، مدرس، مصمم، مدير إبداعي'
        },
        'INTJ': {
          title: 'المهندس المعماري - الاستراتيجي المبدع 🏗️',
          description: 'شخصية استراتيجية ومبدعة، تخطط للمستقبل وتحب حل المشكلات المعقدة. تبحث عن الكمال.',
          strengths: ['استراتيجي ومبدع', 'مستقل ومصمم', 'محلل ومفكر', 'طموح وموجه للأهداف', 'ذكي جداً'],
          weaknesses: ['قد يكون متعجرفاً', 'غير صبور مع الآخرين', 'قد يبدو بارداً'],
          advice: ['تعلم أن تكون أكثر صبراً مع الآخرين', 'اعمل على تطوير مهاراتك الاجتماعية', 'كن أكثر تعاطفاً'],
          careers: 'مهندس، عالم، مدير استراتيجي، محلل أعمال، مطور برمجيات'
        },
        'ISTP': {
          title: 'الحرفي - المحلل العملي 🔧',
          description: 'شخصية مرنة وعملية، تحب حل المشكلات الملموسة. تستمتع بالعمل اليدوي والتجربة.',
          strengths: ['مرن وعملي', 'يحل المشكلات بسرعة', 'هادئ ومتزن', 'مستقل', 'ماهر يدوياً'],
          weaknesses: ['قد يكون منعزلاً', 'غير صبور مع القواعد', 'قد يبدو غير مبال'],
          advice: ['تعلم أن تكون أكثر التزاماً بالخطط', 'اعمل على تطوير مهاراتك الاجتماعية', 'كن أكثر تنظيماً'],
          careers: 'ميكانيكي، تقني، محقق، طيار، مهندس'
        },
        'ISFP': {
          title: 'المغامر - الفنان الحر 🎨',
          description: 'شخصية فنية وحساسة، تحب الجمال والحرية. تستمتع باللحظة الحالية وتقدر الاستقلالية.',
          strengths: ['فني ومبدع', 'مرن ومتأقلم', 'مهتم بالآخرين', 'مخلص', 'حساس للجمال'],
          weaknesses: ['قد يكون منعزلاً', 'غير منظم', 'قد يهمل المسؤوليات'],
          advice: ['تعلم أن تكون أكثر تنظيماً', 'اعمل على تطوير مهاراتك القيادية', 'كن أكثر التزاماً'],
          careers: 'مصمم، فنان، مصور، معالج طبيعي، مدرس فنون'
        },
        'INFP': {
          title: 'الوسيط - المثالي المبدع 🌈',
          description: 'شخصية مثالية ومبدعة، تبحث عن المعنى والانسجام. تحب مساعدة الآخرين وتحقيق أحلامها.',
          strengths: ['مبدع ومثالي', 'مهتم بالآخرين', 'مخلص لمبادئه', 'مرن ومتأقلم', 'ذكي عاطفياً'],
          weaknesses: ['حساس جداً', 'غير عملي', 'قد يكون منعزلاً'],
          advice: ['تعلم أن تكون أكثر واقعية', 'اعمل على تطوير مهاراتك العملية', 'كن أكثر تنظيماً'],
          careers: 'كاتب، معالج نفسي، مدرس، مصمم، مدير إبداعي'
        },
        'INTP': {
          title: 'المنطقي - المحلل المبدع 🧮',
          description: 'شخصية تحليلية ومبدعة، تحب فهم النظريات المعقدة. تستمتع بالتفكير العميق والمنطق.',
          strengths: ['محلل ومبدع', 'مستقل ومصمم', 'منطقي وعقلاني', 'مخلص للحقيقة', 'ذكي جداً'],
          weaknesses: ['قد يكون منعزلاً', 'غير عملي', 'قد يبدو غير مبال'],
          advice: ['تعلم أن تكون أكثر عملياً', 'اعمل على تطوير مهاراتك الاجتماعية', 'كن أكثر تنظيماً'],
          careers: 'عالم، مهندس، مطور برمجيات، محلل بيانات، باحث'
        },
        'ESTP': {
          title: 'المقاول - المقاول العملي 💼',
          description: 'شخصية عملية ومرنة، تحب العمل والحركة. تستمتع بحل المشكلات الملموسة والتجربة.',
          strengths: ['عملي ومرن', 'يحل المشكلات بسرعة', 'اجتماعي ومحبوب', 'شجاع', 'ماهر يدوياً'],
          weaknesses: ['غير صبور', 'قد يكون متهوراً', 'غير منظم'],
          advice: ['تعلم أن تكون أكثر صبراً', 'اعمل على تطوير مهاراتك التخطيطية', 'كن أكثر تنظيماً'],
          careers: 'رجل أعمال، مدير مبيعات، محقق، مدرب رياضي، مقاول'
        },
        'ESFP': {
          title: 'الممثل - الممثل الاجتماعي 🎭',
          description: 'شخصية اجتماعية وممتعة، تحب الحياة والمرح. تستمتع بمساعدة الآخرين وإسعادهم.',
          strengths: ['اجتماعي ومحبوب', 'مرن ومتأقلم', 'مهتم بالآخرين', 'ممتعة', 'مبدع'],
          weaknesses: ['غير منظم', 'قد يكون سطحياً', 'غير صبور'],
          advice: ['تعلم أن تكون أكثر تنظيماً', 'اعمل على تطوير مهاراتك التخطيطية', 'كن أكثر جدية'],
          careers: 'ممثل، مدرب، مدير مبيعات، معلم، منظم فعاليات'
        },
        'ENFP': {
          title: 'المحفز - المبدع الاجتماعي ✨',
          description: 'شخصية مبدعة ومتحمسة، تحب الأفكار الجديدة والناس. تستمتع بمساعدة الآخرين على النمو.',
          strengths: ['مبدع ومتحمس', 'اجتماعي ومحبوب', 'مرن ومتأقلم', 'مهتم بالآخرين', 'صاحب رؤية'],
          weaknesses: ['غير منظم', 'قد يكون متقلب المزاج', 'غير عملي'],
          advice: ['تعلم أن تكون أكثر تنظيماً', 'اعمل على تطوير مهاراتك العملية', 'كن أكثر ثباتاً'],
          careers: 'كاتب، مدير إبداعي، معلم، مدرب، صحفي'
        },
        'ENTP': {
          title: 'المجادل - المبدع الاستراتيجي 🎯',
          description: 'شخصية مبدعة واستراتيجية، تحب التحديات والأفكار الجديدة. تستمتع بالمناقشات والجدل.',
          strengths: ['مبدع واستراتيجي', 'اجتماعي ومحبوب', 'مرن ومتأقلم', 'محلل', 'ذكي جداً'],
          weaknesses: ['غير منظم', 'قد يكون متحدياً', 'غير صبور'],
          advice: ['تعلم أن تكون أكثر تنظيماً', 'اعمل على تطوير مهاراتك العملية', 'كن أكثر صبراً'],
          careers: 'رجل أعمال، محامي، مدير إبداعي، صحفي، مطور برمجيات'
        },
        'ESTJ': {
          title: 'المدير - المنظم القيادي 👔',
          description: 'شخصية منظمة وقوية، تحب النظام والكفاءة. تستمتع بقيادة الآخرين وتحقيق الأهداف.',
          strengths: ['منظم وقوي', 'موثوق ومسؤول', 'عملي وواقعي', 'قائد طبيعي', 'دقيق في التفاصيل'],
          weaknesses: ['قد يكون صارماً', 'غير مرن', 'قد يبدو متعجرفاً'],
          advice: ['تعلم أن تكون أكثر مرونة', 'اعمل على تطوير مهاراتك العاطفية', 'كن أكثر تعاطفاً'],
          careers: 'مدير، محاسب، ضابط شرطة، مهندس، مدير مشاريع'
        },
        'ESFJ': {
          title: 'القنصل - الحامي الاجتماعي 🤝',
          description: 'شخصية اجتماعية ومخلصة، تحب مساعدة الآخرين والحفاظ على الانسجام. تستمتع بالعمل الجماعي.',
          strengths: ['اجتماعي ومخلص', 'مهتم بالآخرين', 'منظم وموثوق', 'قائد طبيعي', 'ذكي عاطفياً'],
          weaknesses: ['قد يكون متطلباً', 'غير مرن', 'قد يهمل احتياجاته'],
          advice: ['تعلم أن تكون أكثر مرونة', 'اهتم بنفسك كما تهتم بالآخرين', 'كن أكثر تساهلاً'],
          careers: 'مدير موارد بشرية، ممرض، معلم، مدير مبيعات، منظم فعاليات'
        },
        'ENFJ': {
          title: 'البطل - القائد المثالي 🦸',
          description: 'شخصية مثالية وقوية، تحب مساعدة الآخرين على النمو. تستمتع بقيادة الفرق وتحقيق الأهداف.',
          strengths: ['قائد طبيعي', 'مهتم بالآخرين', 'مثالي ومبدع', 'اجتماعي ومحبوب', 'صاحب رؤية'],
          weaknesses: ['قد يكون متطلباً', 'حساس جداً', 'قد يهمل احتياجاته'],
          advice: ['تعلم أن تكون أكثر واقعية', 'اهتم بنفسك كما تهتم بالآخرين', 'كن أكثر تساهلاً'],
          careers: 'مدير، معلم، مدرب، مدير موارد بشرية، صحفي'
        },
        'ENTJ': {
          title: 'القائد - الاستراتيجي القوي 👑',
          description: 'شخصية قوية واستراتيجية، تحب القيادة والتخطيط. تستمتع بحل المشكلات المعقدة وتحقيق الأهداف.',
          strengths: ['قائد طبيعي', 'استراتيجي ومبدع', 'محلل ومفكر', 'طموح وموجه للأهداف', 'ذكي جداً'],
          weaknesses: ['قد يكون متعجرفاً', 'غير صبور', 'قد يبدو بارداً'],
          advice: ['تعلم أن تكون أكثر صبراً', 'اعمل على تطوير مهاراتك العاطفية', 'كن أكثر تعاطفاً'],
          careers: 'مدير تنفيذي، محامي، مهندس، مدير استراتيجي، رجل أعمال'
        }
      };

      // للاختبارات الأخرى - الحفاظ على النظام القديم
      const oldAnalysis: Record<string, any> = {
        extrovert: {
          title: 'الشخصية الاجتماعية 🌟',
          description: 'أنت شخصية اجتماعية ومتفائلة بطبيعتك!',
          strengths: [
            'تحب التواصل مع الناس وتكوين صداقات جديدة',
            'تملك طاقة إيجابية وتشجع الآخرين',
            'تستمتع بالأجواء الجماعية والحفلات',
            'تتحدث بطلاقة وتشارك أفكارك بسهولة',
            'تحب المغامرات وتجربة أشياء جديدة'
          ],
          weaknesses: [
            'قد تحتاج وقت للراحة من الناس',
            'أحياناً تتحدث قبل التفكير',
            'قد تنسى التفاصيل المهمة'
          ],
          advice: [
            'استغل طاقتك الاجتماعية في العمل الجماعي',
            'تعلم الاستماع أكثر للآخرين',
            'خذ وقت للراحة والتفكير بمفردك'
          ],
          careers: 'مناسبة لك: المبيعات، التدريس، الإعلام، العلاقات العامة، السياحة'
        },
        analytical: {
          title: 'الشخصية التحليلية 🧠',
          description: 'أنت شخصية منطقية وتحب التحليل والتفكير العميق!',
          strengths: [
            'تحب تحليل الأمور والتركيز على التفاصيل',
            'تتخذ قرارات منطقية وعقلانية',
            'تحب حل المشكلات المعقدة',
            'تخطط جيداً قبل التصرف',
            'تثق في الحقائق والبيانات'
          ],
          weaknesses: [
            'قد تبالغ في التحليل والتخطيط',
            'أحياناً تهمل المشاعر في القرارات',
            'قد تبدو باردة أو منعزلة'
          ],
          advice: [
            'استغل قدراتك التحليلية في حل المشكلات',
            'تعلم الاستماع لمشاعرك أحياناً',
            'حاول التواصل أكثر مع الناس'
          ],
          careers: 'مناسبة لك: الهندسة، البرمجة، المحاسبة، البحث العلمي، القانون'
        },
        emotional: {
          title: 'الشخصية العاطفية 💝',
          description: 'أنت شخصية حساسة وتهتم بمشاعر الآخرين!',
          strengths: [
            'تتفهم مشاعر الآخرين بسهولة',
            'تحب مساعدة الناس ودعمهم',
            'تكون صديق مخلص وموثوق',
            'تحس بالآخرين وتتعاطف معهم',
            'تحب السلام والانسجام'
          ],
          weaknesses: [
            'قد تتأثر كثيراً بمشاعر الآخرين',
            'أحياناً تضع احتياجاتك في المرتبة الثانية',
            'قد تجد صعوبة في قول "لا"'
          ],
          advice: [
            'استغل حساسيتك في العمل مع الناس',
            'تعلم وضع حدود صحية',
            'لا تنسى احتياجاتك الشخصية'
          ],
          careers: 'مناسبة لك: التمريض، العمل الاجتماعي، الاستشارة النفسية، التدريس، الفنون'
        },
        leader: {
          title: 'الشخصية القيادية 👑',
          description: 'أنت شخصية قيادية بالفطرة وتحب تحمل المسؤولية!',
          strengths: [
            'تحب توجيه الآخرين وتحمل المسؤولية',
            'تتخذ قرارات سريعة وحازمة',
            'تحب تحقيق الإنجازات والأهداف',
            'تتحمل الضغط والتحديات',
            'تحفز الآخرين على العمل'
          ],
          weaknesses: [
            'قد تكون متسلطة أحياناً',
            'أحياناً لا تستمع لآراء الآخرين',
            'قد تنسى مشاعر الناس'
          ],
          advice: [
            'استغل قدراتك القيادية في إدارة المشاريع',
            'تعلم الاستماع لآراء الفريق',
            'حاول أن تكون أكثر تعاطفاً'
          ],
          careers: 'مناسبة لك: الإدارة، ريادة الأعمال، السياسة، الجيش، إدارة المشاريع'
        }
      };
      
      // تحديد التحليل المناسب
      let analysis;
      if (quiz.id === 'personality-quiz-1') {
        analysis = mbtiAnalysis[results.personalityType];
      } else {
        analysis = oldAnalysis[results.personalityType as keyof typeof oldAnalysis];
      }
      
      if (!analysis) {
        return 'شخصية فريدة ومميزة!';
      }
      
      return `
        <div style="text-align: center; margin-bottom: 20px;">
          <h3 style="color: #F72585; font-size: 1.5rem; margin-bottom: 10px;">${analysis.title}</h3>
          <p style="font-size: 1.1rem; color: #666; margin-bottom: 20px;">${analysis.description}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          <h4 style="color: #28a745; margin-bottom: 15px;">✨ نقاط قوتك:</h4>
          ${Array.isArray(analysis.strengths) ? 
            `<ul style="text-align: right; padding-right: 20px;">
              ${analysis.strengths.map((strength: string) => `<li style="margin-bottom: 8px;">${strength}</li>`).join('')}
            </ul>` : 
            `<p style="text-align: right; margin: 0;">${analysis.strengths}</p>`
          }
        </div>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          <h4 style="color: #856404; margin-bottom: 15px;">⚠️ نقاط تحتاج تطوير:</h4>
          ${Array.isArray(analysis.weaknesses) ? 
            `<ul style="text-align: right; padding-right: 20px;">
              ${analysis.weaknesses.map((weakness: string) => `<li style="margin-bottom: 8px;">${weakness}</li>`).join('')}
            </ul>` : 
            `<p style="text-align: right; margin: 0;">${analysis.weaknesses}</p>`
          }
        </div>
        
        <div style="background: #d1ecf1; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          <h4 style="color: #0c5460; margin-bottom: 15px;">💡 نصائح لك:</h4>
          ${Array.isArray(analysis.advice) ? 
            `<ul style="text-align: right; padding-right: 20px;">
              ${analysis.advice.map((advice: string) => `<li style="margin-bottom: 8px;">${advice}</li>`).join('')}
            </ul>` : 
            `<p style="text-align: right; margin: 0;">${analysis.advice}</p>`
          }
        </div>
        
        <div style="background: linear-gradient(135deg, #F72585, #7209B7); color: white; padding: 20px; border-radius: 12px;">
          <h4 style="margin-bottom: 15px;">🎯 مجالات العمل المناسبة:</h4>
          <p style="margin: 0; font-size: 1.1rem;">${analysis.careers}</p>
        </div>
      `;
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
    let message;
    if (results.type === 'personality') {
      if (quiz.id === 'personality-quiz-1') {
        // للاختبار الجديد MBTI
        const mbtiNames: Record<string, string> = {
          'ISTJ': 'المفتش - المنظم المنهجي',
          'ISFJ': 'المدافع - الحامي المخلص',
          'INFJ': 'المستشار - المثالي المبدع',
          'INTJ': 'المهندس المعماري - الاستراتيجي المبدع',
          'ISTP': 'الحرفي - المحلل العملي',
          'ISFP': 'المغامر - الفنان الحر',
          'INFP': 'الوسيط - المثالي المبدع',
          'INTP': 'المنطقي - المحلل المبدع',
          'ESTP': 'المقاول - المقاول العملي',
          'ESFP': 'الممثل - الممثل الاجتماعي',
          'ENFP': 'المحفز - المبدع الاجتماعي',
          'ENTP': 'المجادل - المبدع الاستراتيجي',
          'ESTJ': 'المدير - المنظم القيادي',
          'ESFJ': 'القنصل - الحامي الاجتماعي',
          'ENFJ': 'البطل - القائد المثالي',
          'ENTJ': 'القائد - الاستراتيجي القوي'
        };
        const personalityName = mbtiNames[results.personalityType as string] || results.personalityType;
        message = `اكتشفت أن شخصيتي ${personalityName} (${results.personalityType}) في اختبار ${quiz.title}!`;
      } else {
        // للاختبارات القديمة
        message = `اكتشفت أن شخصيتي ${results.personalityType} في اختبار ${quiz.title}!`;
      }
    } else {
      message = `حصلت على ${results.score}/${results.totalQuestions} في اختبار ${quiz.title}!`;
    }
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
    } else if (quiz.id === 'southern-dialect-quiz') {
      customResult = getSouthernResultMessage(results.score);
    } else if (quiz.id === 'qassimi-dialect-quiz') {
      customResult = getQassimiResultMessage(results.score);
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
          <div className="results-container">
            <h2 className="quiz-results-title">نتيجة اختبار {quiz.title}</h2>
            {userName && (
              <div className="quiz-user-name">
                يا {userName}،
              </div>
            )}
            {customResult ? (
              <>
                <div className="score-display quiz-score-display-large">
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
                  <div className="score-display quiz-score-display-medium">
                    🎭 تحليل شخصيتك
                  </div>
                )}
                
                {/* عرض تفصيلي لنتائج MBTI */}
                {quiz.id === 'personality-quiz-1' && results.mbtiScores && (
                  <div className="mbti-analysis-container">
                    <h4 className="mbti-analysis-title">📊 تحليل مفصل لأبعاد شخصيتك:</h4>
                    <p className="mbti-analysis-description">
                      النقاط تظهر مدى ميلك لكل بعد من أبعاد الشخصية. كل بعد له 5 أسئلة، لذا الحد الأقصى هو 5 نقاط لكل جانب.
                    </p>
                    
                    {/* E/I */}
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 600, color: '#666' }}>اجتماعي (E)</span>
                        <span style={{ fontWeight: 600, color: '#666' }}>انطوائي (I)</span>
                      </div>
                      <div style={{ 
                        background: '#e9ecef', 
                        height: '20px', 
                        borderRadius: '10px', 
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: `${(results.mbtiScores.E + results.mbtiScores.I > 0 ? (results.mbtiScores.E / (results.mbtiScores.E + results.mbtiScores.I)) * 100 : 50)}%`,
                          top: '0',
                          width: '4px',
                          height: '100%',
                          background: '#F72585',
                          borderRadius: '2px'
                        }}></div>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: `${(results.mbtiScores.E + results.mbtiScores.I > 0 ? (results.mbtiScores.E / (results.mbtiScores.E + results.mbtiScores.I)) * 100 : 50)}%`,
                          transform: 'translate(-50%, -50%)',
                          background: '#F72585',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {results.mbtiScores.E > results.mbtiScores.I ? 'E' : 'I'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666' }}>
                        <span>{results.mbtiScores.E} نقاط</span>
                        <span>{results.mbtiScores.I} نقاط</span>
                      </div>
                    </div>

                    {/* S/N */}
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 600, color: '#666' }}>حسي (S)</span>
                        <span style={{ fontWeight: 600, color: '#666' }}>حدسي (N)</span>
                      </div>
                      <div style={{ 
                        background: '#e9ecef', 
                        height: '20px', 
                        borderRadius: '10px', 
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: `${(results.mbtiScores.S + results.mbtiScores.N > 0 ? (results.mbtiScores.S / (results.mbtiScores.S + results.mbtiScores.N)) * 100 : 50)}%`,
                          top: '0',
                          width: '4px',
                          height: '100%',
                          background: '#7209B7',
                          borderRadius: '2px'
                        }}></div>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: `${(results.mbtiScores.S + results.mbtiScores.N > 0 ? (results.mbtiScores.S / (results.mbtiScores.S + results.mbtiScores.N)) * 100 : 50)}%`,
                          transform: 'translate(-50%, -50%)',
                          background: '#7209B7',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {results.mbtiScores.S > results.mbtiScores.N ? 'S' : 'N'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666' }}>
                        <span>{results.mbtiScores.S} نقاط</span>
                        <span>{results.mbtiScores.N} نقاط</span>
                      </div>
                    </div>

                    {/* T/F */}
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 600, color: '#666' }}>تفكير (T)</span>
                        <span style={{ fontWeight: 600, color: '#666' }}>شعور (F)</span>
                      </div>
                      <div style={{ 
                        background: '#e9ecef', 
                        height: '20px', 
                        borderRadius: '10px', 
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: `${(results.mbtiScores.T + results.mbtiScores.F > 0 ? (results.mbtiScores.T / (results.mbtiScores.T + results.mbtiScores.F)) * 100 : 50)}%`,
                          top: '0',
                          width: '4px',
                          height: '100%',
                          background: '#4361EE',
                          borderRadius: '2px'
                        }}></div>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: `${(results.mbtiScores.T + results.mbtiScores.F > 0 ? (results.mbtiScores.T / (results.mbtiScores.T + results.mbtiScores.F)) * 100 : 50)}%`,
                          transform: 'translate(-50%, -50%)',
                          background: '#4361EE',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {results.mbtiScores.T > results.mbtiScores.F ? 'T' : 'F'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666' }}>
                        <span>{results.mbtiScores.T} نقاط</span>
                        <span>{results.mbtiScores.F} نقاط</span>
                      </div>
                    </div>

                    {/* J/P */}
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 600, color: '#666' }}>حكم (J)</span>
                        <span style={{ fontWeight: 600, color: '#666' }}>إدراك (P)</span>
                      </div>
                      <div style={{ 
                        background: '#e9ecef', 
                        height: '20px', 
                        borderRadius: '10px', 
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: `${(results.mbtiScores.J + results.mbtiScores.P > 0 ? (results.mbtiScores.J / (results.mbtiScores.J + results.mbtiScores.P)) * 100 : 50)}%`,
                          top: '0',
                          width: '4px',
                          height: '100%',
                          background: '#3A0CA3',
                          borderRadius: '2px'
                        }}></div>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: `${(results.mbtiScores.J + results.mbtiScores.P > 0 ? (results.mbtiScores.J / (results.mbtiScores.J + results.mbtiScores.P)) * 100 : 50)}%`,
                          transform: 'translate(-50%, -50%)',
                          background: '#3A0CA3',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {results.mbtiScores.J > results.mbtiScores.P ? 'J' : 'P'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666' }}>
                        <span>{results.mbtiScores.J} نقاط</span>
                        <span>{results.mbtiScores.P} نقاط</span>
                      </div>
                    </div>

                    <div style={{ 
                      background: 'linear-gradient(135deg, #F72585, #7209B7)', 
                      color: 'white', 
                      padding: '15px', 
                      borderRadius: '10px',
                      textAlign: 'center',
                      marginTop: '15px'
                    }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '5px' }}>
                        نوع شخصيتك: {results.personalityType}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        {results.personalityType === 'ISTJ' && 'المفتش - المنظم المنهجي'}
                        {results.personalityType === 'ISFJ' && 'المدافع - الحامي المخلص'}
                        {results.personalityType === 'INFJ' && 'المستشار - المثالي المبدع'}
                        {results.personalityType === 'INTJ' && 'المهندس المعماري - الاستراتيجي المبدع'}
                        {results.personalityType === 'ISTP' && 'الحرفي - المحلل العملي'}
                        {results.personalityType === 'ISFP' && 'المغامر - الفنان الحر'}
                        {results.personalityType === 'INFP' && 'الوسيط - المثالي المبدع'}
                        {results.personalityType === 'INTP' && 'المنطقي - المحلل المبدع'}
                        {results.personalityType === 'ESTP' && 'المقاول - المقاول العملي'}
                        {results.personalityType === 'ESFP' && 'الممثل - الممثل الاجتماعي'}
                        {results.personalityType === 'ENFP' && 'المحفز - المبدع الاجتماعي'}
                        {results.personalityType === 'ENTP' && 'المجادل - المبدع الاستراتيجي'}
                        {results.personalityType === 'ESTJ' && 'المدير - المنظم القيادي'}
                        {results.personalityType === 'ESFJ' && 'القنصل - الحامي الاجتماعي'}
                        {results.personalityType === 'ENFJ' && 'البطل - القائد المثالي'}
                        {results.personalityType === 'ENTJ' && 'القائد - الاستراتيجي القوي'}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* عرض النتيجة */}
                {quiz && quiz.id === 'qahtani-dialect-quiz' && typeof resultMessage === 'object' && resultMessage !== null ? (
                  <div className="result-message" style={{ textAlign: 'center', margin: '32px 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 12 }}>{resultMessage.emoji}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F72585', marginBottom: 10 }}>{resultMessage.title}</div>
                    <div style={{ fontSize: '1.1rem', color: '#333', marginBottom: 8 }}>{resultMessage.message}</div>
                  </div>
                ) : typeof resultMessage === 'string' ? (
                  <div 
                    className="result-message" 
                    dangerouslySetInnerHTML={{ __html: resultMessage }}
                    style={{ textAlign: 'right' }}
                  />
                ) : null}
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
            
            {/* قسم التعليقات والتقييمات */}
            {quiz && <CommentsSection quizId={quiz.id} quizTitle={quiz.title} />}
          </div>
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
                  // في اختبارات تحليل الشخصية، أنيميشن اختيار عادي فقط
                  if (quiz.category === 'تحليل شخصية') {
                    optionClass += ' selected';
                  } else {
                    optionClass += answerStatus === 'correct' ? ' correct' : ' wrong';
                  }
                }
                // إظهار الإجابة الصحيحة فقط في الاختبارات الموضوعية
                if (quiz.category !== 'تحليل شخصية' && idx === currentQuestion.correctAnswer && answerStatus === 'wrong') {
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
                    ...(selectedOption !== null && idx === selectedOption && answerStatus === 'wrong' && quiz.category !== 'تحليل شخصية' ? { animation: 'shake 0.4s' } : {})
                  }}
              >
                {option}
                  {selectedOption !== null && quiz.category !== 'تحليل شخصية' && idx === selectedOption && answerStatus === 'correct' && (
                    <span style={{ marginRight: 10, color: '#43a047', fontSize: '1.3em' }}>✔️</span>
                  )}
                  {selectedOption !== null && quiz.category !== 'تحليل شخصية' && idx === selectedOption && answerStatus === 'wrong' && (
                    <span style={{ marginRight: 10, color: '#e53935', fontSize: '1.3em' }}>❌</span>
                  )}
                  {selectedOption !== null && quiz.category !== 'تحليل شخصية' && idx === currentQuestion.correctAnswer && answerStatus === 'wrong' && (
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
          .option-btn.selected {
            background: linear-gradient(90deg, #F72585 0%, #7209B7 100%) !important;
            color: #fff !important;
            font-weight: 700;
            transform: scale(1.02);
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