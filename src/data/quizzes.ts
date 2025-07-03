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
  personalityType?: string; // لاختبارات تحليل الشخصية
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
    id: 'dialect-quiz-1',
    title: 'اختبار اللهجات العربية',
    description: 'اكتشف مدى معرفتك بلهجات الدول العربية المختلفة',
    category: 'لهجات',
    image: '🗣️',
    popularity: 1250,
    questions: [
      {
        id: 'q1',
        text: 'ما معنى كلمة "شلونك" في اللهجة العراقية؟',
        options: ['كيف حالك', 'أين أنت', 'متى ستأتي', 'ما اسمك'],
        correctAnswer: 0
      },
      {
        id: 'q2',
        text: 'كلمة "يالا" تستخدم في اللهجة المصرية لتعني:',
        options: ['تعال', 'اذهب', 'انتظر', 'اسكت'],
        correctAnswer: 0
      },
      {
        id: 'q3',
        text: 'ما معنى "مشوار" في اللهجة الخليجية؟',
        options: ['رحلة قصيرة', 'طريق طويل', 'سيارة', 'مطعم'],
        correctAnswer: 0
      },
      {
        id: 'q4',
        text: 'كلمة "شو" في اللهجة الشامية تعني:',
        options: ['ماذا', 'أين', 'متى', 'كيف'],
        correctAnswer: 0
      },
      {
        id: 'q5',
        text: 'ما معنى "بس" في اللهجة المصرية؟',
        options: ['فقط', 'لكن', 'أيضاً', 'أبداً'],
        correctAnswer: 0
      }
    ]
  },
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
    title: 'تحليل شخصيتك',
    description: 'اكتشف نوع شخصيتك من خلال إجاباتك على هذه الأسئلة',
    category: 'تحليل شخصية',
    image: '🎭',
    popularity: 3200,
    questions: [
      {
        id: 'q1',
        text: 'في الحفلات، هل تفضل:',
        options: ['التحدث مع أكبر عدد من الناس', 'قضاء الوقت مع أصدقاء مقربين', 'الجلوس في زاوية هادئة', 'تنظيم الأنشطة'],
        personalityType: 'extrovert'
      },
      {
        id: 'q2',
        text: 'عند مواجهة مشكلة، هل:',
        options: ['تحلل الموقف بعمق', 'تتصرف بسرعة', 'تستشير الآخرين', 'تتجنب المشكلة'],
        personalityType: 'analytical'
      },
      {
        id: 'q3',
        text: 'في العمل، هل تفضل:',
        options: ['العمل في فريق', 'العمل بمفردك', 'قيادة الفريق', 'التعاون مع شريك واحد'],
        personalityType: 'team-player'
      },
      {
        id: 'q4',
        text: 'في أوقات الفراغ، هل تفضل:',
        options: ['قراءة كتاب', 'ممارسة الرياضة', 'التسوق', 'السفر'],
        personalityType: 'intellectual'
      },
      {
        id: 'q5',
        text: 'عند اتخاذ قرار مهم، هل تعتمد على:',
        options: ['المنطق والعقل', 'المشاعر والحدس', 'نصيحة الآخرين', 'الخبرة السابقة'],
        personalityType: 'logical'
      }
    ]
  },
  {
    id: 'dialect-quiz-2',
    title: 'لهجات الخليج العربي',
    description: 'تعرف على لهجات دول الخليج واختلافاتها',
    category: 'لهجات',
    image: '🏖️',
    popularity: 950,
    questions: [
      {
        id: 'q1',
        text: 'ما معنى "هلا" في اللهجة الكويتية؟',
        options: ['مرحباً', 'أهلاً وسهلاً', 'كيف حالك', 'أين أنت'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: 'كلمة "شلون" في اللهجة الإماراتية تعني:',
        options: ['كيف', 'أين', 'متى', 'لماذا'],
        correctAnswer: 0
      },
      {
        id: 'q3',
        text: 'ما معنى "ياليل" في اللهجة السعودية؟',
        options: ['يا ليل', 'يا عزيزي', 'يا صديقي', 'يا أخي'],
        correctAnswer: 1
      },
      {
        id: 'q4',
        text: 'كلمة "وين" في اللهجة القطرية تعني:',
        options: ['أين', 'متى', 'كيف', 'لماذا'],
        correctAnswer: 0
      },
      {
        id: 'q5',
        text: 'ما معنى "عسى" في اللهجة البحرينية؟',
        options: ['ربما', 'أتمنى', 'أعتقد', 'أعرف'],
        correctAnswer: 1
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
    description: 'اختبر معرفتك بكلمات وعبارات أهل نجد، وشوف كم أنت نجدي أصيل!',
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
    id: 'qassim-dialect-quiz',
    title: 'اختبار اللهجة القصيمية',
    description: 'اختبر معرفتك بكلمات ومعاني اللهجة القصيمية الأصيلة!',
    category: 'لهجات',
    image: '🌾',
    popularity: 0,
    questions: [
      {
        id: 'q1',
        text: '"تهقى" وش تعني؟',
        options: ['تظن', 'ترمي', 'تحتسي القهوة', 'تحمل'],
        correctAnswer: 0
      },
      {
        id: 'q2',
        text: '"فاردز" وش معناها؟',
        options: ['ارحل', 'تفضل', 'ارسل', 'شارك'],
        correctAnswer: 0
      },
      {
        id: 'q3',
        text: '"مصع" يعني:',
        options: ['يصنع بمهارة', 'يهدد بالموضوع', 'بالغ بالأمر', 'يشد بقوة'],
        correctAnswer: 3
      },
      {
        id: 'q4',
        text: '"هماه" تعني:',
        options: ['جلب لي الهم', 'أليس كذلك؟', 'همة ذلك الشخص', 'ملك له'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        text: '"احترين":',
        options: ['كاد يحترق', 'انتظرني', 'شعروا بالحر', 'يتساءلون'],
        correctAnswer: 1
      },
      {
        id: 'q6',
        text: '"قمبازي":',
        options: ['مخادع', 'الصحن المقعر', 'اذهب', 'كثير الحركة'],
        correctAnswer: 0
      },
      {
        id: 'q7',
        text: '"يتطنز":',
        options: ['يستهزئ', 'يتحمل', 'يطهو', 'يتماطل'],
        correctAnswer: 0
      },
      {
        id: 'q8',
        text: '"أزمل":',
        options: ['أكثر جمالًا', 'أستعد للرحيل', 'أثقل', 'أخاف من عواقب أمر ما'],
        correctAnswer: 3
      },
      {
        id: 'q9',
        text: '"وراه؟":',
        options: ['كيف حالك؟', 'أين؟', 'لماذا؟', 'متى؟'],
        correctAnswer: 2
      },
      {
        id: 'q10',
        text: '"يتنيذخ":',
        options: ['يستغبي', 'يبخل', 'يتفاخر', 'يرتجف'],
        correctAnswer: 2
      },
      {
        id: 'q11',
        text: '"أغولك":',
        options: ['أعينك', 'أخبرك', 'أخنقك', 'أضيفك'],
        correctAnswer: 2
      },
      {
        id: 'q12',
        text: '"نطل":',
        options: ['يطلع', 'قفز', 'سرق', 'رحل'],
        correctAnswer: 2
      },
      {
        id: 'q13',
        text: '"مصنقه":',
        options: ['ساكنة', 'وسخة', 'مصدقة', 'مصرة على أمر ما'],
        correctAnswer: 1
      },
      {
        id: 'q14',
        text: '"عيا":',
        options: ['شهد', 'رفع صوته أو صرخ', 'رفض', 'عاش'],
        correctAnswer: 2
      },
      {
        id: 'q15',
        text: '"مطاريس":',
        options: ['لوصف أمر بالعشوائية', 'أشغال ومهام', 'كتب كثيرة', 'لوصف مجموعة أشخاص بالسذاجة'],
        correctAnswer: 0
      }
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