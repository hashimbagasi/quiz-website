import React, { useState, useEffect, useCallback } from 'react'
import { CommentService } from '../services/commentService'
import { Comment, QuizStats } from '../lib/supabase'
import '../styles/CommentsSection.css'

interface CommentsSectionProps {
  quizId: string
  quizTitle: string
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ quizId, quizTitle }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [stats, setStats] = useState<QuizStats | null>(null)
  const [userName, setUserName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)

  const loadCommentsAndStats = useCallback(async () => {
    const [commentsData, statsData] = await Promise.all([
      CommentService.getComments(quizId),
      CommentService.getQuizStats(quizId)
    ])
    setComments(commentsData)
    setStats(statsData)
  }, [quizId])

  useEffect(() => {
    loadCommentsAndStats()
  }, [loadCommentsAndStats])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userName.trim() || !commentText.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    setIsSubmitting(true)
    
    try {
      const newComment = await CommentService.addComment(quizId, userName, commentText, rating)
      
      if (newComment) {
        setComments([newComment, ...comments])
        setUserName('')
        setCommentText('')
        setRating(5)
        setShowCommentForm(false)
        
        // إعادة تحميل الإحصائيات
        const updatedStats = await CommentService.getQuizStats(quizId)
        setStats(updatedStats)
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('حدث خطأ أثناء إرسال التعليق')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number, interactive: boolean = false, onChange?: (rating: number) => void) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={() => interactive && onChange?.(star)}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3>التعليقات والتقييمات</h3>
        {stats && (
          <div className="quiz-stats">
            <div className="stat-item">
              <span className="stat-label">التقييم العام:</span>
              <div className="stat-value">
                {renderStars(Math.round(stats.average_rating))}
                <span className="rating-text">({stats.average_rating.toFixed(1)}/5)</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-label">عدد التقييمات:</span>
              <span className="stat-value">{stats.total_ratings}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">عدد المكملين:</span>
              <span className="stat-value">{stats.completion_count}</span>
            </div>
          </div>
        )}
      </div>

      <button
        className="add-comment-btn"
        onClick={() => setShowCommentForm(!showCommentForm)}
      >
        {showCommentForm ? 'إلغاء' : 'أضف تعليقك وتقييمك'}
      </button>

      {showCommentForm && (
        <form className="comment-form" onSubmit={handleSubmitComment}>
          <div className="form-group">
            <label htmlFor="userName">اسمك:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="أدخل اسمك"
              required
            />
          </div>

          <div className="form-group">
            <label>تقييمك:</label>
            <div className="rating-input">
              {renderStars(rating, true, setRating)}
              <span className="rating-text">({rating}/5)</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="commentText">تعليقك:</label>
            <textarea
              id="commentText"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
              rows={4}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال التعليق'}
          </button>
        </form>
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">لا توجد تعليقات بعد. كن أول من يعلق!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">{comment.user_name}</span>
                <span className="comment-date">{formatDate(comment.created_at)}</span>
              </div>
              <div className="comment-rating">
                {renderStars(comment.rating)}
              </div>
              <div className="comment-text">
                {comment.comment_text}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentsSection 