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
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'لهجات': return '🗣️';
      case 'ذكاء': return '🧠';
      case 'معلومات عامة': return '📚';
      case 'تحليل شخصية': return '🔮';
      default: return '🎯';
    }
  };

  return (
    <div className="search-filter-container optimized-layout">
      <div className="search-section optimized-search">
        <input
          type="text"
          placeholder="🔍 ابحث في الاختبارات..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input optimized-search-input optimized-text"
        />
      </div>
      
      <div className="filter-section optimized-filter">
        <div className="category-buttons optimized-layout">
          <button
            className={`category-btn optimized-filter-btn interactive-element${selectedCategory === 'الكل' ? ' active' : ''}`}
            onClick={() => onCategoryChange('الكل')}
          >
            🎯 الكل
          </button>
          {categories.slice(1).map((category) => (
            <button
              key={category}
              className={`category-btn optimized-filter-btn interactive-element${selectedCategory === category ? ' active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {getCategoryIcon(category)} {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter; 