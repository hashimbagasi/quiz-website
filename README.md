# موقع الاختبارات الترفيهية والثقافية 🧠

موقع تفاعلي للاختبارات المتنوعة باللغة العربية، يتضمن اختبارات الذكاء، المعلومات العامة، تحليل الشخصية، واختبارات اللهجات السعودية.

## ✨ الميزات الجديدة (مع Supabase)

### 🗨️ نظام التعليقات والتقييمات
- إضافة تعليقات وتقييمات للاختبارات
- نظام نجوم تفاعلي (1-5 نجوم)
- عرض متوسط التقييمات لكل اختبار
- عرض عدد التقييمات والمكملين

### 📊 إحصائيات تفاعلية
- تتبع عدد الأشخاص الذين أكملوا كل اختبار
- حساب متوسط التقييم لكل اختبار
- عرض أفضل الاختبارات تقييماً
- عرض أكثر الاختبارات إكمالاً

### 🏆 لوحة الإنجازات
- عرض أفضل 5 اختبارات تقييماً في الصفحة الرئيسية
- عرض أكثر 5 اختبارات إكمالاً
- تحديث الإحصائيات تلقائياً

## 🚀 الميزات الأساسية

### 📝 أنواع الاختبارات
- **اختبارات الذكاء**: ألغاز منطقية وتحديات ذهنية
- **معلومات عامة**: تاريخ، جغرافيا، علوم، ثقافة
- **تحليل الشخصية**: اختبارات MBTI وتحليل السمات
- **لهجات سعودية**: اختبارات اللهجات المحلية

### 🎯 تجربة المستخدم
- واجهة عربية كاملة
- تصميم متجاوب لجميع الأجهزة
- أنيميشن سلس وجذاب
- وضع ليلي/نهاري
- مشاركة النتائج بسهولة

### 🔍 البحث والتصفية
- بحث في عناوين ووصف الاختبارات
- تصفية حسب الفئة
- عرض الاختبارات المشابهة

## ��️ التقنيات المستخدمة

### Frontend
- **React 18** - مكتبة واجهة المستخدم
- **TypeScript** - لكتابة كود آمن ومنظم
- **CSS3** - تصميم متقدم ومتجاوب
- **React Router** - التنقل بين الصفحات

### Backend & Database
- **Supabase** - قاعدة بيانات PostgreSQL في السحابة
- **Real-time** - تحديثات فورية للتعليقات والإحصائيات
- **Row Level Security** - أمان متقدم للبيانات

## 📦 التثبيت والتشغيل

### المتطلبات
- Node.js (الإصدار 16 أو أحدث)
- npm أو yarn
- حساب Supabase

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/your-username/quiz-website.git
cd quiz-website
```

2. **تثبيت المكتبات**
```bash
npm install
```

3. **إعداد Supabase**
- اتبع دليل الإعداد في `SUPABASE_SETUP.md`
- أنشئ ملف `.env` وأضف مفاتيح Supabase

4. **تشغيل المشروع**
```bash
npm start
```

## 🗄️ إعداد قاعدة البيانات

### إنشاء الجداول في Supabase

#### جدول التعليقات
```sql
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### جدول الإحصائيات
```sql
CREATE TABLE quiz_stats (
  quiz_id TEXT PRIMARY KEY,
  completion_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_ratings INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 📱 الملفات الرئيسية

```
src/
├── components/
│   ├── CommentsSection.tsx    # مكون التعليقات والتقييمات
│   ├── TopRatedQuizzes.tsx    # أفضل الاختبارات تقييماً
│   ├── QuizPage.tsx          # صفحة الاختبار
│   └── HomePage.tsx          # الصفحة الرئيسية
├── services/
│   └── commentService.ts     # خدمة إدارة التعليقات
├── lib/
│   └── supabase.ts          # إعدادات Supabase
└── styles/
    ├── CommentsSection.css   # تصميم التعليقات
    └── TopRatedQuizzes.css   # تصميم أفضل الاختبارات
```

## 🎨 التصميم

### الألوان الرئيسية
- **الوردي**: `#F72585` - اللون الأساسي
- **البنفسجي**: `#7209B7` - اللون الثانوي
- **الأزرق**: `#667eea` - اللون التفاعلي
- **الأخضر**: `#28a745` - اللون النجاح

### التصميم المتجاوب
- **Desktop**: عرض كامل مع تأثيرات متقدمة
- **Tablet**: تخطيط متوسط مع تحسينات
- **Mobile**: تصميم محسن للشاشات الصغيرة

## 🔒 الأمان

### Supabase Security
- Row Level Security (RLS) مفعل
- سياسات أمان مخصصة
- حماية من SQL Injection
- مصادقة آمنة

### Frontend Security
- تحقق من المدخلات
- حماية من XSS
- تشفير البيانات الحساسة

## 📈 الأداء

### تحسينات التحميل
- Lazy Loading للمكونات
- تحسين الصور
- ضغط الملفات
- Cache Management

### قاعدة البيانات
- فهارس محسنة للبحث السريع
- استعلامات محسنة
- Real-time subscriptions

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى Branch (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف `LICENSE` للتفاصيل.

## 📞 الدعم

إذا واجهت أي مشاكل أو لديك اقتراحات:
- افتح Issue جديد
- تواصل معنا عبر البريد الإلكتروني
- راجع الوثائق في `SUPABASE_SETUP.md`

---

**تم تطوير هذا المشروع بحب ❤️ للمجتمع العربي**
