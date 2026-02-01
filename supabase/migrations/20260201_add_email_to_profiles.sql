-- Add email column to profiles table
ALTER TABLE public.profiles
ADD COLUMN email TEXT;

-- Create index on email for faster lookups
CREATE INDEX idx_profiles_email ON public.profiles(email);

-- Migrate existing emails from auth.users to profiles (if needed)
-- Note: This requires the auth_users metadata to be accessible
UPDATE public.profiles p
SET email = (
  SELECT email FROM auth.users u WHERE u.id = p.user_id
)
WHERE email IS NULL;

-- Update the handle_new_user function to also store email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name, email)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'username',
    NEW.raw_user_meta_data ->> 'display_name',
    NEW.email
  );
  RETURN NEW;
END;
$$;
