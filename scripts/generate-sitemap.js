const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, readFileSync } = require('fs');
const path = require('path');

// قراءة البيانات من ملفات JSON
const quizzes = JSON.parse(readFileSync(path.join(__dirname, 'quizzes.json')));
const blogPosts = JSON.parse(readFileSync(path.join(__dirname, 'blogPosts.json')));

const BASE_URL = 'https://quizksa.netlify.app';

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy-policy', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog', changefreq: 'weekly', priority: 0.8 },
];

// أضف روابط المقالات
blogPosts.forEach(post => {
  links.push({
    url: `/blog/${post.id}`,
    changefreq: 'monthly',
    priority: 0.7,
  });
});

// أضف روابط الاختبارات
quizzes.forEach(quiz => {
  links.push({
    url: `/quizzes/${quiz.id}`,
    changefreq: 'weekly',
    priority: 0.8,
  });
});

(async () => {
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  const writeStream = createWriteStream(path.join(__dirname, '../public/sitemap.xml'));
  sitemap.pipe(writeStream);

  links.forEach(link => sitemap.write(link));
  sitemap.end();

  await streamToPromise(sitemap);
  writeStream.end();
  console.log('✅ تم توليد ملف sitemap.xml بنجاح في مجلد public');
})(); 