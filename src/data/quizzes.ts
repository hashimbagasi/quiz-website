export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: 'لهجات' | 'ذكاء' | 'معلومات عامة' | 'تحليل شخصية';
  image: string;
  questions: Question[];
  popularity: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer?: number; // للاختبارات الموضوعية
  personalityType?: string; // لاختبارات تحليل الشخصية القديمة
  personalityMap?: string[]; // لكل خيار نوع شخصية (للاختبارات الحديثة)
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  personalityType?: string;
  timestamp: Date;
}

export const quizzes: Quiz[] = [
  {
    id: 'intelligence-quiz-1',
    title: 'اختبار ال IQ',
    description: 'اختبر قوة ذكائك المنطقي وحل ألغاز وتحديات متنوعة',
    category: 'ذكاء',
    image: '🧠',
    popularity: 2100,
    questions: [
      {
        id: 'q1',
        text: 'ما الرقم التالي في التسلسل: 3, 6, 11, 18, 27, ___ ؟',
        options: ['36', '38', '37', '39'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: 'أي شكل لا ينتمي للمجموعة التالية؟ (مربع – مثلث – دائرة – مكعب)',
        options: ['مربع', 'مثلث', 'دائرة', 'مكعب'],
        correctAnswer: 3
      },
      {
        id: 'q3',
        text: 'إذا كان أحمد يكبر عمر سالم بـ 5 سنوات، وبعد 10 سنوات يصبح عمر أحمد ضعف عمر سالم، فكم عمر أحمد الآن؟',
        options: ['30', '25', '20', '15'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        text: 'ما هو العدد الذي إذا قُسم على 2 ثم أضيف إليه 10 يصبح الناتج 25؟',
        options: ['20', '30', '35', '40'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        text: 'في عائلة من 6 أشخاص، لكل شخص أخ واحد فقط. كم عدد الإخوة؟',
        options: ['3', '4', '2', '6'],
        correctAnswer: 0
      },
      {
        id: 'q6',
        text: 'ما الحرف التالي في التسلسل؟ A, C, F, J, O, ___',
        options: ['S', 'T', 'U', 'V'],
        correctAnswer: 2
      },
      {
        id: 'q7',
        text: 'إذا كانت كل 3 أقلام بـ 7 ريالات، كم قيمة 9 أقلام؟',
        options: ['14', '18', '21', '21'],
        correctAnswer: 2
      },
      {
        id: 'q8',
        text: 'ما الشكل التالي في النمط: 🔺🔺⬛⬛🔺🔺⬛⬛ ?',
        options: ['🔺🔺', '⬛⬛', '🔺⬛', '⬛🔺'],
        correctAnswer: 0
      },
      {
        id: 'q9',
        text: 'إذا كانت الساعة تشير إلى 12، ودارت عقارب الساعة 90 درجة، كم ستكون الساعة؟',
        options: ['1:30', '3:00', '2:00', '4:00'],
        correctAnswer: 1
      },
      {
        id: 'q10',
        text: 'ما الرقم الذي إذا ضربته في نفسه ثم طرحت منه الرقم نفسه يعطي الناتج 72؟',
        options: ['12', '9', '8', '6'],
        correctAnswer: 1
      },
      {
        id: 'q11',
        text: 'أي من الكلمات التالية لها علاقة مختلفة؟ (يد – قدم – إصبع – أذن)',
        options: ['يد', 'قدم', 'إصبع', 'أذن'],
        correctAnswer: 3
      },
      {
        id: 'q12',
        text: 'إذا كان مجموع عمر الأب وابنه 60 سنة، وكان عمر الأب ضعف عمر ابنه، فكم عمر الابن؟',
        options: ['20', '30', '15', '40'],
        correctAnswer: 0
      },
      {
        id: 'q13',
        text: 'ما الرقم الذي يتبع هذا التسلسل: 1, 4, 9, 16, 25, ___',
        options: ['30', '32', '36', '34'],
        correctAnswer: 2
      },
      {
        id: 'q14',
        text: 'إذا كانت كلمة "شجرة" تُكتب بـ 57392، فما الرقم الذي يمثل "جرش"؟',
        options: ['2973', '2397', '9375', '7392'],
        correctAnswer: 0
      },
      {
        id: 'q15',
        text: 'أكمل النمط: 100, 90, 81, 73, ___',
        options: ['66', '65', '64', '70'],
        correctAnswer: 0
      },
      {
        id: 'q16',
        text: 'إذا كانت كل سيارة تحتاج إلى 4 إطارات، كم إطار نحتاج لـ 5 سيارات و2 دراجة؟',
        options: ['20', '22', '24', '26'],
        correctAnswer: 2
      },
      {
        id: 'q17',
        text: 'كلمة "أرنب" تتكون من كم حرف؟',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1
      },
      {
        id: 'q18',
        text: 'كم عدد الزوايا في شكل خماسي؟',
        options: ['3', '4', '5', '6'],
        correctAnswer: 2
      },
      {
        id: 'q19',
        text: 'أي من هذه العمليات يعطي أكبر نتيجة؟',
        options: ['8 × 5', '10 + 25', '100 ÷ 2', '6²'],
        correctAnswer: 1
      },
      {
        id: 'q20',
        text: 'إذا كان اليوم هو الخميس، ما هو اليوم بعد 100 يوم؟',
        options: ['الجمعة', 'الأحد', 'الإثنين', 'السبت'],
        correctAnswer: 3
      }
    ]
  },
  {
    id: 'general-knowledge-1',
    title: 'معلومات عامة ثقافية',
    description: 'اختبر معرفتك العامة بالتاريخ والجغرافيا والعلوم',
    category: 'معلومات عامة',
    image: '📚',
    popularity: 1800,
    questions: [
      {
        id: 'q1',
        text: 'ما هي عاصمة مصر؟',
        options: ['الإسكندرية', 'القاهرة', 'الأقصر', 'أسوان'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: 'في أي عام تأسست المملكة العربية السعودية؟',
        options: ['1925', '1932', '1945', '1950'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        text: 'ما هو أكبر محيط في العالم؟',
        options: ['الأطلسي', 'الهندي', 'الهادئ', 'المتجمد الشمالي'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        text: 'من هو مخترع الهاتف؟',
        options: ['توماس إديسون', 'ألكسندر جراهام بيل', 'نيكولا تسلا', 'ألبرت أينشتاين'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        text: 'ما هو أطول نهر في العالم؟',
        options: ['النيل', 'الأمازون', 'المسيسيبي', 'اليانغتسي'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'personality-quiz-1',
    title: 'اختبار تحليل الشخصية MBTI (16 نوع)',
    description: 'اكتشف نوع شخصيتك من بين 16 نوع شخصية مختلفة! اختبار شامل ومفصل',
    category: 'تحليل شخصية',
    image: '🎭',
    popularity: 3200,
    questions: [
      // E/I - اجتماعي/انطوائي
      {
        id: 'q1',
        text: 'في الحفلات، أنت غالباً:',
        options: [
          'تتعرف على ناس جدد وتتكلم كثير', // E
          'تقضي الوقت مع أصدقاء مقربين', // I
          'تراقب وتلاحظ التفاصيل', // I
          'تنظم الألعاب أو تدير المجموعة' // E
        ],
        personalityMap: ['E', 'I', 'I', 'E']
      },
      {
        id: 'q2',
        text: 'عند مواجهة مشكلة، أول ردة فعل لك:',
        options: [
          'تستشير أحد أو تتكلم عنها', // E
          'تحللها بعقلك وتبحث عن السبب', // I
          'تتأثر نفسياً أو تحس بضيق', // I
          'تبحث عن حل عملي وتتصرف فوراً' // E
        ],
        personalityMap: ['E', 'I', 'I', 'E']
      },
      {
        id: 'q3',
        text: 'في العمل الجماعي، أنت غالباً:',
        options: [
          'تحب النقاش وتبادل الأفكار', // E
          'تركز على التفاصيل والخطة', // I
          'تهتم أن الكل مرتاح', // I
          'توجه الفريق وتوزع المهام' // E
        ],
        personalityMap: ['E', 'I', 'I', 'E']
      },
      {
        id: 'q4',
        text: 'وقت الفراغ تفضل:',
        options: [
          'الخروج مع الأصدقاء', // E
          'قراءة كتاب أو تعلم شيء جديد', // I
          'مشاهدة فيلم مؤثر', // I
          'تجربة نشاط جديد أو قيادة مجموعة' // E
        ],
        personalityMap: ['E', 'I', 'I', 'E']
      },
      {
        id: 'q5',
        text: 'عند اتخاذ قرار مهم، تعتمد على:',
        options: [
          'آراء من حولك', // E
          'المنطق والتحليل', // I
          'مشاعرك وحدسك', // I
          'الخبرة والتجربة' // E
        ],
        personalityMap: ['E', 'I', 'I', 'E']
      },
      // S/N - حسي/حدسي
      {
        id: 'q6',
        text: 'أكثر شيء يلفت انتباهك في الناس:',
        options: [
          'ملابسهم ومظهرهم', // S
          'طريقة تفكيرهم وأفكارهم', // N
          'مشاعرهم وتعبيراتهم', // N
          'أفعالهم وسلوكهم' // S
        ],
        personalityMap: ['S', 'N', 'N', 'S']
      },
      {
        id: 'q7',
        text: 'في المشاريع، أنت تفضل:',
        options: [
          'اتباع الطرق المجربة والمختبرة', // S
          'تجربة أفكار جديدة ومبتكرة', // N
          'التفكير في الاحتمالات المستقبلية', // N
          'التركيز على النتائج الملموسة' // S
        ],
        personalityMap: ['S', 'N', 'N', 'S']
      },
      {
        id: 'q8',
        text: 'أكثر شيء يحمسك في الحياة:',
        options: [
          'النجاح المادي والمالي', // S
          'تحقيق الإنجازات الفكرية', // N
          'الراحة النفسية والسلام الداخلي', // N
          'العلاقات الاجتماعية' // S
        ],
        personalityMap: ['S', 'N', 'N', 'S']
      },
      {
        id: 'q9',
        text: 'عند قراءة قصة، أنت تفضل:',
        options: [
          'التفاصيل الملموسة والأحداث الواقعية', // S
          'الرموز والمعاني الخفية', // N
          'تطوير الشخصيات وعمقها', // N
          'الحبكة والأحداث المثيرة' // S
        ],
        personalityMap: ['S', 'N', 'N', 'S']
      },
      {
        id: 'q10',
        text: 'في حل المشكلات، أنت:',
        options: [
          'تبحث عن حلول عملية ومباشرة', // S
          'تفكر في حلول إبداعية ومبتكرة', // N
          'تتخيل سيناريوهات مختلفة', // N
          'تعتمد على خبرتك السابقة' // S
        ],
        personalityMap: ['S', 'N', 'N', 'S']
      },
      // T/F - تفكير/شعور
      {
        id: 'q11',
        text: 'عند اتخاذ قرار مهم، أنت:',
        options: [
          'تحلل الإيجابيات والسلبيات', // T
          'تستمع لمشاعرك وحدسك', // F
          'تهتم بتأثير القرار على الآخرين', // F
          'تبحث عن الحقائق والبيانات' // T
        ],
        personalityMap: ['T', 'F', 'F', 'T']
      },
      {
        id: 'q12',
        text: 'في النقاشات، أنت:',
        options: [
          'تركز على المنطق والحقائق', // T
          'تهتم بمشاعر المشاركين', // F
          'تحاول إرضاء الجميع', // F
          'تبحث عن الحقيقة بغض النظر عن المشاعر' // T
        ],
        personalityMap: ['T', 'F', 'F', 'T']
      },
      {
        id: 'q13',
        text: 'أكثر شيء يزعجك في الآخرين:',
        options: [
          'عدم المنطق والتفكير العشوائي', // T
          'البرود وعدم الاهتمام بالمشاعر', // F
          'قسوة المشاعر وعدم التعاطف', // F
          'عدم الكفاءة والكسل' // T
        ],
        personalityMap: ['T', 'F', 'F', 'T']
      },
      {
        id: 'q14',
        text: 'في العمل، أنت تفضل:',
        options: [
          'العدالة والمساواة للجميع', // T
          'المرونة والتفهم للظروف', // F
          'الاهتمام باحتياجات كل شخص', // F
          'التركيز على النتائج والأداء' // T
        ],
        personalityMap: ['T', 'F', 'F', 'T']
      },
      {
        id: 'q15',
        text: 'عند تقييم شخص، أنت:',
        options: [
          'تنظر إلى إنجازاته وقدراته', // T
          'تهتم بشخصيته وطريقة تعامله', // F
          'تحكم عليه من خلال مشاعرك نحوه', // F
          'تحلل سلوكه وأداءه' // T
        ],
        personalityMap: ['T', 'F', 'F', 'T']
      },
      // J/P - حكم/إدراك
      {
        id: 'q16',
        text: 'في حياتك اليومية، أنت:',
        options: [
          'تخطط مسبقاً وتتبع الجدول', // J
          'تترك الأمور تسير بشكل طبيعي', // P
          'تتأقلم مع الظروف المتغيرة', // P
          'تحب التنظيم والترتيب' // J
        ],
        personalityMap: ['J', 'P', 'P', 'J']
      },
      {
        id: 'q17',
        text: 'عند مواجهة موعد نهائي، أنت:',
        options: [
          'تنهي العمل مبكراً لتتجنب الضغط', // J
          'تعمل تحت الضغط في اللحظة الأخيرة', // P
          'تتأقلم مع التغييرات المفاجئة', // P
          'تخطط وتوزع العمل على مراحل' // J
        ],
        personalityMap: ['J', 'P', 'P', 'J']
      },
      {
        id: 'q18',
        text: 'في السفر، أنت تفضل:',
        options: [
          'خطة مفصلة وجدول محدد', // J
          'المرونة والتغيير حسب المزاج', // P
          'استكشاف أماكن جديدة عشوائياً', // P
          'حجز كل شيء مسبقاً' // J
        ],
        personalityMap: ['J', 'P', 'P', 'J']
      },
      {
        id: 'q19',
        text: 'في اتخاذ القرارات، أنت:',
        options: [
          'تتخذ قرارات سريعة وحازمة', // J
          'تترك خياراتك مفتوحة', // P
          'تتأقلم مع الظروف المتغيرة', // P
          'تحب الوضوح واليقين' // J
        ],
        personalityMap: ['J', 'P', 'P', 'J']
      },
      {
        id: 'q20',
        text: 'في بيئة العمل، أنت:',
        options: [
          'تحب القواعد والأنظمة الواضحة', // J
          'تفضل المرونة والحرية', // P
          'تتأقلم مع التغييرات بسهولة', // P
          'تحب التنظيم والترتيب' // J
        ],
        personalityMap: ['J', 'P', 'P', 'J']
      }
    ]
  },
  {
    id: 'intelligence-quiz-2',
    title: 'ألغاز رياضية',
    description: 'اختبر مهاراتك الرياضية وحل الألغاز العددية',
    category: 'ذكاء',
    image: '🔢',
    popularity: 1600,
    questions: [
      {
        id: 'q1',
        text: 'ما هو حاصل ضرب الأرقام من 1 إلى 5؟',
        options: ['120', '100', '150', '200'],
        correctAnswer: 0
      },
      {
        id: 'q2',
        text: 'إذا كان عمر أحمد ضعف عمر علي، وعمر علي 15 سنة، فكم عمر أحمد؟',
        options: ['25', '30', '35', '40'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        text: 'ما هو الجذر التربيعي لـ 144؟',
        options: ['10', '11', '12', '13'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        text: 'كم عدد الأيام في شهر فبراير في السنة الكبيسة؟',
        options: ['28', '29', '30', '31'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        text: 'ما هو ناتج 7 × 8؟',
        options: ['54', '56', '58', '60'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'hejazi-dialect-quiz',
    title: 'قد ايش تفهم فاللهجة الحجازية؟',
    description: 'اختبر معلوماتك عن الكلمات الحجازية الشعبية بطريقة ممتعة!',
    category: 'لهجات',
    image: '🏝️',
    popularity: 0,
    questions: [
      {
        id: 'q1',
        text: 'وش معنى كلمة "دحديرة" عند أهل الحجاز؟',
        options: ['حارة قديمة', 'نزلة أو منحدر', 'ساحة كبيرة', 'مزرعة'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: 'إذا قالوا "الدبش وصل"، إيش يقصدوا؟',
        options: ['أثاث البيت', 'ملابس قديمة', 'أغراض العروسة قبل الزواج', 'أكل شعبي'],
        correctAnswer: 2
      },
      {
        id: 'q3',
        text: 'واحدة تتكلم "مرقعة"، كيف يكون أسلوبها؟',
        options: ['تتكلم رسمي', 'دلع ومياعة في الكلام', 'صوتها عالي', 'سريعة في الكلام'],
        correctAnswer: 1
      },
      {
        id: 'q4',
        text: 'فلان يحب "الدحلسة"، يعني؟',
        options: ['يحب المزح', 'يحب الأكل', 'يتمصلح مع الناس عشان مصلحة', 'يحب السفر'],
        correctAnswer: 2
      },
      {
        id: 'q5',
        text: 'لو أحد قالك "قوامن"، وش يقصد؟',
        options: ['انتبه', 'تعال هنا', 'بسرعة / حالًا', 'خلاص'],
        correctAnswer: 2
      },
      {
        id: 'q6',
        text: 'إيش هي "الكرويتة" في الحجاز؟',
        options: ['دكة خشبية', 'سيارة قديمة', 'زينة للبيت', 'أكلة شعبية'],
        correctAnswer: 0
      },
      {
        id: 'q7',
        text: 'وش معنى "الزقاق"؟',
        options: ['سوق', 'شارع ضيق', 'باب البيت', 'مكان مرتفع'],
        correctAnswer: 1
      },
      {
        id: 'q8',
        text: 'لما يقولوا لك "اندر بره"، إيش المطلوب منك؟',
        options: ['اجلس', 'اطلع / اخرج', 'ادخل', 'اسكت'],
        correctAnswer: 1
      },
      {
        id: 'q9',
        text: 'لو أحد قالك "اديلو"، إيش تسوي؟',
        options: ['انصحه', 'اعطيه', 'اناديه', 'اضربه'],
        correctAnswer: 1
      },
      {
        id: 'q10',
        text: 'وش هو "الدهليز" في البيت الحجازي؟',
        options: ['غرفة النوم', 'مدخل البيت', 'المطبخ', 'السطح'],
        correctAnswer: 1
      },
      {
        id: 'q11',
        text: 'البنات يقولوا "الكرتة"، إيش يقصدوا؟',
        options: ['الحذاء', 'الحقيبة', 'الفستان', 'الطرحة'],
        correctAnswer: 2
      },
      {
        id: 'q12',
        text: 'لو أحد قالك "دحين"، متى يقصد؟',
        options: ['بكرة', 'الآن', 'أمس', 'بعد شوي'],
        correctAnswer: 1
      },
      {
        id: 'q13',
        text: 'فلان "تنح"، يعني؟',
        options: ['وقف مكانه وما فهم', 'ضحك كثير', 'زعل فجأة', 'صار سريع'],
        correctAnswer: 0
      },
      {
        id: 'q14',
        text: 'وش هو "المنقاش" عند البنات؟',
        options: ['مكياج', 'ملقط الحواجب', 'مشط الشعر', 'سوار'],
        correctAnswer: 1
      },
      {
        id: 'q15',
        text: 'لو أحد قالك جيب "تكاية"، إيش تجيب له؟',
        options: ['بطانية', 'مخدة صغيرة للظهر', 'سجادة', 'كرسي صغير'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'najdi-dialect-quiz',
    title: 'اختبار اللهجة النجدية',
    description: 'اختبر معرفتك بكلمات وعبارات أهل نجد، واكتشف إذا كنت نجدي أصيل!',
    category: 'لهجات',
    image: '🏜️',
    popularity: 0,
    questions: [
      {
        id: 'q1',
        text: 'إذا واحد قال لك "سنع أمورك"، وش يقصد؟',
        options: ['أسرع', 'رتب وضعك', 'انقلع', 'سافر'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: '"يطرّي" معناها؟',
        options: ['يتكلم بسرعة', 'يجيب طاري شي من الماضي', 'ينادي أحد', 'يشتكي'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        text: '"يصمل" معناها؟',
        options: ['يتراجع', 'يتهور', 'يثبت ويتحمّل', 'يتكاسل'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        text: '"يلحّق على الشي" تعني؟',
        options: ['يشتريه', 'يدركه قبل يفوته', 'يزعل بسببه', 'يحس فيه'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        text: '"يفهي" معناها؟',
        options: ['ذكي', 'نايم', 'شارد الذهن', 'مزكم'],
        correctAnswer: 2
      },
      {
        id: 'q6',
        text: '"يبربس" معناها؟',
        options: ['يتخبط أو يتصرف بدون فهم', 'يصرخ', 'يسرق', 'يطالع'],
        correctAnswer: 0
      },
      {
        id: 'q7',
        text: '"يتشره" يعني؟',
        options: ['يعاتب', 'يبكي', 'يسب', 'يضحك'],
        correctAnswer: 0
      },
      {
        id: 'q8',
        text: '"تسفّه" تعني؟',
        options: ['تضحك عليه', 'تتجاهله', 'تضربه', 'تمزح معه'],
        correctAnswer: 1
      },
      {
        id: 'q9',
        text: '"حدر" معناها؟',
        options: ['طلع', 'نزل', 'لف', 'رقد'],
        correctAnswer: 1
      },
      {
        id: 'q10',
        text: '"يبزخ" معناها؟',
        options: ['يشتري شي غالي', 'يمدح نفسه', 'يصرف فلوس بدون حساب', 'يكب شي'],
        correctAnswer: 2
      },
      {
        id: 'q11',
        text: '"أبخص به" تعني؟',
        options: ['أقرب له', 'أحرص عليه', 'أعلم به', 'يحبّه كثير'],
        correctAnswer: 2
      },
      {
        id: 'q12',
        text: '"الطّمل" توصف شخص:',
        options: ['مرتب', 'غير نظيف', 'ثقيل دم', 'عصبي'],
        correctAnswer: 1
      },
      {
        id: 'q13',
        text: '"مقرود" معناها؟',
        options: ['كثير النوم', 'شقي الحظ', 'كسول', 'مغرور'],
        correctAnswer: 1
      },
      {
        id: 'q14',
        text: '"الاقشر" تعني؟',
        options: ['مؤذي أو خبيث', 'كسول', 'غبي', 'ناعم'],
        correctAnswer: 0
      },
      {
        id: 'q15',
        text: '"لفعة" تعني؟',
        options: ['طلع مشوار', 'لطمه', 'جلس فجأة', 'سافر'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'hail-dialect-quiz',
    title: 'اختبار اللهجة الحايلية',
    description: 'اختبر معرفتك بكلمات ومعاني اللهجة الحائلية الأصيلة!',
    category: 'لهجات',
    image: '🏜️',
    popularity: 0,
    questions: [
      {
        id: 'q1',
        text: 'ييزي',
        options: ['يكفي', 'سهل', 'جميل', 'مستحيل'],
        correctAnswer: 0
      },
      {
        id: 'q2',
        text: 'جغمه',
        options: ['رشفه', 'حفرة عميقه', 'قطعة صغيرة', 'مذاق'],
        correctAnswer: 0
      },
      {
        id: 'q3',
        text: 'هاليودعه',
        options: ['من أجل ذلك', 'دعنا نودعه', 'وداعًا', 'بسبب هذا'],
        correctAnswer: 0
      },
      {
        id: 'q4',
        text: 'يتمقل',
        options: ['يمعن النظر', 'يعبس في وجهك', 'يبتسم', 'ينظر بغضب'],
        correctAnswer: 0
      },
      {
        id: 'q5',
        text: 'شفايه',
        options: ['فضول', 'سفره', 'راحة', 'سؤال'],
        correctAnswer: 0
      },
      {
        id: 'q6',
        text: 'جماهو',
        options: ['أليس كذلك', 'رفض شديد اللهجة', 'موافق', 'أكيد'],
        correctAnswer: 0
      },
      {
        id: 'q7',
        text: 'منلهد',
        options: ['أشعر بضيق شديد', 'اشعر بسعادة جامحة', 'مستعجل', 'مندهش'],
        correctAnswer: 0
      },
      {
        id: 'q8',
        text: 'رَيِّض',
        options: ['مطول على هالحال', 'الجبال والسهول', 'مستريح', 'مستمر'],
        correctAnswer: 0
      },
      {
        id: 'q9',
        text: 'غَمِيضَه',
        options: ['حسافه', 'لعبة شعبية', 'فرصة', 'مشكلة'],
        correctAnswer: 0
      },
      {
        id: 'q10',
        text: 'يويدز',
        options: ['يسترق النظر', 'يهز رأسه', 'يضحك', 'يهمس'],
        correctAnswer: 0
      },
      {
        id: 'q11',
        text: 'شخف الوغيد',
        options: ['خطف الطفل', 'قبّل الطفل', 'أخذ المال', 'أخاف الطفل'],
        correctAnswer: 0
      },
      {
        id: 'q12',
        text: 'طخمه',
        options: ['شديد الجمال', 'شديد القبح', 'ضخم الجسم', 'سريع الغضب'],
        correctAnswer: 0
      },
      {
        id: 'q13',
        text: 'يمرش',
        options: ['يغمز بعينه', 'لابأس به', 'يتمشى', 'يضحك'],
        correctAnswer: 1
      },
      {
        id: 'q14',
        text: 'مِدزدِي به',
        options: ['لقد ظلمته', 'يستحق ما فعلت به', 'أحسنت إليه', 'أغضبته'],
        correctAnswer: 1
      },
      {
        id: 'q15',
        text: 'إِلْفقه',
        options: ['الزم الصمت', 'اكمل حديثك', 'انتبه', 'توقف'],
        correctAnswer: 0
      },
      {
        id: 'q16',
        text: 'من ياعيلوه',
        options: ['منذ زمن طويل', 'من ابنه هذا الطفل؟', 'منذ قليل', 'منذ أسبوع'],
        correctAnswer: 0
      },
      {
        id: 'q17',
        text: 'تشاويت',
        options: ['تعافيت', 'لعبه شعبيه', 'تعبت', 'تأخرت'],
        correctAnswer: 0
      },
      {
        id: 'q18',
        text: 'بشنقنا',
        options: ['بالقرب منا', 'رجل غريب غير معروف الهوية', 'بعيد عنا', 'في وسطنا'],
        correctAnswer: 0
      },
      {
        id: 'q19',
        text: 'اغديه',
        options: ['قد يكون', 'هل تغديت؟', 'أكيد', 'ربما'],
        correctAnswer: 0
      },
      {
        id: 'q20',
        text: 'وش موزيك',
        options: ['وش حادك', 'لماذا تختبئ', 'ماذا تفعل', 'ما خطبك'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'qahtani-dialect-quiz',
    title: 'اختبار اللهجة القحطانية',
    description: 'اختبر معرفتك بكلمات ومعاني لهجة قحطان الأصيلة! هل أنت قحطاني أصيل؟',
    category: 'لهجات',
    image: '🏜️',
    popularity: 0,
    questions: [
      {
        id: 'q1',
        text: 'إذا قال أحدهم "وش علمك؟"، فماذا يقصد؟',
        options: ['هل لديك مشكلة؟', 'هل تفهمني؟', 'ما الأخبار؟', 'أنت بخير؟'],
        correctAnswer: 2
      },
      {
        id: 'q2',
        text: 'ماذا تعني كلمة "يقرم"؟',
        options: ['يغني', 'يأكل بشهية', 'يجلس بهدوء', 'ينام'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        text: 'ماذا تعني كلمة "معط"؟',
        options: ['سحب بقوة', 'أكل بنهم', 'ضرب شخصًا', 'ركض بسرعة'],
        correctAnswer: 0
      },
      {
        id: 'q4',
        text: 'ما معنى كلمة "يشب"؟',
        options: ['يتحدث بصوت عالٍ', 'يجري بسرعة', 'يشتعل أو يضيء', 'ينام مبكرًا'],
        correctAnswer: 2
      },
      {
        id: 'q5',
        text: 'ما معنى كلمة "يحدر"؟',
        options: ['يرفع شيئًا للأعلى', 'ينزل من مكان مرتفع', 'يجهز الطعام', 'يبحث عن شيء'],
        correctAnswer: 1
      },
      {
        id: 'q6',
        text: 'ما معنى "يربع"؟',
        options: ['يطلب المساعدة', 'يرفع صوته', 'يستريح في البر', 'يأكل بسرعة'],
        correctAnswer: 2
      },
      {
        id: 'q7',
        text: 'إذا سمعت كلمة "سربة"، فماذا تعني؟',
        options: ['مجموعة من الأشخاص يسيرون معًا', 'نوع من الأكلات الشعبية', 'مزرعة', 'مكان مرتفع'],
        correctAnswer: 0
      },
      {
        id: 'q8',
        text: 'إذا قال شخص "فلان زهم عليك"، فماذا يقصد؟',
        options: ['زارك في المنزل', 'انتقدك بشدة', 'ناداك أو طلبك', 'أعطاك هدية'],
        correctAnswer: 2
      },
      {
        id: 'q9',
        text: 'ماذا تعني كلمة "الجلب"؟',
        options: ['المطر الغزير', 'نوع من الملابس', 'صوت الحذاء أثناء المشي', 'الطين بعد المطر'],
        correctAnswer: 0
      },
      {
        id: 'q10',
        text: 'إذا قال شخص "فلان مهوب سهل"، فماذا يقصد؟',
        options: ['شخص فقير', 'شخص ذكي وماكر', 'شخص ضعيف الشخصية', 'شخص كريم'],
        correctAnswer: 1
      },
      {
        id: 'q11',
        text: 'ما معنى "هجد"؟',
        options: ['سكت وهدأ', 'غادر بسرعة', 'تعب من المشي', 'ضحك كثيرًا'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'southern-dialect-quiz',
    title: 'اختبار اللهجة الجنوبية',
    description: 'اختبر معرفتك بكلمات ومعاني لهجة الجنوب الأصيلة! هل أنت من أهل الجنوب؟',
    category: 'لهجات',
    image: '⛰️',
    popularity: 0,
    questions: [
      {
        id: 'q1',
        text: 'ما معنى كلمة "يفحط" في اللهجة الجنوبية؟',
        options: ['يصيح بصوت مرتفع', 'ينظف البيت', 'يمشي مسرعًا', 'يلبس ملابس جديدة'],
        correctAnswer: 2
      },
      {
        id: 'q2',
        text: 'إذا قال لك شخص "أهجع"، فماذا يقصد؟',
        options: ['ارقص', 'نام واهدأ', 'تكلم', 'استعجل'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        text: '"قمرة" في لهجتهم تعني:',
        options: ['الشباك', 'المطبخ', 'الغرفة', 'الحوش'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        text: '"هلبا" معناها:',
        options: ['قليلاً', 'بكثرة', 'بجنون', 'بعد قليل'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        text: 'إذا قالوا "مهبوش"، يقصدون:',
        options: ['غاضب', 'مشغول', 'متسخ', 'مرتاح'],
        correctAnswer: 0
      },
      {
        id: 'q6',
        text: 'كلمة "تقريش" تعني:',
        options: ['غداء خفيف', 'وجبة فطور', 'كشتة', 'نزهة'],
        correctAnswer: 3
      },
      {
        id: 'q7',
        text: '"مقرود" تعني:',
        options: ['حسن الحظ', 'ضعيف الشخصية', 'شقي الحظ', 'ذكي'],
        correctAnswer: 2
      },
      {
        id: 'q8',
        text: 'ما معنى "يفرفر"؟',
        options: ['يتحرك كثيرًا', 'يضحك', 'يهاجم', 'يطبخ'],
        correctAnswer: 0
      },
      {
        id: 'q9',
        text: '"ينقز" معناها؟',
        options: ['يتكلم', 'يقفز', 'يضحك', 'يهرب'],
        correctAnswer: 1
      },
      {
        id: 'q10',
        text: '"ينشب" في لهجة الجنوب تعني؟',
        options: ['يعلق', 'يصعد', 'ينزل', 'يختبئ'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'qassimi-dialect-quiz',
    title: '🧠 اختبر معرفتك باللهجة القصيمية – هل تفهمها مثل أهل القصيم؟',
    description: 'جرب تجاوب على هالأسئلة باللهجة القصيمية، وشوف كم درجة تجمع!\nشارك نتيجتك مع أصحابك وخنشوف منهو القصيمي الحقيقي! 😄',
    category: 'لهجات',
    image: '🌾',
    popularity: 0,
    questions: [
      { id: 'q1', text: '"تهقى" وش معناها؟', options: ['تضحك', 'تتوقع', 'تستعجل', 'تستغرب'], correctAnswer: 1 },
      { id: 'q2', text: '"مصع" تعني؟', options: ['شد بقوة', 'تكلم بعصبية', 'ركض', 'نظف المكان'], correctAnswer: 0 },
      { id: 'q3', text: '"هماه" وش معناها؟', options: ['هو من؟', 'أليس كذلك؟', 'متى؟', 'وش عنده؟'], correctAnswer: 1 },
      { id: 'q4', text: '"احترين" تعني؟', options: ['تعال بسرعة', 'انتظرني', 'تحمّس', 'توتر'], correctAnswer: 1 },
      { id: 'q5', text: '"قمبازي" وش المقصود؟', options: ['قميص النوم', 'قفز عالي', 'الصحن المقعر', 'مخادع'], correctAnswer: 2 },
      { id: 'q6', text: '"يتطنز" تعني؟', options: ['يتجاهل', 'يتمشى', 'يستهزئ', 'يغني'], correctAnswer: 2 },
      { id: 'q7', text: '"أزمل" وش معناها؟', options: ['أجمل', 'أغضب', 'أستعد للرحيل', 'أخاف'], correctAnswer: 2 },
      { id: 'q8', text: '"وراه؟" تعني؟', options: ['وش عنده؟', 'متى؟', 'ليه؟', 'كيف؟'], correctAnswer: 2 },
      { id: 'q9', text: '"يتنيذخ" معناها؟', options: ['يتفاخر', 'يستهبل', 'يتعب', 'يبكي'], correctAnswer: 1 },
      { id: 'q10', text: '"أغولك" وش تعني؟', options: ['أستشيرك', 'أقول لك', 'أخبرك', 'أشتكي لك'], correctAnswer: 1 },
      { id: 'q11', text: '"نطل" معناها؟', options: ['دخل', 'راقب', 'طلع', 'جرى'], correctAnswer: 2 },
      { id: 'q12', text: '"مصنقه" وش تعني؟', options: ['سريعة', 'وسخة', 'مشغولة', 'حزينة'], correctAnswer: 1 },
      { id: 'q13', text: '"عيا" تعني؟', options: ['تعب', 'تأخر', 'رفض', 'ضاع'], correctAnswer: 2 },
      { id: 'q14', text: '"مطاريس" وش معناها؟', options: ['عشوائية', 'ناس غريبين', 'كتب كثيرة', 'أشياء مرمية'], correctAnswer: 0 }
    ]
  }
];

export const getPopularQuizzes = (): Quiz[] => {
  return [...quizzes].sort((a, b) => b.popularity - a.popularity).slice(0, 5);
};

export const getQuizzesByCategory = (category: string): Quiz[] => {
  return quizzes.filter(quiz => quiz.category === category);
};

export const searchQuizzes = (query: string): Quiz[] => {
  const lowercaseQuery = query.toLowerCase();
  return quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(lowercaseQuery) ||
    quiz.description.toLowerCase().includes(lowercaseQuery) ||
    quiz.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getSimilarQuizzes = (currentQuizId: string): Quiz[] => {
  const currentQuiz = quizzes.find(q => q.id === currentQuizId);
  if (!currentQuiz) return [];
  
  return quizzes
    .filter(q => q.id !== currentQuizId && q.category === currentQuiz.category)
    .slice(0, 3);
};

export function getHejaziResultMessage(score: number) {
  if (score >= 13) {
    return {
      emoji: '🎉',
      title: `النتيجة: ${score} / 15`,
      message: 'خبير لهجات حجازية! واضح إنك من أهل جدة أو حولها!'
    };
  } else if (score >= 8) {
    return {
      emoji: '🤔',
      title: `النتيجة: ${score} / 15`,
      message: 'نص نص، عندك خلفية بس تحتاج جلسات أكثر مع الحجازيين.'
    };
  } else {
    return {
      emoji: '😅',
      title: `النتيجة: ${score} / 15`,
      message: 'واضح إنك ضايع، شكلك من الشرقية أو الشمال!'
    };
  }
}

export function getNajdiResultMessage(score: number) {
  if (score >= 13) {
    return {
      emoji: '🌟',
      title: `النتيجة: ${score} / 15`,
      message: 'يا بعد حيي! لهجتك نجديّة أصيلة، وتنطقها وأنت مغمض!'
    };
  } else if (score >= 9) {
    return {
      emoji: '👏',
      title: `النتيجة: ${score} / 15`,
      message: 'أنت قريب، بس باين إنك مكثر تجلس مع أهل نجد… شد حيلك شوي!'
    };
  } else if (score >= 5) {
    return {
      emoji: '🤔',
      title: `النتيجة: ${score} / 15`,
      message: 'تعرف شي وتجهل أشياء… يبيلك كم سبوع بالقصيم ولا الرياض!'
    };
  } else {
    return {
      emoji: '😅',
      title: `النتيجة: ${score} / 15`,
      message: 'يبيلك جلسة مع أهل نجد! 😅'
    };
  }
} 

export function getQahtaniResultMessage(score: number) {
  if (score >= 10) {
    return {
      emoji: '🔥',
      title: `النتيجة: ${score} / 11`,
      message: 'واضح إنك قحطاني أصيل، ما ينخاف عليك!'
    };
  } else if (score >= 7) {
    return {
      emoji: '��',
      title: `النتيجة: ${score} / 11`,
      message: 'عندك خلفية طيبة، بس محتاج لك سوالف مع شيبان قحطان.'
    };
  } else if (score >= 4) {
    return {
      emoji: '😅',
      title: `النتيجة: ${score} / 11`,
      message: 'نص ونص، بس دامك تحاول فأنت عالطريق!'
    };
  } else {
    return {
      emoji: '😂',
      title: `النتيجة: ${score} / 11`,
      message: 'شكلك تبي تبدأ تتعلم من الصفر… بس حياك الله!'
    };
  }
} 

export function getSouthernResultMessage(score: number) {
  if (score >= 9) {
    return {
      emoji: '🔥',
      title: `النتيجة: ${score} / 10`,
      message: 'من أهل الجنوب الأصل، تفهم وترد بنفس اللهجة!'
    };
  } else if (score >= 6) {
    return {
      emoji: '👏',
      title: `النتيجة: ${score} / 10`,
      message: 'فاهم واجد، بس باقي لك كم كلمة وتكون محترف.'
    };
  } else if (score >= 3) {
    return {
      emoji: '😅',
      title: `النتيجة: ${score} / 10`,
      message: 'تبي لك دروس لهجة جنوبية، بس المحاولة حلوة!'
    };
  } else {
    return {
      emoji: '😂',
      title: `النتيجة: ${score} / 10`,
      message: 'شكل اللهجة جديدة عليك… لازم تزور الجنوب!'
    };
  }
} 

export function getQassimiResultMessage(score: number) {
  if (score >= 10) {
    return {
      emoji: '🎉',
      title: `النتيجة: ${score} / 14`,
      message: 'أنت قصيمي أصيل! لهجتك ما عليها كلام، وتفهمها من قلب.'
    };
  } else if (score >= 6) {
    return {
      emoji: '🔥',
      title: `النتيجة: ${score} / 14`,
      message: 'ما شاء الله عليك! عندك خلفية طيبة عن لهجتنا، بس باقي لك شوية تمرين.'
    };
  } else if (score >= 3) {
    return {
      emoji: '😅',
      title: `النتيجة: ${score} / 14`,
      message: 'يبدو إنك سمعت بعض الكلمات بس ما تعمقت، جرب تعيش مع أهل القصيم أكثر.'
    };
  } else {
    return {
      emoji: '🤭',
      title: `النتيجة: ${score} / 14`,
      message: 'أبدًا ما هو قصيمي! لكن لا تشيل هم، تقدر تعيد الاختبار وتحسن نتيجتك!'
    };
  }
} 