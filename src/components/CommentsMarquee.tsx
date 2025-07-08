import React, { useRef, useEffect } from 'react';
import { Comment } from '../lib/supabase';
import '../styles/CommentsMarquee.css';

interface CommentsMarqueeProps {
  comments: Comment[];
}

const AUTO_SCROLL_INTERVAL = 3500;

const CommentsMarquee: React.FC<CommentsMarqueeProps> = ({ comments }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const cachedWidth = useRef(0);

  // Auto scroll with performance optimization
  useEffect(() => {
    if (!sliderRef.current || comments.length < 3) return;
    
    // قياس العرض مرة واحدة فقط
    const measureWidth = () => {
      if (sliderRef.current) {
        cachedWidth.current = sliderRef.current.clientWidth;
      }
    };
    measureWidth();
    
    autoScrollRef.current = setInterval(() => {
      if (!sliderRef.current) return;
      const { scrollLeft: sl, scrollWidth } = sliderRef.current;
      if (sl + cachedWidth.current >= scrollWidth - 5) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: cachedWidth.current, behavior: 'smooth' });
      }
    }, AUTO_SCROLL_INTERVAL);
    
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [comments]);

  // Drag to scroll
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeftPos.current = sliderRef.current?.scrollLeft || 0;
  };
  const onMouseLeave = () => { isDragging.current = false; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeftPos.current - walk;
  };
  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeftPos.current = sliderRef.current?.scrollLeft || 0;
  };
  const onTouchEnd = () => { isDragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  // Manual scroll buttons with cached width
  const scrollByAmount = (amount: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // تحسين أزرار التمرير
  const handleScrollLeft = () => {
    if (sliderRef.current && cachedWidth.current > 0) {
      scrollByAmount(-cachedWidth.current / 1.2);
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current && cachedWidth.current > 0) {
      scrollByAmount(cachedWidth.current / 1.2);
    }
  };

  if (!comments || comments.length === 0) return null;

  return (
    <div className="comments-slider-section optimized-layout">
      <h3 className="comments-slider-title optimized-text">آراء المستخدمين</h3>
      <div className="comments-slider-controls optimized-layout">
        <button className="slider-btn right optimized-button interactive-element" onClick={handleScrollLeft}>&#8592;</button>
        <div
          className="comments-slider optimized-slider smooth-scroll"
          ref={sliderRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          {comments.map((comment, idx) => (
            <div className="slider-comment optimized-slider-item optimized-card" key={comment.id + idx}>
              <div className="slider-comment-header optimized-layout">
                <span className="slider-author optimized-text">{comment.user_name}</span>
                <span className="slider-rating optimized-rating">{'★'.repeat(comment.rating)}</span>
              </div>
              <div className="slider-comment-text optimized-text">{comment.comment_text}</div>
            </div>
          ))}
        </div>
        <button className="slider-btn left optimized-button interactive-element" onClick={handleScrollRight}>&#8594;</button>
      </div>
    </div>
  );
};

export default CommentsMarquee; 