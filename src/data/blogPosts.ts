export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'mbti-16-types',
    title: 'وش سالفة الشخصيات الـ16؟ وهل فعلاً تطابقك؟',
    excerpt: 'تعرف على سر متعة اختبارات الشخصية ولماذا نكررها حتى لو ما نصدق النتائج!',
    content: `
      <div style="line-height: 1.8; color: #333; font-size: 1.1rem;">
        <div style="background: linear-gradient(135deg, #F72585, #7209B7); color: white; padding: 20px; border-radius: 12px; margin-bottom: 24px; font-size: 1.2rem; font-weight: 600;">
          📝 بداية السالفة
        </div>
        <p style="margin-bottom: 20px;">
          أكيد قد شفت أحد يقول لك "أنا ENFP"، أو "طلع لي INTJ في اختبار الشخصية"... ويمكن حتى سويت الاختبار بنفسك وقلت: "وش ذا؟ كود سري ولا تحليل نفسي؟" 😂<br/>
          هذا هو اختبار MBTI أو "تحليل الشخصيات الـ16"، واحد من أشهر الاختبارات النفسية حول العالم.
        </p>

        <div style="background: #f8f9fa; border-left: 4px solid #F72585; padding: 20px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
          <h3 style="color: #F72585; margin-bottom: 12px; font-size: 1.3rem;">💡 كيف يشتغل الاختبار؟</h3>
          <p style="margin: 0;">
            الاختبار يقسم الناس إلى 4 أبعاد رئيسية:
          </p>
          <table style="width:100%; margin: 16px 0; border-collapse: collapse;">
            <tr style="background:#f1f1f1;"><th style="padding:8px; border:1px solid #eee;">البُعد</th><th style="padding:8px; border:1px solid #eee;">الخيارات</th></tr>
            <tr><td style="padding:8px; border:1px solid #eee;">كيف تتعامل مع الناس</td><td style="padding:8px; border:1px solid #eee;">انطوائي (I) أو اجتماعي (E)</td></tr>
            <tr><td style="padding:8px; border:1px solid #eee;">كيف تاخذ المعلومات</td><td style="padding:8px; border:1px solid #eee;">حسي (S) أو حدسي (N)</td></tr>
            <tr><td style="padding:8px; border:1px solid #eee;">كيف تتخذ قراراتك</td><td style="padding:8px; border:1px solid #eee;">منطقي (T) أو عاطفي (F)</td></tr>
            <tr><td style="padding:8px; border:1px solid #eee;">كيف تعيش حياتك</td><td style="padding:8px; border:1px solid #eee;">منظم (J) أو مرن (P)</td></tr>
          </table>
          <p style="margin: 0;">
            لما تجمع الأحرف، يطلع لك شخصيتك، مثل:
            <br/>
            <strong>INFP:</strong> الحالم<br/>
            <strong>ESTJ:</strong> القائد العملي<br/>
            <strong>ENTP:</strong> المفكر العفوي<br/>
            <strong>ISTJ:</strong> الجاد المنظم
          </p>
        </div>

        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #856404; margin-bottom: 12px; font-size: 1.3rem;">🤔 هل هو دقيق فعلًا؟</h3>
          <p style="margin: 0;">
            هو مو تحليل نفسي عميق معتمد أكاديميًا، لكنه يعطيك نظرة عامة على طريقة تفكيرك وتعاطيك مع الناس.<br/>
            الكثير من الناس يشوفون النتيجة ويقولون: "ياخي هذا أنا فعلاً!"<br/>
            والبعض يحس إن النتيجة ما تمثّله، خصوصًا إذا جاوب بسرعة أو ما كان مركز.
          </p>
        </div>

        <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #0c5460; margin-bottom: 12px; font-size: 1.3rem;">👥 وين المتعة فيه؟</h3>
          <ul style="margin: 0; padding-right: 20px;">
            <li style="margin-bottom: 8px;">تحس إنك فهمت نفسك أكثر</li>
            <li style="margin-bottom: 8px;">تقدر تقارن نتيجتك مع أصحابك وتعرف "ليش ما نتفاهم؟"</li>
            <li style="margin-bottom: 8px;">يفتح مواضيع ونقاشات لطيفة في القهوة أو القروب 😂</li>
          </ul>
        </div>

        <div style="background: #f8f9fa; border-left: 4px solid #F72585; padding: 20px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
          <h3 style="color: #F72585; margin-bottom: 12px; font-size: 1.3rem;">📌 مثال شخصيتين متعاكستين:</h3>
          <p style="margin: 0;">
            <strong>INFJ:</strong> يحب العمق والهدوء والتخطيط<br/>
            <strong>ESTP:</strong> يحب المغامرة، سريع، ما يحب الروتين<br/>
            هات الاثنين ذولا في فريق واحد… وعيش التحدي 😅
          </p>
        </div>

        <div style="background: linear-gradient(135deg, #F72585, #7209B7); color: white; padding: 20px; margin-bottom: 24px; border-radius: 12px;">
          <h3 style="margin-bottom: 12px; font-size: 1.3rem;">💬 رأينا في QuizKSA</h3>
          <p style="margin: 0;">
            نحن نشوف إن الاختبارات هذي ممتعة، خصوصًا لو صيغناها بطابع محلي وسهل، وخلينا النتايج توصفك بطريقة فيها دعابة.<br/>
            سواء كنت محلل صامت أو قائد مغامر، الأهم إنك تستمتع وتفهم نفسك شوي أكثر.
          </p>
        </div>

        <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #155724; margin-bottom: 12px; font-size: 1.3rem;">🧠 جرب بنفسك</h3>
          <p style="margin: 0;">
            وش تنتظر؟<br/>
            جرب الاختبار، وخلنا نشوف من أنت من بين الشخصيات الـ16.<br/>
            بس لا تنسى تشارك النتيجة مع أصحابك… خصوصًا لو طلعت ENTP، لأنهم يحبون الكلام 😎
          </p>
        </div>
      </div>
    `,
    date: '2024-06-09',
    readTime: '3 دقائق',
    category: 'اختبارات شخصية',
    tags: ['شخصية', 'ترفيه', 'سوشال ميديا', 'تفاعل'],
    featured: true
  },
  {
    id: 'dialect-quizzes-popularity',
    title: '📝 وش سالفة اختبارات اللهجة؟ وليه صارت منتشرة؟',
    excerpt: 'تعرف على سبب انتشار اختبارات اللهجة وكيف أصبحت ظاهرة اجتماعية ممتعة في السعودية',
    content: `
      <div style="line-height: 1.8; color: #333; font-size: 1.1rem;">
        <div style="background: linear-gradient(135deg, #F72585, #7209B7); color: white; padding: 20px; border-radius: 12px; margin-bottom: 24px; font-size: 1.2rem; font-weight: 600;">
          📌 المقدمة
        </div>
        
        <p style="margin-bottom: 20px;">
          في الفترة الأخيرة، انتشرت اختبارات اللهجة بشكل كبير، وصارت الناس تشارك نتائجها على تويتر وسناب بكل حماس. بس وش سالفة هالاختبارات؟ وليه صارت ممتعة لهالدرجة؟
        </p>

        <div style="background: #f8f9fa; border-left: 4px solid #F72585; padding: 20px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
          <h3 style="color: #F72585; margin-bottom: 12px; font-size: 1.3rem;">💬 اللهجة = هوية</h3>
          <p style="margin: 0;">
            اللهجة مو بس طريقة كلام، هي جزء من هوية الشخص. ولهجات السعودية متنوعة بشكل كبير، من نجد للحجاز، للجنوب، للشرقية… وكل منطقة فيها كلمات خاصة وأسلوب مميز.
          </p>
        </div>

        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #856404; margin-bottom: 12px; font-size: 1.3rem;">🤓 ليه الاختبارات ممتعة؟</h3>
          <p style="margin: 0;">
            الناس تحب تختبر نفسها، وتحب تعرف "هل أنا أعرف كل كلمات منطقتي؟"، أو "هل أقدر أفهم لهجة أهل الجنوب؟"، وهنا تجي المتعة. الاختبارات تخليك تضحك، تتفاجأ، وتتعلم شي جديد عن لهجتك أو لهجات غيرك.
          </p>
        </div>

        <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #0c5460; margin-bottom: 12px; font-size: 1.3rem;">📲 المشاركة تزيد التفاعل</h3>
          <p style="margin: 0;">
            أغلب الاختبارات فيها زر مشاركة، وذي حركة ذكية. لما تشارك نتيجتك، أصحابك يدخلون يجربون بعد، وكل واحد يحاول يثبت إنه يعرف أكثر، وهنا يبدأ التحدي والتفاعل.
          </p>
        </div>

        <div style="background: linear-gradient(135deg, #F72585, #7209B7); color: white; padding: 20px; margin-bottom: 24px; border-radius: 12px;">
          <h3 style="margin-bottom: 12px; font-size: 1.3rem;">🔥 اختبارات QuizKSA: تجربة بطابع محلي</h3>
          <p style="margin: 0;">
            في موقع QuizKSA، ركزنا على تقديم اختبارات بلهجتنا السعودية، عشان نكون قريبين من الناس فعلاً. مو بس لهجات، حتى اختبارات الذكاء والشخصية بطابع محلي وخفيف دم.
          </p>
        </div>

        <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #155724; margin-bottom: 12px; font-size: 1.3rem;">💡 الختام</h3>
          <p style="margin: 0;">
            اختبارات اللهجة ما هي بس لعبة، هي وسيلة ممتعة نحافظ فيها على لهجتنا ونضحك مع بعض.
            <br />
            <strong>جرب تختبر نفسك، وتحدّى أصحابك… وشوف من فيكم "أبخص" 😄</strong>
          </p>
        </div>
      </div>
    `,
    date: '2024-01-15',
    readTime: '3 دقائق',
    category: 'اختبارات',
    tags: ['لهجة', 'سعودية', 'ترفيه', 'تفاعل'],
    featured: true
  },
  {
    id: 'new-quiz-features',
    title: '🚀 المميزات الجديدة في اختبارات KSA',
    excerpt: 'اكتشف أحدث التحديثات والمميزات التي أضفناها لتحسين تجربة الاختبارات',
    content: `
      <div style="line-height: 1.8; color: #333; font-size: 1.1rem;">
        <div style="background: linear-gradient(135deg, #F72585, #7209B7); color: white; padding: 20px; border-radius: 12px; margin-bottom: 24px; font-size: 1.2rem; font-weight: 600;">
          🎯 ما الجديد؟
        </div>
        
        <p style="margin-bottom: 20px;">
          نعمل باستمرار على تحسين موقع QuizKSA وإضافة مميزات جديدة تجعل تجربتك أكثر متعة وتفاعلاً.
        </p>

        <div style="background: #f8f9fa; border-left: 4px solid #F72585; padding: 20px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
          <h3 style="color: #F72585; margin-bottom: 12px; font-size: 1.3rem;">📱 تصميم متجاوب محسن</h3>
          <p style="margin: 0;">
            حسّنا التصميم ليعمل بشكل مثالي على جميع الأجهزة - من الهواتف للتابلت للكمبيوتر.
          </p>
        </div>

        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #856404; margin-bottom: 12px; font-size: 1.3rem;">⚡ سرعة محسنة</h3>
          <p style="margin: 0;">
            الاختبارات الآن أسرع في التحميل وأكثر سلاسة في الاستخدام.
          </p>
        </div>

        <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #0c5460; margin-bottom: 12px; font-size: 1.3rem;">🎨 أنيميشن جميل</h3>
          <p style="margin: 0;">
            أضفنا تأثيرات بصرية جميلة تجعل التفاعل مع الاختبارات أكثر متعة.
          </p>
        </div>
      </div>
    `,
    date: '2024-01-10',
    readTime: '2 دقائق',
    category: 'تحديثات',
    tags: ['مميزات', 'تصميم', 'سرعة', 'أنيميشن']
  },
  {
    id: 'intelligence-test-guide',
    title: '🧠 هل تقدر تختبر ذكاءك من خلال 5 أسئلة بس؟',
    excerpt: 'تعرف على حقيقة اختبارات الذكاء الترفيهية وكيف تقدر تفيدك في تطوير مهاراتك',
    content: `
      <div style="line-height: 1.8; color: #333; font-size: 1.1rem;">
        <div style="background: linear-gradient(135deg, #F72585, #7209B7); color: white; padding: 20px; border-radius: 12px; margin-bottom: 24px; font-size: 1.2rem; font-weight: 600;">
          🤔 هل فعلاً فيه "اختبار ذكاء" حقيقي؟
        </div>
        
        <p style="margin-bottom: 20px;">
          كثير من الناس يربطون الذكاء بالرياضيات أو سرعة الحل، بس الواقع إن الذكاء له أنواع كثيرة:
        </p>

        <div style="background: #f8f9fa; border-left: 4px solid #F72585; padding: 20px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
          <h3 style="color: #F72585; margin-bottom: 12px; font-size: 1.3rem;">🧩 أنواع الذكاء</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;"><strong>ذكاء منطقي:</strong> حل المشكلات والتحليل</li>
            <li style="margin-bottom: 8px;"><strong>ذكاء لغوي:</strong> فهم واستخدام اللغة</li>
            <li style="margin-bottom: 8px;"><strong>ذكاء اجتماعي:</strong> فهم الآخرين والتواصل</li>
            <li style="margin-bottom: 8px;"><strong>ذكاء عاطفي:</strong> فهم وإدارة المشاعر</li>
          </ul>
        </div>

        <p style="margin-bottom: 20px;">
          الاختبارات الترفيهية ما تعطيك نتيجة علمية دقيقة، لكنها تقدر تعطيك "نظرة عامة" على طريقة تفكيرك، أو كيف تتعامل مع المواقف.
        </p>

        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #856404; margin-bottom: 12px; font-size: 1.3rem;">🎯 وش فائدة اختبارات الذكاء الترفيهية؟</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">تحرك مخك شوي، وتخليك تفكر بطرق مختلفة</li>
            <li style="margin-bottom: 8px;">تعرف أسلوبك في حل المشكلات</li>
            <li style="margin-bottom: 8px;">تتحمس لما تشوف النتيجة وتحاول تحسّنها وتعيد المحاولة</li>
          </ul>
          <p style="margin: 8px 0 0 0; font-style: italic; color: #856404;">
            يعني هي مو اختبار قبول جامعي 😂، لكنها ممتعة وتكشف أشياء عنك فعلاً.
          </p>
        </div>

        <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #0c5460; margin-bottom: 12px; font-size: 1.3rem;">📊 وش يميز اختبار الذكاء في موقع QuizKSA؟</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;"><strong>قصير وخفيف:</strong> 5 أسئلة فقط، مو ممل</li>
            <li style="margin-bottom: 8px;"><strong>فيه تحدي فعلي:</strong> مو بس أسئلة عشوائية</li>
            <li style="margin-bottom: 8px;"><strong>نتيجة ذكية:</strong> يعطيك تعليق يناسب مستواك، سواء كنت عبقري أو محتاج كاسة شاهي وتركّز 😅</li>
          </ul>
        </div>

        <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #155724; margin-bottom: 12px; font-size: 1.3rem;">👨‍👩‍👧‍👦 اختبارك، بس ممتع أكثر مع أصحابك</h3>
          <p style="margin: 0;">
            شارك نتيجتك بعد الاختبار، وشوف أصحابك كم جابوا. التحدي الحقيقي يبدأ لما تبدأ المقارنات والتطنّز 😂
          </p>
        </div>

        <div style="background: linear-gradient(135deg, #F72585, #7209B7); color: white; padding: 20px; margin-bottom: 24px; border-radius: 12px;">
          <h3 style="margin-bottom: 12px; font-size: 1.3rem;">💬 الختام</h3>
          <p style="margin: 0;">
            ذكاءك مو رقم، ولا نتيجة اختبار… بس إذا قدرت تجيب نتيجة حلوة، فهذا دليل إنك مركز وتفكيرك نظيف.
            <br />
            <strong>جرب الاختبار، وخلنا نشوف وين توصل! 😉</strong>
          </p>
        </div>
      </div>
    `,
    date: '2024-01-20',
    readTime: '4 دقائق',
    category: 'اختبارات',
    tags: ['ذكاء', 'اختبارات', 'ترفيه', 'تطوير'],
    featured: true
  },
  {
    id: 'why-we-love-personality-quizzes',
    title: '📝 ليش نحب اختبارات الشخصية حتى لو ما نصدقها؟',
    excerpt: 'تعرف على سر متعة اختبارات الشخصية ولماذا نكررها حتى لو ما نصدق النتائج!',
    content: `
      <div style="line-height: 1.8; color: #333; font-size: 1.1rem;">
        <div style="background: linear-gradient(135deg, #F72585, #7209B7); color: white; padding: 20px; border-radius: 12px; margin-bottom: 24px; font-size: 1.2rem; font-weight: 600;">
          😄 الموضوع مو جدّي… بس ممتع!
        </div>
        <p style="margin-bottom: 20px;">
          كثير من الناس يضحكون لما يقول أحدهم "أنا طلع لي شخصيتي مثل شخصية فلان!" في اختبار، ويقولون: "ترى كله كذب"، لكن الغريب؟ يرجعون يسوون اختبار ثاني، وثالث… ورابع.
        </p>
        <p style="margin-bottom: 20px;">
          ليش؟ لأن الفكرة ممتعة.
        </p>
        <div style="background: #f8f9fa; border-left: 4px solid #F72585; padding: 20px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
          <h3 style="color: #F72585; margin-bottom: 12px; font-size: 1.3rem;">🧠 عقولنا تحب تعرف عن نفسها</h3>
          <p style="margin: 0;">
            حتى لو الاختبار ترفيهي، العقل البشري يحب يستكشف "من أنا؟"، ويحب يشوف نفسه من زاوية جديدة.<br />
            لما تطلع لك نتيجة تقول إنك "الهادئ اللي يفكر قبل لا يتكلم"، يمكن تنبسط وتقول "فعلاً هذا أنا!"… أو تضحك لأنك العكس تمامًا 😅
          </p>
        </div>
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #856404; margin-bottom: 12px; font-size: 1.3rem;">🔁 التجربة سريعة… وممكن تتكرر</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">قصيرة وسريعة</li>
            <li style="margin-bottom: 8px;">ما تحتاج تفكير عميق</li>
            <li style="margin-bottom: 8px;">فيها نوع من الترفيه النفسي</li>
          </ul>
          <p style="margin: 8px 0 0 0;">
            يعني تسويها وأنت طفشان، وأحياناً تشاركها مع أصحابك، وتشوف ردة فعلهم.
          </p>
        </div>
        <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #0c5460; margin-bottom: 12px; font-size: 1.3rem;">📱 السوشال ميديا زادت انتشارها</h3>
          <p style="margin: 0;">
            كل ما كان في زر "شارك نتيجتك"، الناس تنجذب أكثر.<br />
            الناس تحب تطلع صورة أو نتيجة ملونة وتقول: "شوفوا، طلع لي إني شخصية قيادية!"<br />
            حتى لو ما صدّقوا النتيجة، تظل وسيلة للتفاعل والمزح.
          </p>
        </div>
        <div style="background: linear-gradient(135deg, #F72585, #7209B7); color: white; padding: 20px; margin-bottom: 24px; border-radius: 12px;">
          <h3 style="margin-bottom: 12px; font-size: 1.3rem;">✨ وش نسوي في QuizKSA؟</h3>
          <p style="margin: 0;">
            في موقع QuizKSA نحاول نختار لك اختبارات شخصية تخليك تضحك، وتفكر، وأحياناً تقول "ياخي هذولي يعرفوني!"<br />
            الهدف مو علمي، بل ترفيهي… بس بطريقة ممتعة وتخصنا كسعوديين ولهجتنا.
          </p>
        </div>
        <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; margin-bottom: 24px; border-radius: 8px;">
          <h3 style="color: #155724; margin-bottom: 12px; font-size: 1.3rem;">💡 الخلاصة</h3>
          <p style="margin: 0;">
            اختبارات الشخصية يمكن ما تكون دقيقة، لكنها ممتعة، سهلة، وتفتح مجال للحوار والمقارنة بينك وبين أصحابك.<br />
            <strong>جرب تختبر شخصيتك معنا… يمكن تكتشف شي جديد فيك 😉</strong>
          </p>
        </div>
      </div>
    `,
    date: '2024-01-22',
    readTime: '3 دقائق',
    category: 'اختبارات شخصية',
    tags: ['شخصية', 'ترفيه', 'سوشال ميديا', 'تفاعل'],
    featured: false
  }
];

// دالة للحصول على مقالة محددة
export const getBlogPost = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

// دالة للحصول على المقالات المميزة
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

// دالة للحصول على أحدث المقالات
export const getLatestPosts = (limit: number = 5): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}; 