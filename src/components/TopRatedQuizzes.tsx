import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CommentService } from '../services/commentService'
import { QuizStats } from '../lib/supabase'
import { quizzes } from '../data/quizzes'
import '../styles/TopRatedQuizzes.css'

const TopRatedQuizzes: React.FC = () => {
  const [topRatedStats, setTopRatedStats] = useState<QuizStats[]>([])
  const [mostCompletedStats, setMostCompletedStats] = useState<QuizStats[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [topRated, mostCompleted] = await Promise.all([
        CommentService.getTopRatedQuizzes(5),
        CommentService.getMostCompletedQuizzes(5)
      ])
      
      setTopRatedStats(topRated)
      setMostCompletedStats(mostCompleted)
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const getQuizById = (quizId: string) => {
    return quizzes.find(quiz => quiz.id === quizId)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= Math.round(rating) ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
        <span className="rating-text">({rating.toFixed(1)})</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="stats-loading">
        <div className="spinner"></div>
        <p>جاري تحميل الإحصائيات...</p>
      </div>
    )
  }

  return (
    <div className="top-rated-section">
      <div className="stats-container">
        {/* أفضل الاختبارات تقييماً */}
        <div className="stats-card">
          <h3>🏆 أفضل الاختبارات تقييماً</h3>
          {topRatedStats.length > 0 ? (
            <div className="stats-list">
              {topRatedStats.map((stat, index) => {
                const quiz = getQuizById(stat.quiz_id)
                if (!quiz) return null
                
                return (
                  <div 
                    key={stat.quiz_id} 
                    className="stat-item"
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                  >
                    <div className="stat-rank">#{index + 1}</div>
                    <div className="stat-content">
                      <div className="stat-title">{quiz.title}</div>
                      <div className="stat-details">
                        {renderStars(stat.average_rating)}
                        <span className="stat-count">
                          {stat.total_ratings} تقييم
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="no-stats">لا توجد إحصائيات بعد</p>
          )}
        </div>

        {/* أكثر الاختبارات إكمالاً */}
        <div className="stats-card">
          <h3>📊 أكثر الاختبارات إكمالاً</h3>
          {mostCompletedStats.length > 0 ? (
            <div className="stats-list">
              {mostCompletedStats.map((stat, index) => {
                const quiz = getQuizById(stat.quiz_id)
                if (!quiz) return null
                
                return (
                  <div 
                    key={stat.quiz_id} 
                    className="stat-item"
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                  >
                    <div className="stat-rank">#{index + 1}</div>
                    <div className="stat-content">
                      <div className="stat-title">{quiz.title}</div>
                      <div className="stat-details">
                        <span className="completion-count">
                          {stat.completion_count} شخص أكملوا
                        </span>
                        {stat.average_rating > 0 && (
                          <span className="avg-rating">
                            تقييم: {stat.average_rating.toFixed(1)}/5
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="no-stats">لا توجد إحصائيات بعد</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopRatedQuizzes 