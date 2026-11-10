// Native React-side progressive enhancement for the original CSS class structure.
// Core page rendering does not depend on the old jQuery/PHP runtime.
import cachedAssets from '../assetMap.json';

const ORIGIN = 'https://mihousespa.com/';

function makeAbsolute(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url, ORIGIN);
    if (['mihousespa.com', 'www.mihousespa.com'].includes(parsed.hostname) && cachedAssets[parsed.pathname]) {
      return cachedAssets[parsed.pathname];
    }
    if (url.startsWith('/') && url in cachedAssets) return cachedAssets[url];
    return parsed.href.replace(/^http:\/\/mihousespa\.com/i, ORIGIN.slice(0, -1));
  } catch { return url; }
}

function backgrounds(container) {
  for (const el of container.querySelectorAll('[data-bg-image]')) {
    const url = makeAbsolute(el.dataset.bgImage);
    const opts = el.dataset.bgOptions || 'center / cover no-repeat';
    if (url) {
      el.style.background = `url("${url}") ${opts}`;
      if (el.classList.contains("service-price")) {
        el.style.backgroundImage = `linear-gradient(90deg,rgba(34,16,8,.79),rgba(42,21,11,.55)),url("${url}")`;
      }
    }
  }
}

function sliders(container, cleanup) {
  for (const slider of container.querySelectorAll('.splide')) {
    // Album galleries use native horizontal scrolling to support dragging and continuous autoplay.
    if (slider.classList.contains('album-featured__splide')) continue;
    const list = slider.querySelector('.splide__list');
    const track = slider.querySelector('.splide__track');
    if (!list || !track) continue;
    const slides = [...list.querySelectorAll(':scope > .splide__slide')];
    if (slides.length < 2) continue;
    slider.classList.add('is-initialized');
    track.style.overflow = 'hidden';
    list.style.display = 'flex';
    list.style.transition = 'transform 650ms cubic-bezier(.22,.61,.36,1)';
    list.style.willChange = 'transform';
    slides.forEach(s => { s.style.flex = '0 0 100%'; s.style.minWidth = '0'; });
    let index = 0;
    const previous = document.createElement('button');
    const next = document.createElement('button');
    previous.className = 'react-slider-arrow react-slider-arrow--prev';
    next.className = 'react-slider-arrow react-slider-arrow--next';
    previous.type = 'button'; next.type = 'button';
    previous.textContent = '‹'; next.textContent = '›';
    previous.setAttribute('aria-label', 'Ảnh trước');
    next.setAttribute('aria-label', 'Ảnh tiếp theo');
    const dots = document.createElement('div');
    dots.className = 'react-slider-dots';
    const dotButtons = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Đến ảnh ${i + 1}`);
      dot.addEventListener('click', () => show(i));
      dots.append(dot);
      return dot;
    });
    function show(n) {
      index = (n + slides.length) % slides.length;
      list.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide,i) => slide.classList.toggle('is-active', i === index));
      dotButtons.forEach((dot,i) => dot.classList.toggle('is-active', i === index));
    }
    const goPrevious = () => show(index - 1);
    const goNext = () => show(index + 1);
    previous.addEventListener('click', goPrevious);
    next.addEventListener('click', goNext);
    slider.append(previous,next,dots);
    show(0);
    // Swipe left/right on the slideshow, with mouse or a finger.
    let startX = null, startY = null;
    const touchStart = event => { startX = event.touches[0]?.clientX ?? null; startY = event.touches[0]?.clientY ?? null; };
    const touchEnd = event => {
      if (startX === null || !event.changedTouches[0]) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) show(index + (dx < 0 ? 1 : -1));
      startX = null; startY = null;
    };
    track.addEventListener('touchstart',touchStart,{passive:true});
    track.addEventListener('touchend',touchEnd,{passive:true});
    let timer = setInterval(goNext, 6000);
    const pause = () => clearInterval(timer);
    const resume = () => { clearInterval(timer); timer = setInterval(goNext, 6000); };
    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', resume);
    cleanup.push(() => {
      clearInterval(timer);
      slider.removeEventListener('mouseenter', pause);
      slider.removeEventListener('mouseleave', resume);
      previous.removeEventListener('click', goPrevious);
      next.removeEventListener('click', goNext);
      track.removeEventListener('touchstart',touchStart);
      track.removeEventListener('touchend',touchEnd);
      previous.remove(); next.remove(); dots.remove();
    });
  }
}

function swiperCarousels(container, cleanup) {
  for (const swiper of container.querySelectorAll('.swiper-auto')) {
    if (swiper.closest('.service-price')) continue; // original Swiper is initialized separately
    const list = swiper.querySelector('.swiper-wrapper');
    if (!list) continue;
    const children = [...list.children].filter(el => el.classList.contains('swiper-slide'));
    if (children.length < 2) continue;
    const spec = swiper.dataset.swiper || '';
    const breakpoints = [...spec.matchAll(/(\d+):\{slidesPerView:(\d+)/g)].map(m => ({ w:Number(m[1]), count:Number(m[2]) }));
    const gap = Number(spec.match(/spaceBetween:(\d+)/)?.[1] || 16);
    const delay = Number(spec.match(/autoplay:\{delay:(\d+)/)?.[1] || 0);
    const isPrice = !!swiper.closest('.service-price');
    list.style.display = 'flex';
    list.style.overflowX = 'auto';
    list.style.overflowY = 'hidden';
    list.style.scrollBehavior = 'smooth';
    list.style.scrollSnapType = 'x mandatory';
    list.style.gap = `${gap}px`;
    list.style.scrollbarWidth = 'none';
    children.forEach(el => { el.style.scrollSnapAlign = 'start'; el.style.minWidth='0'; });
    function resize() {
      const width = window.innerWidth;
      const allowed = breakpoints.filter(x => x.w <= width);
      const perView = isPrice ? (width >= 720 ? 2 : 1) : (allowed.length ? allowed[allowed.length-1].count : 1);
      children.forEach(el => { el.style.flex = `0 0 calc((100% - ${(perView - 1) * gap}px) / ${perView})`; });
    }
    resize();
    window.addEventListener('resize', resize);
    let interval;
    let paused = false;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    if (spec.includes('pauseOnMouseEnter:true')) {
      swiper.addEventListener('mouseenter', pause);
      swiper.addEventListener('mouseleave', resume);
    }
    if (delay > 0) interval = setInterval(() => {
      if (paused || document.hidden) return;
      const max = list.scrollWidth - list.clientWidth;
      if (max <= 0) return;
      const step = children[0].getBoundingClientRect().width + gap;
      list.scrollTo({ left: list.scrollLeft >= max - 2 ? 0 : Math.min(max,list.scrollLeft + step), behavior: 'smooth' });
    }, delay);
    cleanup.push(() => {
      window.removeEventListener('resize', resize);
      swiper.removeEventListener('mouseenter', pause);
      swiper.removeEventListener('mouseleave', resume);
      clearInterval(interval);
    });
  }
}

function addObserver(container, cleanup) {
  // Most images already have src; data-src is used for deferred media and lazy embeds.
  const list = [...container.querySelectorAll('img[data-src], iframe[data-src], video[data-src]')];
  const load = (el) => {
    if (!el.getAttribute('src')) el.src = makeAbsolute(el.dataset.src);
    if (el.dataset.srcset && !el.getAttribute('srcset')) el.srcset = el.dataset.srcset;
  };
  if (!('IntersectionObserver' in window)) { list.forEach(load); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      load(entry.target);
      observer.unobserve(entry.target);
    });
  },{ rootMargin: '350px' });
  list.forEach(el => observer.observe(el));
  cleanup.push(() => observer.disconnect());
}

/** Restore the news/article table of contents generated by the old site's JS. */
function tableOfContents(container, cleanup) {
  const toc = container.querySelector('.js-content-toc');
  const content = container.querySelector('.content-main');
  if (!toc || !content) return;
  const list = toc.querySelector('.box-toc__list');
  const header = toc.querySelector('.box-toc__header');
  if (!list || !header) return;
  const headings = [...content.querySelectorAll('h2,h3')].filter(h => h.textContent.trim());
  if (!headings.length) return;
  const newIds = [];
  headings.forEach((heading, i) => {
    if (!heading.id) {
      heading.id = `mhs-section-${i + 1}`;
      newIds.push(heading);
    }
    const li = document.createElement('li');
    li.style.marginLeft = heading.tagName === 'H3' ? '15px' : '0';
    const anchor = document.createElement('a');
    anchor.href = `#${heading.id}`;
    anchor.textContent = heading.textContent.trim();
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${heading.id}`);
    });
    li.append(anchor);
    list.append(li);
  });
  toc.style.display = 'block';
  header.setAttribute('role','button');
  header.setAttribute('tabindex','0');
  header.setAttribute('aria-expanded','true');
  const toggle = () => {
    toc.classList.toggle('is-collapsed');
    header.setAttribute('aria-expanded', String(!toc.classList.contains('is-collapsed')));
  };
  const key = event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); } };
  header.addEventListener('click', toggle);
  header.addEventListener('keydown', key);
  cleanup.push(() => {
    list.textContent='';
    newIds.forEach(node => node.removeAttribute('id'));
    toc.style.display = 'none';
    header.removeEventListener('click',toggle);
    header.removeEventListener('keydown',key);
  });
}

function animateOnScroll(container, cleanup) {
  const items = container.querySelectorAll('[data-aos], [data-scroll-animate], .scroll-animate');
  if (!items.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated','is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
  cleanup.push(() => observer.disconnect());
}

export function enhancePage() {
  const container = document.getElementById('main-primary');
  if (!container) return undefined;
  const cleanup = [];
  backgrounds(container);
  sliders(container, cleanup);
  swiperCarousels(container, cleanup);
  addObserver(container, cleanup);
  animateOnScroll(container, cleanup);
  tableOfContents(container, cleanup);
  return () => cleanup.forEach(dispose => dispose());
}
