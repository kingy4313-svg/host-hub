import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';
const url = process.env.SUPABASE_URL || 'https://ixziettsgxzqizixilif.supabase.co';
const key = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_ty-7ryYsLZit8Wj8hqLx4A_qi5jcHlO';
const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

for (const id of ['published', 'draft']) {
  const { data, error } = await supabase.from('site_content').select('id, data').eq('id', id).maybeSingle();
  console.log(`--- ${id.toUpperCase()} ---`);
  console.log('error:', error);
  console.log('data:', JSON.stringify(data, null, 2).slice(0, 10000));
}
