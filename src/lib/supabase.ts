// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://ppmdgygupuzthqxfippv.supabase.co'
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWRneWd1cHV6dGhxeGZpcHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDU0MjYsImV4cCI6MjA3NDk4MTQyNn0.JdOoMgW7oXtHycvJGl9buYagZaGXoqkU9rF0KnTNKX4'

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables, using defaults')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
