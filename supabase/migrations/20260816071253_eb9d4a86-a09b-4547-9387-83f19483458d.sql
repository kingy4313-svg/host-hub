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
CREATE POLICY "Anyone can view featured moments" ON public.featured_moments
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage featured moments" ON public.featured_moments
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public read media" ON storage.objects;
DROP POLICY IF EXISTS "Admins upload media" ON storage.objects;
DROP POLICY IF EXISTS "Admins update media" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete media" ON storage.objects;

CREATE POLICY "Public read media" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('media', 'featured-moments-videos'));
CREATE POLICY "Admins upload media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('media', 'featured-moments-videos') AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id IN ('media', 'featured-moments-videos') AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id IN ('media', 'featured-moments-videos') AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id IN ('media', 'featured-moments-videos') AND public.has_role(auth.uid(), 'admin'));
