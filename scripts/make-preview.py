"""Inline preview-dist (vite.preview.config.ts build) into one self-contained HTML file.
Usage: python3 scripts/make-preview.py OUTPUT.html"""
import sys, glob, base64
out = sys.argv[1]; d = 'preview-dist/assets/'
js = open(glob.glob(d + '*.js')[0]).read(); css = open(glob.glob(d + '*.css')[0]).read()
uri = lambda p, m: f'data:{m};base64,' + base64.b64encode(open('public' + p, 'rb').read()).decode()
for n in ['slide1.jpg', 'slide2.jpg', 'slide3.jpg', 'slide4.jpg', 'auth_member.jpg', 'auth_employer.jpg', 'logo.png']:
    js = js.replace('/img/' + n, uri('/img/' + n, 'image/png' if n.endswith('png') else 'image/jpeg'))
# Lazy images may never load inside the preview frame; load them all straight away.
js = js.replace('loading:"lazy"', 'loading:"eager"').replace('?"eager":"lazy"', '?"eager":"eager"')
js = js.replace('</script', '<\\/script')
open(out, 'w').write(f'''<title>Industrial Pensions Trust Website</title>
<meta name="description" content="Preview of the Industrial Pensions Trust (IPTC) public website.">
<link rel="icon" href="{uri('/favicon.png', 'image/png')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&display=swap" rel="stylesheet">
<style>:root{{color-scheme:light}}html,body{{background:#F8F7F4;color:#141414}}
{css}</style>
<div id="root"></div>
<script type="module">{js}</script>
''')
