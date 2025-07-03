import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:hashimbdev@gmail.com?subject=رسالة من ${encodeURIComponent(name)}&body=البريد: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
      <h1 style={{ color: '#F72585', marginBottom: 24 }}>تواصل معنا</h1>
      {sent ? (
        <div style={{ color: '#43a047', fontWeight: 700, fontSize: '1.2rem', textAlign: 'center', margin: '40px 0' }}>
          ✅ تم فتح برنامج البريد لإرسال رسالتك. إذا لم يُفتح البريد تلقائيًا، يمكنك نسخ البريد: <b>hashimbdev@gmail.com</b>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <label>
            الاسم
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc', marginTop: 6 }} />
          </label>
          <label>
            البريد الإلكتروني
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc', marginTop: 6 }} />
          </label>
          <label>
            الرسالة
            <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={5} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc', marginTop: 6 }} />
          </label>
          <button type="submit" className="btn btn-primary" style={{ marginTop: 10 }}>إرسال</button>
        </form>
      )}
    </div>
  );
};

export default Contact; 