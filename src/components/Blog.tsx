import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts, getBlogPost, getLatestPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // إذا كان هناك ID، اعرض المقالة المحددة
  if (id) {
    const post = getBlogPost(id);
    if (!post) {
      return (
        <div className="container" style={{ maxWidth: 800, margin: '40px auto', textAlign: 'center' }}>
          <h1 style={{ color: '#F72585' }}>المقالة غير موجودة</h1>
          <Link to="/blog" style={{ color: '#F72585', textDecoration: 'none' }}>← العودة للمدونة</Link>
        </div>
      );
    }

    return (
      <div className="container" style={{ maxWidth: 800, margin: '40px auto', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <Link to="/blog" style={{ color: '#F72585', textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>
          ← العودة للمدونة
        </Link>
        
        <article>
          <header style={{ marginBottom: 24 }}>
            <h1 style={{ color: '#1A1A1A', fontSize: '2rem', marginBottom: 12, lineHeight: 1.3 }}>
              {post.title}
            </h1>
            <div style={{ color: '#666', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span>📅 {new Date(post.date).toLocaleDateString('ar-SA')}</span>
              <span>•</span>
              <span>⏱️ {post.readTime}</span>
              <span>•</span>
              <span>📂 {post.category}</span>
            </div>
            <div style={{ marginTop: 12 }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  background: '#f0f0f0',
                  color: '#666',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  marginRight: '8px'
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          <div style={{ 
            textAlign: 'center', 
            marginTop: '32px',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '12px'
          }}>
            <p style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#666' }}>
              جرب اختباراتنا الآن!
            </p>
            <Link 
              to="/" 
              style={{
                background: 'linear-gradient(135deg, #F72585, #7209B7)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              🧠 ابدأ الاختبارات
            </Link>
          </div>
        </article>
      </div>
    );
  }

  // عرض قائمة المقالات
  const latestPosts = getLatestPosts();

  return (
    <div className="container" style={{ maxWidth: 800, margin: '40px auto', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
      <h1 style={{ color: '#F72585', marginBottom: 24, textAlign: 'center' }}>المدونة</h1>
      
      {latestPosts.map(post => (
        <article key={post.id} style={{ 
          marginBottom: 40, 
          borderBottom: '2px solid #f0f0f0', 
          paddingBottom: 30,
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <header style={{ marginBottom: 16 }}>
            <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 style={{ 
                color: '#1A1A1A', 
                fontSize: '1.5rem', 
                marginBottom: 12, 
                lineHeight: 1.3,
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#F72585'}
              onMouseOut={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                {post.title}
              </h2>
            </Link>
            <div style={{ color: '#666', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              <span>📅 {new Date(post.date).toLocaleDateString('ar-SA')}</span>
              <span>•</span>
              <span>⏱️ {post.readTime}</span>
              <span>•</span>
              <span>📂 {post.category}</span>
              {post.featured && <span style={{ color: '#F72585', fontWeight: 'bold' }}>⭐ مميز</span>}
            </div>
            <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 16 }}>
              {post.excerpt}
            </p>
            <div style={{ marginBottom: 16 }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  background: '#f0f0f0',
                  color: '#666',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  marginRight: '8px'
                }}>
                  #{tag}
                </span>
              ))}
            </div>
            <Link 
              to={`/blog/${post.id}`}
              style={{
                background: 'linear-gradient(135deg, #F72585, #7209B7)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'inline-block',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              اقرأ المزيد →
            </Link>
          </header>
        </article>
      ))}

      <div style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>
        <p>المزيد من المقالات قريباً... 📚</p>
      </div>
    </div>
  );
};

export default Blog; 