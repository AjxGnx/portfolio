export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: { created_at: string; display_name: string | null; user_id: string }
        Insert: { created_at?: string; display_name?: string | null; user_id: string }
        Update: { created_at?: string; display_name?: string | null; user_id?: string }
        Relationships: []
      }
      books: {
        Row: {
          author: string
          category: string
          cover_path: string
          created_at: string
          id: string
          rating: number
          review: string
          sort_order: number
          status: Database["public"]["Enums"]["book_status"]
          title: string
        }
        Insert: {
          author: string
          category: string
          cover_path: string
          created_at?: string
          id?: string
          rating: number
          review?: string
          sort_order?: number
          status: Database["public"]["Enums"]["book_status"]
          title: string
        }
        Update: {
          author?: string
          category?: string
          cover_path?: string
          created_at?: string
          id?: string
          rating?: number
          review?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["book_status"]
          title?: string
        }
        Relationships: []
      }
      certifications: {
        Row: { created_at: string; id: string; issuer: string; name: string; sort_order: number }
        Insert: { created_at?: string; id?: string; issuer: string; name: string; sort_order?: number }
        Update: { created_at?: string; id?: string; issuer?: string; name?: string; sort_order?: number }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          read_at: string | null
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          read_at?: string | null
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          read_at?: string | null
          subject?: string
        }
        Relationships: []
      }
      education_entries: {
        Row: {
          created_at: string
          degree: string
          field: string
          id: string
          institution: string
          period: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          degree: string
          field: string
          id?: string
          institution: string
          period: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          degree?: string
          field?: string
          id?: string
          institution?: string
          period?: string
          sort_order?: number
        }
        Relationships: []
      }
      games: {
        Row: {
          created_at: string
          genre: string
          id: string
          image_path: string
          platform: string
          rating: number
          review: string
          sort_order: number
          status: Database["public"]["Enums"]["game_status"]
          title: string
        }
        Insert: {
          created_at?: string
          genre: string
          id?: string
          image_path: string
          platform: string
          rating: number
          review?: string
          sort_order?: number
          status: Database["public"]["Enums"]["game_status"]
          title: string
        }
        Update: {
          created_at?: string
          genre?: string
          id?: string
          image_path?: string
          platform?: string
          rating?: number
          review?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["game_status"]
          title?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          created_at: string
          description: string
          featured: boolean
          github_url: string
          id: string
          image_path: string
          live_url: string
          sort_order: number
          technologies: string[]
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          featured?: boolean
          github_url: string
          id?: string
          image_path: string
          live_url?: string
          sort_order?: number
          technologies?: string[]
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          featured?: boolean
          github_url?: string
          id?: string
          image_path?: string
          live_url?: string
          sort_order?: number
          technologies?: string[]
          title?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          bio: string
          description: string
          email: string
          github: string
          github_profile_url: string
          id: string
          linkedin: string
          location: string
          name: string
          short_title: string
          title: string
          updated_at: string
        }
        Insert: {
          bio: string
          description: string
          email: string
          github: string
          github_profile_url: string
          id?: string
          linkedin: string
          location: string
          name: string
          short_title: string
          title: string
          updated_at?: string
        }
        Update: {
          bio?: string
          description?: string
          email?: string
          github?: string
          github_profile_url?: string
          id?: string
          linkedin?: string
          location?: string
          name?: string
          short_title?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          id: string
          level: number
          name: string
          sort_order: number
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          level: number
          name: string
          sort_order?: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          level?: number
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      work_experiences: {
        Row: {
          company: string
          created_at: string
          description: string
          id: string
          location: string | null
          period: string
          role: string
          sort_order: number
          technologies: string[]
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          id?: string
          location?: string | null
          period: string
          role: string
          sort_order?: number
          technologies?: string[]
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          id?: string
          location?: string | null
          period?: string
          role?: string
          sort_order?: number
          technologies?: string[]
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { is_admin: { Args: never; Returns: boolean } }
    Enums: {
      book_status: "Read" | "Reading" | "To Read"
      game_status: "Completed" | "Playing" | "Backlog"
    }
    CompositeTypes: { [_ in never]: never }
  }
}

export type BookStatus = Database["public"]["Enums"]["book_status"]
export type GameStatus = Database["public"]["Enums"]["game_status"]
