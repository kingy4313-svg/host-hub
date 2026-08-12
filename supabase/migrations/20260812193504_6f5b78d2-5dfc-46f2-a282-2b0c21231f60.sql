update public.site_content sc set data = v.data, updated_at = now()
from public.content_versions v
where v.id = '18248eff-5d26-4228-8a73-b7fdd5f60ba1' and sc.id in ('draft','published');
delete from public.content_versions where created_at > '2026-08-12 19:28:18+00';