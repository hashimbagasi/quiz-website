import React from 'react';
import '../styles/SearchAndFilter.css';

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
    <div className="search-section">
      <div className="search-container">
        <h2 className="search-title">
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