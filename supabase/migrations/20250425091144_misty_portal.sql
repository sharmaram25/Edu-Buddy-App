/*
  # Initial schema setup for user profiles
  
  1. New Tables
    - profiles: Stores user profile information
      - id (uuid, primary key)
      - email (text, unique)
      - full_name (text)
      - avatar_url (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
  
  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users
    - Set up triggers for updated_at and new user handling
*/

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Set up Row Level Security
alter table public.profiles enable row level security;

-- Only create policies if they don't exist
do $$
begin
  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' 
    and tablename = 'profiles' 
    and policyname = 'Users can read own profile'
  ) then
    create policy "Users can read own profile"
      on public.profiles
      for select
      to authenticated
      using (auth.uid() = id);
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' 
    and tablename = 'profiles' 
    and policyname = 'Users can update own profile'
  ) then
    create policy "Users can update own profile"
      on public.profiles
      for update
      to authenticated
      using (auth.uid() = id)
      with check (auth.uid() = id);
  end if;
end $$;

-- Create a trigger to set updated_at on profile updates
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Only create trigger if it doesn't exist
do $$
begin
  if not exists (
    select 1 from pg_trigger 
    where tgname = 'profiles_updated_at'
  ) then
    create trigger profiles_updated_at
      before update on public.profiles
      for each row
      execute procedure handle_updated_at();
  end if;
end $$;

-- Create a function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Only create trigger if it doesn't exist
do $$
begin
  if not exists (
    select 1 from pg_trigger 
    where tgname = 'on_auth_user_created'
  ) then
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  end if;
end $$;