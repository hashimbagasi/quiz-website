import { supabase, Comment, QuizStats } from '../lib/supabase'

export class CommentService {
  // إضافة تعليق وتقييم جديد
  static async addComment(quizId: string, userName: string, commentText: string, rating: number): Promise<Comment | null> {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            quiz_id: quizId,
            user_name: userName,
            comment_text: commentText,
            rating: rating
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Error adding comment:', error)
        return null
      }

      // تحديث إحصائيات الاختبار
      await this.updateQuizStats(quizId)
      
      return data
    } catch (error) {
      console.error('Error adding comment:', error)
      return null
    }
  }

  // جلب جميع التعليقات لاختبار معين
  static async getComments(quizId: string): Promise<Comment[]> {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('quiz_id', quizId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching comments:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching comments:', error)
      return []
    }
  }

  // جلب إحصائيات الاختبار
  static async getQuizStats(quizId: string): Promise<QuizStats | null> {
    try {
      const { data, error } = await supabase
        .from('quiz_stats')
        .select('*')
        .eq('quiz_id', quizId)
        .single()

      if (error) {
        console.error('Error fetching quiz stats:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching quiz stats:', error)
      return null
    }
  }

  // تحديث إحصائيات الاختبار
  static async updateQuizStats(quizId: string): Promise<void> {
    try {
      // جلب جميع التعليقات للاختبار
      const comments = await this.getComments(quizId)
      
      if (comments.length === 0) return

      // حساب الإحصائيات
      const totalRatings = comments.length
      const averageRating = comments.reduce((sum, comment) => sum + comment.rating, 0) / totalRatings
      const completionCount = totalRatings // عدد التعليقات = عدد المكملين

      // تحديث أو إدراج الإحصائيات
      const { error } = await supabase
        .from('quiz_stats')
        .upsert([
          {
            quiz_id: quizId,
            completion_count: completionCount,
            average_rating: Math.round(averageRating * 10) / 10, // تقريب إلى رقم عشري واحد
            total_ratings: totalRatings,
            last_updated: new Date().toISOString()
          }
        ])

      if (error) {
        console.error('Error updating quiz stats:', error)
      }
    } catch (error) {
      console.error('Error updating quiz stats:', error)
    }
  }

  // تسجيل إكمال اختبار (بدون تعليق)
  static async recordQuizCompletion(quizId: string): Promise<void> {
    try {
      // تحديث عدد المكملين فقط
      const currentStats = await this.getQuizStats(quizId)
      const newCompletionCount = (currentStats?.completion_count || 0) + 1

      const { error } = await supabase
        .from('quiz_stats')
        .upsert([
          {
            quiz_id: quizId,
            completion_count: newCompletionCount,
            average_rating: currentStats?.average_rating || 0,
            total_ratings: currentStats?.total_ratings || 0,
            last_updated: new Date().toISOString()
          }
        ])

      if (error) {
        console.error('Error recording quiz completion:', error)
      }
    } catch (error) {
      console.error('Error recording quiz completion:', error)
    }
  }

  // جلب أفضل الاختبارات تقييماً
  static async getTopRatedQuizzes(limit: number = 10): Promise<QuizStats[]> {
    try {
      const { data, error } = await supabase
        .from('quiz_stats')
        .select('*')
        .gte('total_ratings', 1) // فقط الاختبارات التي لديها تقييمات
        .order('average_rating', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching top rated quizzes:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching top rated quizzes:', error)
      return []
    }
  }

  // جلب أكثر الاختبارات إكمالاً
  static async getMostCompletedQuizzes(limit: number = 10): Promise<QuizStats[]> {
    try {
      const { data, error } = await supabase
        .from('quiz_stats')
        .select('*')
        .order('completion_count', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching most completed quizzes:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching most completed quizzes:', error)
      return []
    }
  }
} 