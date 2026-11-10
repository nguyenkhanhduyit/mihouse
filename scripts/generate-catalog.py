from pathlib import Path
from bs4 import BeautifulSoup
import json,re
DIR=Path(__file__).resolve().parents[1]
selector='h1,h2,h3,h4,p,a,button,img,video,iframe'
def eligible(el):
 if el.name in ('img','video','iframe'):return True
 if el.find(['h1','h2','h3','h4','p','a','button']):return False
 if el.name=='a' and el.find('img'):return False
 if el.find_parent('script'):return False
 return len(el.get_text(' ',strip=True))>2

def extract(root):
 out=[]
 for idx,el in enumerate(root.select(selector)):
  if not eligible(el):continue
  text=' '.join(el.get_text(' ',strip=True).split())
  src=el.get('src') or el.get('data-src') or ''
  if src.startswith('data:'):src=''
  href=el.get('href','')
  label=(text or el.get('alt','') or src.split('/')[-1] or el.name)[:88]
  out.append(dict(id=str(idx),tag=el.name,kind='media' if el.name in ('img','video','iframe') else 'text',label=label,text=text[:10000],src=src,href=href,alt=el.get('alt','')))
 return out
catalog={}; input=DIR/'original-html'
for file in input.glob('*.html'):
 if file.name=='_home.html':route='/'
 elif file.stem=='album-anh_page_1':route='/album-anh?page=1'
 elif file.stem=='album-anh_page_2':route='/album-anh?page=2'
 else:route='/'+file.stem
 soup=BeautifulSoup(file.read_text(encoding='utf-8'),'html.parser')
 main=soup.select_one('#main-primary') or soup.select_one('main')
 if not main:continue
 catalog[route]=extract(main)
 if file.name=='_home.html':
  catalog['@navigation']=extract(soup.select_one('.navigation') or soup)
  catalog['@footer']=extract(soup.select_one('footer') or soup)
DIR.joinpath('src/cms/catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=1))
print(f'Catalog {len(catalog)} scopes; {sum(map(len,catalog.values()))} targets')
