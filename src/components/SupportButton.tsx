import React from 'react';
import '../styles/SupportButton.css';

const SupportButton: React.FC = () => {
  return (
    <a
      href="https://coff.ee/hashimbdev"
      target="_blank"
      rel="noopener noreferrer"
      className="support-btn"
      title="ادعمني على كوفي"
    >
      <span className="support-icon">☕</span>
      <span>ادعمني</span>
    </a>
  );
};

export default SupportButton; 