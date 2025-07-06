import React from 'react';

const SupportButton: React.FC = () => {
  return (
    <a
      href="https://coff.ee/hashimbdev"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 2000,
        background: 'linear-gradient(135deg, #FFD700 0%, #F72585 100%)',
        color: '#fff',
        borderRadius: '32px',
        padding: '14px 28px',
        fontSize: '1.1rem',
        fontWeight: 700,
        boxShadow: '0 4px 24px rgba(247,37,133,0.18)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        transition: 'all 0.3s',
        cursor: 'pointer',
        border: 'none',
      }}
      title="ادعمني على كوفي"
    >
      <span style={{ fontSize: '1.5rem' }}>☕</span>
      <span>ادعمني</span>
    </a>
  );
};

export default SupportButton; 