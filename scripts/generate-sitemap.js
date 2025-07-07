// سكريبت توليد sitemap.xml بشكل نظيف ومرتب
const { writeFileSync } = require('fs');
const { create } = require('xmlbuilder2');

const BASE_URL = 'https://quizksa.netlify.app';

// عدل هنا لإضافة روابط جديدة
const links = [
  '/',
  '/about',
  '/contact',
  '/privacy-policy',
  '/blog',
  // أضف روابط اختباراتك أو صفحاتك هنا
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
console.log('✅ تم توليد ملف sitemap.xml بنجاح وبصيغة مرتبة في public/'); 