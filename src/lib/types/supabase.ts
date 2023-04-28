export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          order: number | null
          section_id: number | null
          title: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          order?: number | null
          section_id?: number | null
          title?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          order?: number | null
          section_id?: number | null
          title?: string | null
        }
      }
      courses: {
        Row: {
          author: number | null
          created_at: string | null
          id: number
          level: number | null
          slug: string | null
          summary: string | null
          title: string | null
        }
        Insert: {
          author?: number | null
          created_at?: string | null
          id?: number
          level?: number | null
          slug?: string | null
          summary?: string | null
          title?: string | null
        }
        Update: {
          author?: number | null
          created_at?: string | null
          id?: number
          level?: number | null
          slug?: string | null
          summary?: string | null
          title?: string | null
        }
      }
      scores: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
      }
      sectionGiveScore: {
        Row: {
          created_at: string | null
          id: number
          score_id: number | null
          section_id: number | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          score_id?: number | null
          section_id?: number | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          score_id?: number | null
          section_id?: number | null
          value?: number | null
        }
      }
      sections: {
        Row: {
          course_id: number | null
          created_at: string | null
          id: number
          order: number | null
          slug: string | null
          summary: string | null
          title: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string | null
          id?: number
          order?: number | null
          slug?: string | null
          summary?: string | null
          title?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string | null
          id?: number
          order?: number | null
          slug?: string | null
          summary?: string | null
          title?: string | null
        }
      }
      test: {
        Row: {
          created_at: string | null
          id: number
          user_id: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          user_id?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          user_id?: string | null
          value?: string | null
        }
      }
      userCompleteSection: {
        Row: {
          created_at: string | null
          id: number
          section_id: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          section_id?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          section_id?: number | null
          user_id?: number | null
        }
      }
      users: {
        Row: {
          avatar_image_url: string
          created_at: string | null
          email: string
          id: number
          role: string
          uid: string
          username: string
        }
        Insert: {
          avatar_image_url: string
          created_at?: string | null
          email: string
          id?: number
          role: string
          uid: string
          username: string
        }
        Update: {
          avatar_image_url?: string
          created_at?: string | null
          email?: string
          id?: number
          role?: string
          uid?: string
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      user_role: {
        Args: {
          uid: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
