export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assistance_requests: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          failed_searches_count: number | null
          id: string
          notes: string | null
          search_criteria: Json
          session_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          failed_searches_count?: number | null
          id?: string
          notes?: string | null
          search_criteria: Json
          session_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          failed_searches_count?: number | null
          id?: string
          notes?: string | null
          search_criteria?: Json
          session_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          additional_requests: string | null
          completion_date: string | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          event_date: string
          id: string
          notes: string | null
          provider_id: string
          service_completed: boolean | null
          service_id: string
          status: string
          updated_at: string
        }
        Insert: {
          additional_requests?: string | null
          completion_date?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          event_date: string
          id?: string
          notes?: string | null
          provider_id: string
          service_completed?: boolean | null
          service_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          additional_requests?: string | null
          completion_date?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          event_date?: string
          id?: string
          notes?: string | null
          provider_id?: string
          service_completed?: boolean | null
          service_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      cashback_credits: {
        Row: {
          amount: number
          created_at: string
          customer_id: string
          expires_at: string
          id: string
          source_booking_id: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          customer_id: string
          expires_at: string
          id?: string
          source_booking_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          customer_id?: string
          expires_at?: string
          id?: string
          source_booking_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      detailed_reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string | null
          customer_email: string
          customer_name: string
          id: string
          is_verified: boolean | null
          overall_rating: number | null
          price_rating: number | null
          provider_id: string | null
          quality_rating: number | null
          service_id: string | null
          service_rating: number | null
          timing_rating: number | null
          updated_at: string | null
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          id?: string
          is_verified?: boolean | null
          overall_rating?: number | null
          price_rating?: number | null
          provider_id?: string | null
          quality_rating?: number | null
          service_id?: string | null
          service_rating?: number | null
          timing_rating?: number | null
          updated_at?: string | null
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          id?: string
          is_verified?: boolean | null
          overall_rating?: number | null
          price_rating?: number | null
          provider_id?: string | null
          quality_rating?: number | null
          service_id?: string | null
          service_rating?: number | null
          timing_rating?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "detailed_reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detailed_reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detailed_reviews_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      lottery_participants: {
        Row: {
          created_at: string | null
          customer_email: string
          id: string
          is_eligible: boolean | null
          last_review_date: string | null
          reviews_count: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          id?: string
          is_eligible?: boolean | null
          last_review_date?: string | null
          reviews_count?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          id?: string
          is_eligible?: boolean | null
          last_review_date?: string | null
          reviews_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      lottery_winners: {
        Row: {
          created_at: string | null
          customer_email: string
          id: string
          prize_amount: number | null
          status: string | null
          winning_date: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          id?: string
          prize_amount?: number | null
          status?: string | null
          winning_date?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          id?: string
          prize_amount?: number | null
          status?: string | null
          winning_date?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          is_provider: boolean
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          is_provider?: boolean
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          is_provider?: boolean
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      provider_availability: {
        Row: {
          available_date: string
          created_at: string
          end_time: string
          id: string
          is_available: boolean
          provider_id: string
          start_time: string
          updated_at: string
        }
        Insert: {
          available_date: string
          created_at?: string
          end_time: string
          id?: string
          is_available?: boolean
          provider_id: string
          start_time: string
          updated_at?: string
        }
        Update: {
          available_date?: string
          created_at?: string
          end_time?: string
          id?: string
          is_available?: boolean
          provider_id?: string
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_availability_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_calendar: {
        Row: {
          created_at: string | null
          current_bookings: number | null
          date: string
          end_time: string
          id: string
          is_available: boolean | null
          max_bookings: number | null
          provider_id: string | null
          service_area: string | null
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_bookings?: number | null
          date: string
          end_time: string
          id?: string
          is_available?: boolean | null
          max_bookings?: number | null
          provider_id?: string | null
          service_area?: string | null
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_bookings?: number | null
          date?: string
          end_time?: string
          id?: string
          is_available?: boolean | null
          max_bookings?: number | null
          provider_id?: string | null
          service_area?: string | null
          start_time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_calendar_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_subcategories: {
        Row: {
          provider_id: string
          subcategory_id: string
        }
        Insert: {
          provider_id: string
          subcategory_id: string
        }
        Update: {
          provider_id?: string
          subcategory_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_subcategories_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_subcategories_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          address: string | null
          city: string | null
          contact_person: string | null
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          is_verified: boolean | null
          logo_url: string | null
          max_travel_distance: number | null
          name: string
          phone: string | null
          rating: number | null
          review_count: number | null
          service_areas: string[] | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          contact_person?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          max_travel_distance?: number | null
          name: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          service_areas?: string[] | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          contact_person?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          max_travel_distance?: number | null
          name?: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          service_areas?: string[] | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          customer_name: string
          id: string
          is_approved: boolean
          provider_id: string
          rating: number
          service_id: string | null
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          customer_name: string
          id?: string
          is_approved?: boolean
          provider_id: string
          rating: number
          service_id?: string | null
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          customer_name?: string
          id?: string
          is_approved?: boolean
          provider_id?: string
          rating?: number
          service_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      search_tracking: {
        Row: {
          id: string
          results_found: number | null
          search_criteria: Json
          search_timestamp: string | null
          session_id: string
          user_agent: string | null
          user_ip: string | null
        }
        Insert: {
          id?: string
          results_found?: number | null
          search_criteria: Json
          search_timestamp?: string | null
          session_id: string
          user_agent?: string | null
          user_ip?: string | null
        }
        Update: {
          id?: string
          results_found?: number | null
          search_criteria?: Json
          search_timestamp?: string | null
          session_id?: string
          user_agent?: string | null
          user_ip?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          additional_images: string[] | null
          audience_ages: string[] | null
          audience_size: number | null
          category_id: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          event_types: string[] | null
          features: string[] | null
          id: string
          image_url: string | null
          is_reception_service: boolean | null
          name: string
          price_range: string | null
          price_unit: string | null
          provider_id: string
          subcategory_id: string | null
          technical_requirements: string[] | null
          updated_at: string | null
          videos: string[] | null
        }
        Insert: {
          additional_images?: string[] | null
          audience_ages?: string[] | null
          audience_size?: number | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          event_types?: string[] | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          is_reception_service?: boolean | null
          name: string
          price_range?: string | null
          price_unit?: string | null
          provider_id: string
          subcategory_id?: string | null
          technical_requirements?: string[] | null
          updated_at?: string | null
          videos?: string[] | null
        }
        Update: {
          additional_images?: string[] | null
          audience_ages?: string[] | null
          audience_size?: number | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          event_types?: string[] | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          is_reception_service?: boolean | null
          name?: string
          price_range?: string | null
          price_unit?: string | null
          provider_id?: string
          subcategory_id?: string | null
          technical_requirements?: string[] | null
          updated_at?: string | null
          videos?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategories: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
