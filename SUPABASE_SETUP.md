# إعداد Supabase للمشروع

## الخطوات المطلوبة لإعداد قاعدة البيانات

### 1. إنشاء مشروع في Supabase
1. اذهب إلى [supabase.com](https://supabase.com)
2. سجل دخول أو أنشئ حساب جديد
3. أنشئ مشروع جديد
4. احفظ URL المشروع ومفتاح anon

### 2. إنشاء الجداول في قاعدة البيانات

#### جدول التعليقات (comments)
```sql
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء فهرس للبحث السريع
CREATE INDEX idx_comments_quiz_id ON comments(quiz_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
```

#### جدول إحصائيات الاختبارات (quiz_stats)
```sql
CREATE TABLE quiz_stats (
  quiz_id TEXT PRIMARY KEY,
  completion_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_ratings INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء فهرس للبحث السريع
CREATE INDEX idx_quiz_stats_completion_count ON quiz_stats(completion_count DESC);
CREATE INDEX idx_quiz_stats_average_rating ON quiz_stats(average_rating DESC);
```

### 3. إعداد متغيرات البيئة
أنشئ ملف `.env` في مجلد المشروع وأضف:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. إعداد RLS (Row Level Security)
```sql
-- تفعيل RLS على جدول التعليقات
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- السماح بالقراءة للجميع
CREATE POLICY "Allow public read access" ON comments
  FOR SELECT USING (true);

-- السماح بالإدراج للجميع
CREATE POLICY "Allow public insert access" ON comments
  FOR INSERT WITH CHECK (true);

-- تفعيل RLS على جدول الإحصائيات
ALTER TABLE quiz_stats ENABLE ROW LEVEL SECURITY;

-- السماح بالقراءة للجميع
CREATE POLICY "Allow public read access" ON quiz_stats
  FOR SELECT USING (true);

-- السماح بالتحديث والإدراج للجميع
CREATE POLICY "Allow public upsert access" ON quiz_stats
  FOR ALL USING (true) WITH CHECK (true);
```

### 5. اختبار الاتصال
بعد إعداد كل شيء، يمكنك اختبار الاتصال بتشغيل المشروع:

```bash
npm start
```

## الميزات المضافة

### نظام التعليقات والتقييمات
- إضافة تعليقات وتقييمات للاختبارات
- عرض متوسط التقييمات
- عرض عدد التقييمات
- عرض عدد المكملين للاختبار

### إحصائيات الاختبارات
- تتبع عدد الأشخاص الذين أكملوا كل اختبار
- حساب متوسط التقييم لكل اختبار
- تحديث الإحصائيات تلقائياً

### واجهة مستخدم
- تصميم متجاوب
- نجوم تفاعلية للتقييم
- عرض التعليقات بتنسيق جميل
- إحصائيات مرئية

## ملاحظات مهمة
- تأكد من أن مشروع Supabase يعمل في المنطقة المناسبة
- احتفظ بمفاتيح API آمنة ولا تشاركها
- راجع إعدادات الأمان في Supabase 