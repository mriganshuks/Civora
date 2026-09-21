-- =========================================================================
-- CIVORA: Closed-Loop Civic Works & Public Accountability Platform
-- Supabase PostgreSQL Schema & Security Policies (Phase 2)
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ENUMS & DOMAINS
create type user_role as enum ('citizen', 'contractor', 'admin');

create type complaint_status as enum (
  'SUBMITTED',
  'UNDER_REVIEW',
  'AI_ANALYSIS',
  'CLUSTERED',
  'VERIFICATION_REQUIRED',
  'VERIFIED',
  'REJECTED',
  'CONVERTED_TO_PROJECT',
  'RESOLVED'
);

create type complaint_severity as enum ('low', 'medium', 'high', 'urgent');

-- 2. PROFILES TABLE (linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text not null,
  avatar_url text,
  role user_role default 'citizen'::user_role not null,
  ward text default 'Ward 24',
  locality text,
  city text default 'Ludhiana',
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. COMPLAINTS TABLE
create table if not exists public.complaints (
  id uuid default uuid_generate_v4() primary key,
  complaint_id text unique not null, -- e.g. CMP-PB-LDH-W24-000201
  user_id uuid references public.profiles(id) on delete cascade not null,
  category text not null,
  title text not null,
  description text not null,
  severity complaint_severity default 'medium'::complaint_severity not null,
  latitude double precision not null,
  longitude double precision not null,
  address text not null,
  ward text default 'Ward 24',
  status complaint_status default 'SUBMITTED'::complaint_status not null,
  cluster_id text,
  project_id text,
  is_demo boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. COMPLAINT EVIDENCE TABLE
create table if not exists public.complaint_evidence (
  id uuid default uuid_generate_v4() primary key,
  complaint_id uuid references public.complaints(id) on delete cascade not null,
  file_url text not null,
  file_type text default 'photo' not null,
  file_name text not null,
  file_size bigint,
  uploaded_by uuid references public.profiles(id) on delete set null,
  tamper_proof_hash text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for lightning fast queries
create index if not exists idx_complaints_user_id on public.complaints(user_id);
create index if not exists idx_complaints_status on public.complaints(status);
create index if not exists idx_complaints_ward on public.complaints(ward);
create index if not exists idx_evidence_complaint_id on public.complaint_evidence(complaint_id);

-- 5. AUTOMATIC PROFILE CREATION TRIGGER
create or replace function public.handle_new_user()
returns trigger as $$
declare
  assigned_role user_role;
begin
  -- Prevent privilege escalation: Default to citizen unless executive assignment
  assigned_role := coalesce(new.raw_user_meta_data->>'role', 'citizen')::user_role;
  if assigned_role = 'admin'::user_role and (new.raw_user_meta_data->>'role_override_authorized') is null then
    assigned_role := 'citizen'::user_role;
  end if;

  insert into public.profiles (id, name, email, role, ward, locality, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    assigned_role,
    coalesce(new.raw_user_meta_data->>'ward', 'Ward 24'),
    coalesce(new.raw_user_meta_data->>'locality', 'Model Town'),
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. ROW LEVEL SECURITY (RLS) POLICIES

alter table public.profiles enable row level security;
alter table public.complaints enable row level security;
alter table public.complaint_evidence enable row level security;

-- PROFILES POLICIES
-- Anyone can view public details of a profile (name, avatar, role)
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- COMPLAINTS POLICIES
-- 1. Citizens can select only their own complaints (or non-private public aggregated views)
create policy "Citizens can view own complaints"
  on public.complaints for select
  using (
    auth.uid() = user_id or
    is_demo = true or
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 2. Citizens can insert their own complaints
create policy "Authenticated users can create complaints"
  on public.complaints for insert
  with check (auth.uid() = user_id);

-- 3. Only Admin can update complaint status and assignments
create policy "Admins can update complaints"
  on public.complaints for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- EVIDENCE POLICIES
create policy "Evidence is viewable by complaint owner or admin"
  on public.complaint_evidence for select
  using (
    exists (
      select 1 from public.complaints c
      where c.id = complaint_evidence.complaint_id
      and (c.user_id = auth.uid() or c.is_demo = true)
    ) or
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'contractor'))
  );

create policy "Users can insert evidence for own complaints"
  on public.complaint_evidence for insert
  with check (
    auth.uid() = uploaded_by or
    exists (select 1 from public.complaints where id = complaint_id and user_id = auth.uid())
  );

-- 7. SUPABASE STORAGE BUCKET SETUP
insert into storage.buckets (id, name, public)
values ('civora-evidence', 'civora-evidence', true)
on conflict (id) do nothing;

create policy "Public evidence files are accessible"
  on storage.objects for select
  using (bucket_id = 'civora-evidence');

create policy "Authenticated users can upload evidence files"
  on storage.objects for insert
  with check (bucket_id = 'civora-evidence' and auth.role() = 'authenticated');
