import urllib.request, json
url = 'https://ixziettsgxzqizixilif.supabase.co/rest/v1/site_content?id=eq.published&select=id,data'
headers = {
    'apikey': 'sb_publishable_ty-7ryYsLZit8Wj8hqLx4A_qi5jcHlO',
    'Authorization': 'Bearer sb_publishable_ty-7ryYsLZit8Wj8hqLx4A_qi5jcHlO',
    'Accept': 'application/json',
}
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=30) as r:
    data = json.loads(r.read().decode('utf-8'))
    print(json.dumps(data, indent=2)[:4000])
