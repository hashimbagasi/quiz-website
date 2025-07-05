const fs = require('fs');
const path = require('path');

// استيراد البيانات من ملفات TypeScript عبر require مع ts-node
require('ts-node').register();
const { quizzes } = require('../src/data/quizzes');
const { blogPosts } = require('../src/data/blogPosts');

fs.writeFileSync(path.join(__dirname, 'quizzes.json'), JSON.stringify(quizzes, null, 2));
fs.writeFileSync(path.join(__dirname, 'blogPosts.json'), JSON.stringify(blogPosts, null, 2));

console.log('✅ تم تصدير البيانات إلى quizzes.json و blogPosts.json'); 