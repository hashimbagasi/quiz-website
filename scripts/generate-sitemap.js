// سكريبت توليد sitemap.xml بشكل نظيف ومرتب
const { writeFileSync } = require('fs');
const { create } = require('xmlbuilder2');

const BASE_URL = 'https://quizksa.netlify.app';

// أضف هنا جميع الروابط يدوياً
const links = [
  '/',
  '/about',
  '/contact',
  '/privacy-policy',
  '/blog',
  // روابط مقالات
  '/blog/mbti-16-types',
  '/blog/dialect-quizzes-popularity',
  '/blog/new-quiz-features',
  // روابط اختبارات
  '/quizzes/intelligence-quiz-1',
  '/quizzes/general-knowledge-1',
  '/quizzes/personality-quiz-1',
  '/quizzes/mbti',
];

const urlset = {
  urlset: {
    '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    url: links.map(url => ({
      loc: BASE_URL + url,
      changefreq: 'weekly',
      priority: url === '/' ? 1.0 : 0.7,
    }))
  }
};

const doc = create(urlset);
const xml = doc.end({ prettyPrint: true, headless: false });
writeFileSync('public/sitemap.xml', xml);
console.log('✅ تم توليد ملف sitemap.xml بجميع الروابط في public/'); 