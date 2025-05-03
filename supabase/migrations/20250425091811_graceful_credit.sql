/*
  # User Creation Trigger Setup

  1. New Functions
    - `handle_new_user`: Creates a profile record when a new user signs up
  
  2. Triggers
    - Add trigger on auth.users to create profile on signup
  
  3. Changes
    - Ensures profile creation is automated and synchronized with auth
*/

-- Create a secure function that handles new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer -- Required to access auth.users
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, avatar_url)
  values (
    new.id,
    split_part(new.raw_user_meta_data->>'full_name', ' ', 1),
    nullif(split_part(new.raw_user_meta_data->>'full_name', ' ', 2), ''),
    new.raw_user_meta_data->>'avatar_url'
  );

  -- Create default user settings
  insert into public.user_settings (user_id)
  values (new.id);

  return new;
end;
$$;

-- Create the trigger
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();