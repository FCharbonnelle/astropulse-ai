-- ASTROPULSE AI - PostgreSQL Database Schema for Supabase
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    birth_date DATE,
    birth_time TIME,
    birth_place TEXT,
    sun_sign VARCHAR(20),
    love_status VARCHAR(50) DEFAULT 'single', -- single, in_relationship, complicated, searching
    is_vip BOOLEAN DEFAULT FALSE,
    vip_until TIMESTAMP WITH TIME ZONE,
    streak_count INTEGER DEFAULT 1,
    coins_balance INTEGER DEFAULT 3, -- 3 free coins granted on onboarding
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. DAILY READINGS TABLE
CREATE TABLE IF NOT EXISTS public.daily_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    card_name VARCHAR(100) NOT NULL,
    card_image_url TEXT,
    reading_text TEXT NOT NULL,
    advice_text TEXT NOT NULL,
    love_score INTEGER DEFAULT 85,
    energy_score INTEGER DEFAULT 90,
    work_score INTEGER DEFAULT 78,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- 3. COMPATIBILITY TESTS TABLE
CREATE TABLE IF NOT EXISTS public.compatibility_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    partner_name VARCHAR(100) NOT NULL,
    partner_birth_date DATE,
    partner_sign VARCHAR(20) NOT NULL,
    score_percentage INTEGER NOT NULL,
    detailed_analysis TEXT NOT NULL,
    is_unlocked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ORACLE CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.oracle_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    response TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general', -- love, career, destiny, general
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compatibility_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oracle_conversations ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Daily Readings Policies
CREATE POLICY "Users can view own daily readings" ON public.daily_readings
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can insert own daily readings" ON public.daily_readings
    FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- Compatibility Tests Policies
CREATE POLICY "Users can view own compatibility tests" ON public.compatibility_tests
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can insert own compatibility tests" ON public.compatibility_tests
    FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can update own compatibility tests" ON public.compatibility_tests
    FOR UPDATE USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Oracle Conversations Policies
CREATE POLICY "Users can view own oracle conversations" ON public.oracle_conversations
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can insert own oracle conversations" ON public.oracle_conversations
    FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
