
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

REVOKE ALL ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE TABLE public.site_content (
  id text PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published content" ON public.site_content FOR SELECT TO anon USING (id = 'published');
CREATE POLICY "Admins can read all content" ON public.site_content FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update content" ON public.site_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_content (id, data) VALUES ('draft', '{}'::jsonb), ('published', '{}'::jsonb);

CREATE TABLE public.content_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data jsonb NOT NULL,
  label text,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid
);
GRANT SELECT, INSERT, DELETE ON public.content_versions TO authenticated;
GRANT ALL ON public.content_versions TO service_role;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage versions" ON public.content_versions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  path text NOT NULL,
  name text NOT NULL,
  mime_type text,
  size bigint,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid
);
GRANT SELECT, INSERT, DELETE ON public.media_assets TO authenticated;
GRANT ALL ON public.media_assets TO service_role;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage media" ON public.media_assets FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  section text,
  detail text,
  actor_email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid
);
GRANT SELECT, INSERT ON public.activity_log TO authenticated;
GRANT ALL ON public.activity_log TO service_role;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read activity" ON public.activity_log FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write activity" ON public.activity_log FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.featured_moments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  caption text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  video_url text NOT NULL,
  video_path text,
  thumbnail_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid
);
CREATE INDEX featured_moments_order_idx ON public.featured_moments (sort_order, created_at);
GRANT SELECT ON public.featured_moments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.featured_moments TO authenticated;
GRANT ALL ON public.featured_moments TO service_role;
ALTER TABLE public.featured_moments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view featured moments" ON public.featured_moments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage featured moments" ON public.featured_moments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read media" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('media', 'featured-moments-videos'));

CREATE POLICY "Admins upload media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('media', 'featured-moments-videos') AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins update media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id IN ('media', 'featured-moments-videos') AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id IN ('media', 'featured-moments-videos') AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins delete media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id IN ('media', 'featured-moments-videos') AND public.has_role(auth.uid(), 'admin'::public.app_role));
