DROP POLICY IF EXISTS "Public read media" ON storage.objects;
DROP POLICY IF EXISTS "Admins upload media" ON storage.objects;
DROP POLICY IF EXISTS "Admins update media" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete media" ON storage.objects;

CREATE POLICY "Public read media" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');

CREATE POLICY "Admins upload media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins update media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins delete media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::public.app_role));