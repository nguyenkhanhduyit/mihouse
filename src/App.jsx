import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Header, Navigation, Footer, FloatingContact, ScrollToTop } from './components/SharedShell.jsx';
import { enhancePage } from './hooks/enhancePage.js';
import manifest from './routeManifest.json';
import { loadOriginalStyles } from './hooks/loadOriginalStyles.js';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { localizeAssets } from './hooks/localizeAssets.js';
import {fetchCms,applyCms} from './cms/runtime.js';
import { initFidelityMotion } from './hooks/fidelityMotion.js';
import { initSourceCarousels } from './hooks/sourceCarousels.js';
import { GalleryLightbox } from './components/GalleryLightbox.jsx';
import assetMap from './assetMap.json';

// Load each JSX page eagerly to prevent route-chunk failures and show content immediately.
// These are genuine React components, not iframe or injected HTML.
const modules = import.meta.glob('./pages/*.jsx', { eager: true });
const components = {};
for (const item of Object.values(manifest)) {
  const key = `./pages/${item.file}.jsx`;
  if (modules[key]?.default && !components[item.file]) components[item.file] = modules[key].default;
}

// Public site is deliberately a single landing page. /admin is handled in main.jsx.
function getRoute() { return '/'; }
const legacySections = {'/gioi-thieu':'gioi-thieu','/dich-vu':'dich-vu','/goi-dau-duong-sinh':'dich-vu','/massage':'dich-vu','/nail':'dich-vu','/bang-gia':'bang-gia','/dao-tao':'dao-tao','/dao-tao-hoc-vien':'dao-tao','/album-anh':'album-anh','/nail-hottrend':'album-anh','/khong-gian':'album-anh','/lien-he':'footer-primary','/tin-tuc':'top'};
function sectionForLegacy(path) {
  if (legacySections[path]) return legacySections[path];
  return 'top';
}

function pathForNavigation(href) {
  if (!href) return null;
  if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) return null;
  try {
    const url = new URL(href, window.location.origin);
    // Ignore offsite resources and links, retain original social/phone links.
    if (url.origin !== window.location.origin && !['mihousespa.com', 'www.mihousespa.com'].includes(url.hostname)) return null;
    let path = decodeURI(url.pathname).replace(/\/$/, '') || '/';
    if (path.endsWith('.html')) path = path.slice(0, -5);
    if (path === '/index' || path === '/_home') path = '/';
    if (path === '/album-anh') {
      const page = url.searchParams.get('page');
      if (page === '1' || page === '2') return `${path}?page=${page}`;
    }
    return path;
  } catch {
    return null;
  }
}

function applySeo(route) {
  const meta = manifest[route];
  if (!meta) return () => {};
  document.title = meta.title || 'Mi House Spa';
  document.documentElement.lang = 'vi';
  const nodes = [];
  for (const name of ['description', 'keywords']) {
    const value = meta[name];
    if (!value) continue;
    let el = document.head.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.name = name;
      document.head.append(el);
    }
    el.content = value;
  }
  for (const schema of meta.schemas || []) {
    // JSON-LD is preserved as structured data, not evaluated as JavaScript.
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = schema;
    document.head.append(script);
    nodes.push(script);
  }
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = `https://mihousespa.com${route.split('?')[0]}`;
  return () => nodes.forEach((node) => node.remove());
}

function syncNavigation(route) {
  const serviceRoutes = new Set(['/goi-dau-duong-sinh', '/massage', '/nail']);
  const trainingRoutes = new Set(['/dao-tao-hoc-vien']);
  const galleryRoutes = new Set(['/nail-hottrend', '/khong-gian']);
  const isNewsArticle = !serviceRoutes.has(route) && manifest[route]?.schemas?.some(schema => schema.includes('NewsArticle'));
  let activeRoot = route === '/' ? '/' : `/${route.split('/')[1].split('?')[0]}`;
  if (serviceRoutes.has(route)) activeRoot = '/dich-vu';
  else if (trainingRoutes.has(route)) activeRoot = '/dao-tao';
  else if (galleryRoutes.has(route)) activeRoot = '/album-anh';
  else if (isNewsArticle) activeRoot = '/tin-tuc';
  const nav = document.querySelector('.navigation');
  if (!nav) return;
  nav.classList.toggle('is-index', route === '/');
  nav.classList.toggle('not-index', route !== '/');
  nav.querySelectorAll('.navigation__item').forEach((li) => {
    const link = li.querySelector(':scope > a.navigation__link');
    if (!link) return;
    const isActive = pathForNavigation(link.getAttribute('href')) === activeRoot;
    li.classList.toggle('active', isActive);
    li.classList.toggle('inactive', !isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  nav.classList.remove('nav-open');
  document.body.classList.remove('nav-open');
}

function PageBoundary({ page: Page, route, cms }) {
  useEffect(() => {
    localizeAssets(document.getElementById('main-primary'));
    const cleanup=enhancePage();
    applyCms(route,cms);
    const cleanupMotion=initFidelityMotion(document.getElementById('main-primary'));
    const cleanupSource=initSourceCarousels(document.getElementById('main-primary'));
    return () => { cleanupSource?.(); cleanupMotion?.(); cleanup?.(); };
  }, [route,cms]);
  return <Page cms={cms}/>;
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('react-ready');
    document.getElementById('app-boot-status')?.remove();
    localizeAssets(document.querySelector('.site-root'));
    loadOriginalStyles();
  }, []);
  const [route, setRoute] = useState('/');
  useEffect(() => {
    const path = decodeURI(window.location.pathname).replace(/\/$/,'') || '/';
    if (path !== '/') {
      const anchor = sectionForLegacy(path);
      window.history.replaceState({}, '', '/#'+anchor);
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({behavior:'auto',block:'start'})));
    }
  }, []);
  const [cms,setCms]=useState(null);
  useEffect(()=>{let active=true;fetchCms().then(state=>{if(active)setCms(state)});return()=>{active=false}},[]);
  useEffect(()=>{if(cms)applyCms(route,cms)},[cms,route]);
  const [gallery, setGallery] = useState(null);
  const pendingScrollRef=useRef(null);
  const pointerRef=useRef(null);
  const draggedRef=useRef(0);
  const [notice, setNotice] = useState('');
  const changeRoute = useCallback((target) => {
    if (!manifest[target] && !(target.startsWith('/tin-tuc/') && cms?.articles?.some(a=>a.status!=='draft'&&'/tin-tuc/'+a.slug===target))) return false;
    const full = target;
    if (window.location.pathname + window.location.search !== full) window.history.pushState({}, '', full);
    setRoute(target);
    setGallery(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
    return true;
  }, [cms]);

  useEffect(() => {
    const popState = () => { setRoute('/'); setGallery(null); };
    window.addEventListener('popstate', popState);
    return () => window.removeEventListener('popstate', popState);
  }, []);
  useEffect(() => applySeo(route), [route]);
  useEffect(() => {
    const onScroll = () => {
      document.querySelector('.navigation')?.classList.toggle('is-fixed', window.scrollY > 140);
      document.querySelector('.scroll-to-top')?.classList.toggle('is-visible', window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const Page = components['_home'];

  useEffect(()=>{
    if(route!=='/')return;
    const hash = pendingScrollRef.current || decodeURIComponent(window.location.hash.slice(1));
    if(!hash)return;
    const raf=requestAnimationFrame(()=>requestAnimationFrame(()=>{
      document.getElementById(hash)?.scrollIntoView({behavior:'smooth',block:'start'});
      pendingScrollRef.current=null;
    }));
    return ()=>cancelAnimationFrame(raf);
  },[route]);
  function goSection(hash){
    if(!hash)return;
    window.history.pushState({},'',`/#${encodeURIComponent(hash)}`);
    if(route!=='/'){
      pendingScrollRef.current=hash;
      setRoute('/');
    } else {
      document.getElementById(hash)?.scrollIntoView({behavior:'smooth',block:'start'});
    }
  }
  function mediaCandidates(element){
    const fancy=element.closest('[data-fancybox]');
    let root=null, selector='';
    if(fancy){
      const name=fancy.getAttribute('data-fancybox');
      root=fancy.closest('.service-price,.video-featured,.album-featured__list,.news-detail-gallery,.album-grid')||document.getElementById('main-primary');
      selector=`[data-fancybox="${name}"]`;
    }else{
      const img=element.closest('img');
      if(!img||!img.closest('#main-primary')||route!=='/')return null;
      const sections=[
        ['.training-landing','.training-landing__image'],
        ['.album-featured__list','.album-featured__image'],
        ['.service-featured','.service__media-image'],
        ['.intro','.intro__media-image'],
        ['.slideshow','.slideshow__media-image'],
        ['.service-price','.service-price__image'],
      ];
      for(const [container,child] of sections){if(img.matches(child)){root=img.closest(container);selector=child;break}}
      if(!root)return null;
    }
    const nodes=Array.from(root.querySelectorAll(selector)).filter(node=>!node.closest('.is-clone'));
    const clicked=fancy||element.closest('img');
    let selected=nodes.findIndex(n=>n===clicked || n.contains(clicked));
    if(selected<0){const reference=clicked?.getAttribute('data-src');selected=nodes.findIndex(node=>node.getAttribute('data-src')===reference);}
    if(selected<0)selected=0;
    const items=nodes.map(node=>{
      const cover=node.matches('img')?node:node.querySelector('img');
      const src=node.getAttribute('data-src')||node.getAttribute('href')||cover?.getAttribute('src')||'';
      const preferred=cms?.mediaMap?.[src]||src;
      let local=preferred;
      try{const uri=new URL(preferred,window.location.origin);if(['mihousespa.com','www.mihousespa.com'].includes(uri.hostname)&&assetMap[uri.pathname])local=assetMap[uri.pathname]}catch{}
      return {src:local,thumbnail:cover?.src||'',caption:node.getAttribute('data-caption')||cover?.alt||'',kind:/\.(mp4|webm|mov)(\?|$)/i.test(local)?'video':'image'};
    }).filter(x=>x.src);
    return items.length?{items,index:Math.min(selected,items.length-1)}:null;
  }
  function handlePointerDown(event){pointerRef.current={x:event.clientX,y:event.clientY};}
  function handlePointerUp(event){if(pointerRef.current&&Math.abs(event.clientX-pointerRef.current.x)>12&&Math.abs(event.clientX-pointerRef.current.x)>Math.abs(event.clientY-pointerRef.current.y)){draggedRef.current=Date.now()}pointerRef.current=null;}

  function handleClick(event) {
    if (event.defaultPrevented) return;
    const element = event.target instanceof Element ? event.target : event.target?.parentElement;
    if (!element) return;
    if (element.closest('.scroll-to-top')) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (element.closest('.main-widget .out-circle, .main-widget .close-icon')) {
      event.preventDefault();
      const widget = document.querySelector('.main-widget');
      widget?.querySelector('.def-content')?.classList.toggle('unsee');
      widget?.classList.toggle('widget-open');
      return;
    }
    if (element.closest('[data-gallery-open=menu]')) {
      event.preventDefault();
      const first = document.querySelector('.service-price [data-fancybox=menu]');
      if (first) { const selected = mediaCandidates(first); if (selected) setGallery(selected); }
      return;
    }
    const scroll = element.closest('.scroll');
    if (scroll) {
      const target = document.querySelector('.footer__fanpage');
      if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      return;
    }
    const navLink=element.closest('a[href]');
    if(navLink){
      const url=new URL(navLink.href,window.location.href);
      if(url.origin===window.location.origin && url.pathname==='/' && url.hash){
        event.preventDefault();goSection(decodeURIComponent(url.hash.slice(1)));return;
      }
    }
    // Click-to-preview only, never hijack swipe gestures or action links.
    if(Date.now()-draggedRef.current>350){
      const overlay=element.closest('.slideshow__info');
      const previewNode=overlay&&!element.closest('a,button')?overlay.closest('.slideshow__item')?.querySelector('img'):element;
      const selection=mediaCandidates(previewNode||element);
      if(selection){event.preventDefault();setGallery(selection);return;}
    }
    const a = element.closest('a[href]');
    if (!a || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || a.hasAttribute('download') || a.target === '_blank') return;
    const routeTarget = pathForNavigation(a.getAttribute('href'));
    if (routeTarget && routeTarget !== '/') {
      event.preventDefault();
      goSection(sectionForLegacy(routeTarget.split('?')[0]));
    } else if (routeTarget === '/' && window.location.pathname !== '/') {
      event.preventDefault(); goSection('top');
    }
  }

  function handleAssetError(event) {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.fallbackApplied === '1') return;
    img.dataset.fallbackApplied = '1';
    if (img.parentElement?.tagName === 'PICTURE') {
      img.parentElement.querySelectorAll('source').forEach((source) => source.remove());
    }
    img.src = img.closest('.navigation__logo,.footer__logo') ? '/logo-fallback.svg' : '/media-placeholder.svg';
    img.classList.add('asset-image-fallback');
  }

  function handleSubmit(event) {
    if (!event.target.matches('#form-contact, #form-newsletter')) return;
    event.preventDefault();
    const form = event.target;
    if (form.id === 'form-newsletter') {
      const email = new FormData(form).get('dataNewsletter[email]') || new FormData(form).get('email') || '';
      setNotice(`Form đăng ký nhận tin chưa có API gửi dữ liệu. ${email ? `Email nhập: ${email}` : ''}`);
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      setNotice('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }
    const data = new FormData(form);
    const lines = [...data.entries()]
      .filter(([key,value]) => value && !/csrf|recaptcha|type/i.test(key))
      .map(([key,value]) => `${key.replace(/dataContact\[|\]/g,'')}: ${value}`);
    const mailto = `mailto:nguyenquynhdiem1988@gmail.com?subject=${encodeURIComponent('Liên hệ từ website Mi House Spa')}&body=${encodeURIComponent(lines.join('\n'))}`;
    setNotice('Bản React chưa có máy chủ xử lý biểu mẫu. Đang mở ứng dụng email để gửi thông tin.');
    window.location.href = mailto;
  }

  return (
    <div className="site-root" onClick={handleClick} onPointerDownCapture={handlePointerDown} onPointerUpCapture={handlePointerUp} onSubmit={handleSubmit} onErrorCapture={handleAssetError}>
      <Header />
      <Navigation settings={cms?.settings||{}} additions={cms?.navigation||[]}/>
      {Page ? (
        <ErrorBoundary key={route}>
          <PageBoundary page={Page} route={route} cms={cms} />
        </ErrorBoundary>
      ) : (
        <main className="page-not-found"><h1>Không tìm thấy trang</h1><p>Website hiện chỉ có trang chủ dạng Landing Page.</p><a href="/">Về trang chủ</a></main>
      )}
      <Footer settings={cms?.settings||{}} />
      <FloatingContact />
      <ScrollToTop />
      <GalleryLightbox gallery={gallery} onClose={()=>setGallery(null)} onChange={(index)=>setGallery(g=>g?{...g,index}:g)}/>
      {notice && <div className="react-notice" role="status">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Đóng thông báo">×</button></div>}
    </div>
  );
}
