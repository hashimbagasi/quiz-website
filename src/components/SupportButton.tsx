import React from 'react';
import '../styles/SupportButton.css';

const SupportButton: React.FC = () => {
  return (
    <a
      href="https://coff.ee/hashimbdev"
      target="_blank"
      rel="noopener noreferrer"
      className="support-button optimized-button interactive-element hover-lift"
      title="ادعمني على كوفي"
    >
      <span className="coffee-icon">☕</span>
      <span className="support-text">ادعمني</span>
    </a>
  );
};

export default SupportButton; 