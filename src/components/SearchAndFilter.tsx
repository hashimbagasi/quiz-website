import React from 'react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isDarkMode?: boolean;
}

const categories = ['الكل', 'لهجات', 'ذكاء', 'معلومات عامة', 'تحليل شخصية'];

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  isDarkMode = false
}) => {
  return (
    <div className="search-section" style={{
      background: isDarkMode ? '#2a2a2a' : 'white',
      padding: '40px 20px',
      borderRadius: '20px',
      marginBottom: '40px',
      boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(164,80,139,0.1)',
      border: isDarkMode ? '1px solid #333' : '1px solid #f0f0f0'
    }}>
      <div className="search-container">
        <h2 style={{ 
          marginBottom: '20px', 
          color: isDarkMode ? '#ffffff' : '#1A1A1A',
          textAlign: 'center',
          fontSize: '1.8rem',
          fontWeight: '600'
        }}>
          🔍 ابحث عن اختبار
        </h2>
        <input
          type="text"
          className="search-input"
          placeholder="اكتب اسم الاختبار أو الوصف..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            background: isDarkMode ? '#1a1a1a' : 'white',
            color: isDarkMode ? '#ffffff' : '#1A1A1A',
            borderColor: isDarkMode ? '#444' : '#E0E0E0'
          }}
        />
        
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
              style={{
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, #F72585, #7209B7)' 
                  : isDarkMode ? '#2a2a2a' : 'white',
                color: selectedCategory === category 
                  ? 'white' 
                  : isDarkMode ? '#cccccc' : '#666',
                borderColor: selectedCategory === category 
                  ? '#F72585' 
                  : isDarkMode ? '#444' : '#E0E0E0'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter; 