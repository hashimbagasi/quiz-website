import React from 'react';

const AdsensePlaceholder: React.FC<{ height?: number }> = ({ height = 90 }) => (
  <div
    style={{
      width: '100%',
      minHeight: height,
      background: '#f1f1f1',
      border: '2px dashed #bbb',
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      fontSize: '1.2rem',
      margin: '32px 0',
      textAlign: 'center',
      fontWeight: 600,
      letterSpacing: 1
    }}
    aria-label="مساحة إعلان"
  >
    {/* Adsense Placeholder - استبدل هذا الكود بكود أدسنس عند القبول */}
    مساحة إعلان
  </div>
);

export default AdsensePlaceholder; 