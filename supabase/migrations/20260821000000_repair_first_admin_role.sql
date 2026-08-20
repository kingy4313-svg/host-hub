-- Existing users created before the role trigger was installed need an admin role.
DO $$
BEGIN
  IF to_regclass('public.user_roles') IS NOT NULL
    AND to_regclass('auth.users') IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
  THEN
    INSERT INTO public.user_roles (user_id, role)
    SELECT id, 'admin'::public.app_role
    FROM auth.users
    ORDER BY created_at
    LIMIT 1
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;