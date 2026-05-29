export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          locale: string
          notification_prefs: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          locale?: string
          notification_prefs?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          full_name?: string | null
          locale?: string
          notification_prefs?: Json
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          mollie_customer_id: string | null
          mollie_subscription_id: string | null
          status: 'free' | 'trial' | 'active' | 'cancelled' | 'past_due'
          tier: 'free' | 'standard' | 'family' | 'premium'
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mollie_customer_id?: string | null
          mollie_subscription_id?: string | null
          status?: 'free' | 'trial' | 'active' | 'cancelled' | 'past_due'
          tier?: 'free' | 'standard' | 'family' | 'premium'
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          mollie_customer_id?: string | null
          mollie_subscription_id?: string | null
          status?: 'free' | 'trial' | 'active' | 'cancelled' | 'past_due'
          tier?: 'free' | 'standard' | 'family' | 'premium'
          current_period_end?: string | null
          updated_at?: string
        }
      }
      scans: {
        Row: {
          id: string
          user_id: string | null
          ip_hash: string | null
          input_kind: 'image' | 'text'
          verdict_category: 'safe' | 'doubt' | 'phishing'
          verdict_score: number
          verdict_summary: string | null
          verdict_flags: Json | null
          fraud_type: string | null
          locale: string
          ai_provider: string
          ai_model: string
          scan_duration_ms: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          ip_hash?: string | null
          input_kind: 'image' | 'text'
          verdict_category: 'safe' | 'doubt' | 'phishing'
          verdict_score: number
          verdict_summary?: string | null
          verdict_flags?: Json | null
          fraud_type?: string | null
          locale?: string
          ai_provider?: string
          ai_model: string
          scan_duration_ms?: number | null
          created_at?: string
        }
        Update: never
      }
      rate_limits: {
        Row: {
          ip_hash: string
          scans_this_month: number
          reset_at: string
        }
        Insert: {
          ip_hash: string
          scans_this_month?: number
          reset_at?: string
        }
        Update: {
          scans_this_month?: number
          reset_at?: string
        }
      }
      newsletter: {
        Row: {
          email: string
          user_id: string | null
          locale: string
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          user_id?: string | null
          locale?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          unsubscribed_at?: string | null
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type Scan = Database['public']['Tables']['scans']['Row']
export type ScanInsert = Database['public']['Tables']['scans']['Insert']
export type RateLimit = Database['public']['Tables']['rate_limits']['Row']
export type Newsletter = Database['public']['Tables']['newsletter']['Row']
