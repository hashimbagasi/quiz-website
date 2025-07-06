import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

console.log('SUPABASE_URL:', supabaseUrl)
console.log('SUPABASE_KEY:', supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Comment {
  id: string
  quiz_id: string
  user_name: string
  comment_text: string
  rating: number
  created_at: string
}

export interface QuizStats {
  quiz_id: string
  completion_count: number
  average_rating: number
  total_ratings: number
  last_updated: string
} 