-- Trigger to automatically create a public.User record when a new auth.users record is created
-- Run this in your Supabase SQL Editor

-- 1. Create the function
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public."User" (id, email, "fullName", "avatarUrl", role, "createdAt", "updatedAt")
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    'user',
    now(),
    now()
  );
  return new;
end;
$$;

-- 2. Create the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
