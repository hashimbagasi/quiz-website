import React from 'react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ['الكل', 'لهجات', 'ذكاء', 'معلومات عامة', 'تحليل شخصية'];

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="search-section">
      <div className="search-container">
        <h2 style={{ marginBottom: '20px', color: '#1A1A1A' }}>ابحث عن اختبار</h2>
        <input
          type="text"
          className="search-input"
          placeholder="اكتب اسم الاختبار أو الوصف..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
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