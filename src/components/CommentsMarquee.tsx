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
  const scrollLeft = useRef(0);

  // Auto scroll
  useEffect(() => {
    if (!sliderRef.current || comments.length < 3) return;
    autoScrollRef.current = setInterval(() => {
      if (!sliderRef.current) return;
      const { scrollLeft: sl, scrollWidth, clientWidth } = sliderRef.current;
      if (sl + clientWidth >= scrollWidth - 5) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
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
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  };
  const onMouseLeave = () => { isDragging.current = false; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  };
  const onTouchEnd = () => { isDragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Manual scroll buttons
  const scrollByAmount = (amount: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (!comments || comments.length === 0) return null;

  return (
    <div className="comments-slider-section">
      <h3 className="comments-slider-title">آراء المستخدمين</h3>
      <div className="comments-slider-controls">
        <button className="slider-btn right" onClick={() => scrollByAmount(-sliderRef.current!.clientWidth / 1.2)}>&#8592;</button>
        <div
          className="comments-slider"
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
            <div className="slider-comment" key={comment.id + idx}>
              <div className="slider-comment-header">
                <span className="slider-author">{comment.user_name}</span>
                <span className="slider-rating">{'★'.repeat(comment.rating)}</span>
              </div>
              <div className="slider-comment-text">{comment.comment_text}</div>
            </div>
          ))}
        </div>
        <button className="slider-btn left" onClick={() => scrollByAmount(sliderRef.current!.clientWidth / 1.2)}>&#8594;</button>
      </div>
    </div>
  );
};

export default CommentsMarquee; 