import React from 'react';
import AlbumShowcase from '../components/AlbumShowcase.jsx';
// Generated from the original Mi House Spa HTML; content and class names preserved.
export default function Page({cms}) {
  return (
    <main id="main-primary" data-landing="true">
      <div id="top" className="splide slideshow" style={{"aspectRatio": "1920/1000"}}>
        <div className="splide__track">
          <div className="splide__list slideshow__list">
            <div className="splide__slide slideshow__item">
              <figure className="slideshow__media">
                <picture className="w-100">
                  <source media="(max-width: 768px)" srcSet="https://mihousespa.com/thumbs/768x400x1/upload/photo/2026/09/20/d00e3664-67f6-4cc2-ab5b-b2fb8286b821-1789883238.webp" type="image/webp" width="768" height="400" />
                  <source media="(max-width: 1024px)" srcSet="https://mihousespa.com/thumbs/1024x534x1/upload/photo/2026/09/20/d00e3664-67f6-4cc2-ab5b-b2fb8286b821-1789883238.webp" type="image/webp" width="1024" height="534" />
                  <source media="(max-width: 1366px)" srcSet="https://mihousespa.com/thumbs/1366x712x1/upload/photo/2026/09/20/d00e3664-67f6-4cc2-ab5b-b2fb8286b821-1789883238.webp" type="image/webp" width="1366" height="712" />
                  <source media="(max-width: 1600px)" srcSet="https://mihousespa.com/thumbs/1600x834x1/upload/photo/2026/09/20/d00e3664-67f6-4cc2-ab5b-b2fb8286b821-1789883238.webp" type="image/webp" width="1600" height="834" />
                  <source media="(max-width: 1920px)" srcSet="https://mihousespa.com/thumbs/1920x1000x1/upload/photo/2026/09/20/d00e3664-67f6-4cc2-ab5b-b2fb8286b821-1789883238.webp" type="image/webp" width="1920" height="1000" />
                  <img className="slideshow__media-image w-100" src="https://mihousespa.com/thumbs/1920x1000x1/upload/photo/2026/09/20/d00e3664-67f6-4cc2-ab5b-b2fb8286b821-1789883238.webp" sizes="100vw" loading="eager" fetchPriority="high" decoding="async" alt="" width="1920" height="1000" />
                </picture>
              </figure>
              <div className="slideshow__info">
                <div className="slideshow__info-card">
                  <h3 className="slideshow__name"></h3>
                  <p className="slideshow__desc"></p>
                  <a className="slideshow__btn" href={/^(https?:\/\/|tel:|mailto:|\/(?!\/))/i.test(cms?.settings?.bookingLink || "") ? cms.settings.bookingLink : "https://zalo.me/0767882407"} target="_blank" rel="noopener noreferrer">
                    <span>
                      {"Đặt lịch hẹn ngay"}
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="splide__slide slideshow__item">
              <figure className="slideshow__media">
                <picture className="w-100">
                  <source media="(max-width: 768px)" srcSet="https://mihousespa.com/thumbs/768x400x1/upload/photo/2026/09/04/slide-raw-1788513430.webp" type="image/webp" width="768" height="400" />
                  <source media="(max-width: 1024px)" srcSet="https://mihousespa.com/thumbs/1024x534x1/upload/photo/2026/09/04/slide-raw-1788513430.webp" type="image/webp" width="1024" height="534" />
                  <source media="(max-width: 1366px)" srcSet="https://mihousespa.com/thumbs/1366x712x1/upload/photo/2026/09/04/slide-raw-1788513430.webp" type="image/webp" width="1366" height="712" />
                  <source media="(max-width: 1600px)" srcSet="https://mihousespa.com/thumbs/1600x834x1/upload/photo/2026/09/04/slide-raw-1788513430.webp" type="image/webp" width="1600" height="834" />
                  <source media="(max-width: 1920px)" srcSet="https://mihousespa.com/thumbs/1920x1000x1/upload/photo/2026/09/04/slide-raw-1788513430.webp" type="image/webp" width="1920" height="1000" />
                  <img className="slideshow__media-image w-100" src="https://mihousespa.com/thumbs/1920x1000x1/upload/photo/2026/09/04/slide-raw-1788513430.webp" sizes="100vw" loading="lazy" fetchPriority="auto" decoding="async" alt="Mi House" width="1920" height="1000" />
                </picture>
              </figure>
              <div className="slideshow__info">
                <div className="slideshow__info-card">
                  <h3 className="slideshow__name">
                    {"Mi House"}
                  </h3>
                  <p className="slideshow__desc">
                    {"Gội đầu dưỡng sinh"}
                  </p>
                  <a className="slideshow__btn" href={/^(https?:\/\/|tel:|mailto:|\/(?!\/))/i.test(cms?.settings?.bookingLink || "") ? cms.settings.bookingLink : "https://zalo.me/0767882407"} target="_blank" rel="noopener noreferrer">
                    <span>
                      {"Đặt lịch hẹn ngay"}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="gioi-thieu" className="intro">
        <div className="intro__container">
          <div className="intro__left lazy-background py:80 lg:w-100" data-bg-image="https://mihousespa.com/assets/images/intro-bg.jpg" data-bg-options="center / cover no-repeat">
            <div className="intro__info">
              <h2 className="intro__title">
                {"Đôi nét về"}
              </h2>
              <h3 className="intro__name">
                {"MI HOUSE SPA"}
              </h3>
              <p className="intro__slogan">
                {"Gội đầu dưỡng sinh - Massage body"}
              </p>
              <div className="intro__desc ck-editor">
                <p>
                  <strong>
                    {"Mi House Spa"}
                  </strong>
                  {" là địa chỉ chăm sóc sức khỏe và sắc đẹp theo phong cách dưỡng sinh tại Gò Vấp, TP.HCM. Với không gian mang gam màu "}
                  <strong>
                    {"nâu – be"}
                  </strong>
                  {" ấm áp, nhẹ nhàng cùng phong cách phục vụ tận tâm, Mi House Spa mang đến một nơi để bạn tạm gác lại những mệt mỏi, thư giãn cơ thể và chăm sóc bản thân sau những giờ làm việc, học tập bận rộn."}
                </p>
                <p>
                  {"Nếu bạn đang tìm kiếm một địa chỉ "}
                  <strong>
                    {"GỘI ĐẦU DƯỠNG SINH "}
                  </strong>
                  {" có không gian thư giãn, dịch vụ đa dạng và thuận tiện, Mi House Spa là một lựa chọn đáng để trải nghiệm. Spa tập trung vào các dịch vụ chăm sóc thư giãn như "}
                  <strong>
                    {"gội đầu dưỡng sinh, massage và nail"}
                  </strong>
                  {", đáp ứng nhu cầu chăm sóc cơ thể và làm đẹp trong cùng một không gian."}
                </p>
              </div>
            </div>
          </div>
          <div className="intro__right lg:w-100">
            <figure className="intro__media">
              <img className="intro__media-image w-100" src="https://mihousespa.com/thumbs/960x940x1/upload/news/2026/09/20/1wupukm89irozafcsrti31nwnjrvqtmdan2rgrkyqmrks5xaqqx5ys4mbt7cyoqazwh-1789886518.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="MI HOUSE SPA" width="960" height="940" />
            </figure>
          </div>
        </div>
      </section>
      <div className="marquee home__welcome bg:theme-brand py:30" data-speed="80">
        <div className="marquee__track">
          <div className="marquee__group">
            <img src="https://mihousespa.com/assets/images/icon-3stars.png" alt="" width="86" height="33" />
            <span>
              {"Mi House Spa"}
            </span>
          </div>
          <div className="marquee__group">
            <img src="https://mihousespa.com/assets/images/icon-3stars.png" alt="" width="86" height="33" />
            <span>
              {"Mi House Spa"}
            </span>
          </div>
        </div>
      </div>
      <section id="dich-vu" className="service-featured py:100">
        <div className="service-featured__container wrap-content">
          <header className="home__header service-featured__header xl:flex-100">
            <div className="home__subtitle fw:600 fsz:90 leading:tightest text-uppercase text-gradient gradient:#EDE3D1">
              {"Services"}
            </div>
            <h2 className="home__title ff:title fw:700 fsz:60 text-uppercase text:theme-brand m-0">
              {"Dịch vụ tiêu biểu"}
            </h2>
          </header>
          <div className="service__list service-featured__body xl:w-100">
            <div className="swiper swiper-auto" data-swiper="slidesPerView:1|breakpoints:{321:{slidesPerView:1},577:{slidesPerView:2},851:{slidesPerView:3},1025:{slidesPerView:3},1201:{slidesPerView:3}}|autoplay:{delay:5000,pauseOnMouseEnter:true,disableOnInteraction:false}|speed:1000|lazy:true|loop:true">
              <ul className="swiper-wrapper">
                <li className="swiper-slide">
                  <div className="service__item">
                    <article className="service__card">
                      <figure className="service__media">
                        <a className="service__media-link scale-img" title="GỘI ĐẦU DƯỠNG SINH">
                          <img className="service__media-image w-100" src="https://mihousespa.com/thumbs/500x800x1/upload/news/2026/09/10/anh-chup-man-hinh-2026-09-10-luc-124429-1789019075.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="GỘI ĐẦU DƯỠNG SINH" width="500" height="800" />
                        </a>
                      </figure>
                      <div className="service__info">
                        <h3 className="service__name">
                          <a className="text-split transition">
                            {"GỘI ĐẦU DƯỠNG SINH"}
                          </a>
                        </h3>
                      </div>
                    </article>
                  </div>
                </li>
                <li className="swiper-slide">
                  <div className="service__item">
                    <article className="service__card">
                      <figure className="service__media">
                        <a className="service__media-link scale-img" title="MASSAGE ">
                          <img className="service__media-image w-100" src="https://mihousespa.com/thumbs/500x800x1/upload/news/2026/09/10/anh-chup-man-hinh-2026-09-10-luc-124320-1789019006.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="MASSAGE " width="500" height="800" />
                        </a>
                      </figure>
                      <div className="service__info">
                        <h3 className="service__name">
                          <a className="text-split transition">
                            {"MASSAGE "}
                          </a>
                        </h3>
                      </div>
                    </article>
                  </div>
                </li>
                <li className="swiper-slide">
                  <div className="service__item">
                    <article className="service__card">
                      <figure className="service__media">
                        <a className="service__media-link scale-img" title="NAIL">
                          <img className="service__media-image w-100" src="https://mihousespa.com/thumbs/500x800x1/upload/news/2026/09/10/anh-chup-man-hinh-2026-09-10-luc-124213-1789018938.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="NAIL" width="500" height="800" />
                        </a>
                      </figure>
                      <div className="service__info">
                        <h3 className="service__name">
                          <a className="text-split transition">
                            {"NAIL"}
                          </a>
                        </h3>
                      </div>
                    </article>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="bang-gia" className="service-price lazy-background py:100" data-bg-image="https://mihousespa.com/assets/images/service-price-bg.png" data-bg-options="center top / cover no-repeat">
        <div className="wrap-content">
          <header className="home__header text-center mb:2.5rem">
            <div className="home__subtitle fw:600 fsz:90 leading:tightest text-uppercase text-gradient gradient:#ffffff80 mb:-32">
              {"Price service"}
            </div>
            <h2 className="home__title ff:title fw:600 fsz:42 leading:tight text-uppercase text:white">
              {"Bảng giá dịch vụ"}
            </h2>
          </header>
          <div className="service-price__list">
            <div className="swiper swiper-auto" data-swiper="slidesPerView:1|spaceBetween:10|breakpoints:{321:{slidesPerView:1,spaceBetween:10},577:{slidesPerView:2,spaceBetween:10},851:{slidesPerView:2,spaceBetween:10},1025:{slidesPerView:2,spaceBetween:16},1201:{slidesPerView:2,spaceBetween:20}}|autoplay:{delay:3000,pauseOnMouseEnter:true,disableOnInteraction:false}|speed:1000|lazy:true|loop:true">
              <ul className="swiper-wrapper">
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/23/menu-nail-bo-sung-1790155910.jpg" data-caption="Menu Nail Bổ sung 0">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/23/menu-nail-bo-sung-1790155910.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Nail Bổ sung 0" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/17898816489442758971624048143724387382050875048701cc973b66801fcd11d4932d9fd147ef2-1789882786.jpg" data-caption="Menu Mi House Spa 1">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/17898816489442758971624048143724387382050875048701cc973b66801fcd11d4932d9fd147ef2-1789882786.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 1" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/1789881648949275897162404814372438738205087504870194b9c8ef6a27c6e97f8baa1abfaaaad-1789882799.jpg" data-caption="Menu Mi House Spa 2">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/1789881648949275897162404814372438738205087504870194b9c8ef6a27c6e97f8baa1abfaaaad-1789882799.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 2" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/178988164895327589716240481437243873820508750487041d70bc844ee1e00e1534990ac36f4d8-1789882814.jpg" data-caption="Menu Mi House Spa 3">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/178988164895327589716240481437243873820508750487041d70bc844ee1e00e1534990ac36f4d8-1789882814.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 3" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/1789881648957275897162404814372438738205087504870e0c60a3802cef6741c051922791b025a-1789882828.jpg" data-caption="Menu Mi House Spa 4">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/1789881648957275897162404814372438738205087504870e0c60a3802cef6741c051922791b025a-1789882828.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 4" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/178988164896027589716240481437243873820508750487065726799551eaa4cf95af57102a66bed-1789882843.jpg" data-caption="Menu Mi House Spa 5">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/178988164896027589716240481437243873820508750487065726799551eaa4cf95af57102a66bed-1789882843.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 5" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/1789881648963275897162404814372438738205087504870cf9b38085c3bb92fe1672217309c8500-1789882860.jpg" data-caption="Menu Mi House Spa 6">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/1789881648963275897162404814372438738205087504870cf9b38085c3bb92fe1672217309c8500-1789882860.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 6" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/1789881648966275897162404814372438738205087504870bc4ed451578307486d494266516f5a55-1789882876.jpg" data-caption="Menu Mi House Spa 7">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/1789881648966275897162404814372438738205087504870bc4ed451578307486d494266516f5a55-1789882876.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 7" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/1789881648968275897162404814372438738205087504870a634f286fdbbb1adc223cebb938f3c9f-1789882893.jpg" data-caption="Menu Mi House Spa 8">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/1789881648968275897162404814372438738205087504870a634f286fdbbb1adc223cebb938f3c9f-1789882893.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 8" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/1789881648971275897162404814372438738205087504870ef9ef090b498dadf865f89f36b58d464-1789883012.jpg" data-caption="Menu Mi House Spa 9">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/1789881648971275897162404814372438738205087504870ef9ef090b498dadf865f89f36b58d464-1789883012.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 9" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/1789881648974275897162404814372438738205087504870d8d14d6ab4221854ea8a3ef9c2986680-1789882931.jpg" data-caption="Menu Mi House Spa 10">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/1789881648974275897162404814372438738205087504870d8d14d6ab4221854ea8a3ef9c2986680-1789882931.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 10" width="480" height="710" />
                  </figure>
                </li>
                <li className="swiper-slide">
                  <figure className="service-price__item" data-fancybox="menu" data-src="https://mihousespa.com/upload/news/2026/09/20/17898816489762758971624048143724387382050875048707c30ed86e6ebe29ceea4a6ef241a121c-1789882948.jpg" data-caption="Menu Mi House Spa 11">
                    <img className="service-price__image w-100" src="https://mihousespa.com/thumbs/480x710x1/upload/news/2026/09/20/17898816489762758971624048143724387382050875048707c30ed86e6ebe29ceea4a6ef241a121c-1789882948.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Menu Mi House Spa 11" width="480" height="710" />
                  </figure>
                </li>
              </ul>
            </div>
            <div className="service-price__aside">
              <p className="service-price__aside-title">
                {"Menu"}
              </p>
              <div className="service-price__aside-group">
                <p className="service-price__aside-name">
                  {"Mi House Spa"}
                </p>
                <button type="button" className="service-price__aside-btn" data-gallery-open="menu">Xem chi tiết</button>
                
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="vi-sao-chon" className="why-choose py:80">
        <div className="wrap-content">
          <header className="home__header text-center mb:2.5rem">
            <div className="home__subtitle fw:600 fsz:90 leading:tightest text-uppercase text-gradient gradient:#EDE3D1 my:-32">
              {"Why"}
            </div>
            <h2 className="home__title ff:title fw:600 fsz:42 leading:tight text-uppercase text:theme-brand-dark">
              {"Vì sao chọn Mi House Spa"}
            </h2>
            <p className="home__desc ff:body fsz:17 mb-0">
              {"Mi House Spa mang đến trải nghiệm dưỡng sinh tinh tế trong không gian nâu – be thanh lịch, ấm cúng. Với dịch vụ gội đầu dưỡng sinh, massage và nail được chăm chút chỉn chu, mỗi lần ghé spa là một lần bạn tận hưởng sự thư giãn trọn vẹn."}
            </p>
          </header>
          <div className="why-choose__list">
            <div className="swiper swiper-auto" data-swiper="slidesPerView:1|spaceBetween:16|breakpoints:{321:{slidesPerView:1,spaceBetween:16},577:{slidesPerView:2,spaceBetween:16},851:{slidesPerView:3,spaceBetween:16},1025:{slidesPerView:4,spaceBetween:16},1201:{slidesPerView:4,spaceBetween:16}}|autoplay:{delay:5000,pauseOnMouseEnter:true,disableOnInteraction:false}|speed:1000|lazy:true|loop:true">
              <ul className="swiper-wrapper">
                <li className="swiper-slide">
                  <article className="why-choose__item">
                    <figure className="why-choose__media">
                      <img className="why-choose__media-image" src="https://mihousespa.com/thumbs/100x70x2/upload/news/2026/09/05/why-choose-1-1788572570.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Uy tín chất lượng" width="100" height="70" />
                    </figure>
                    <div className="why-choose__info">
                      <h3 className="why-choose__name">
                        {"Uy tín chất lượng"}
                      </h3>
                      <p className="why-choose__desc">
                        {"Tận tâm trong từng dịch vụ, chú trọng chất lượng và mang đến trải nghiệm chăm sóc sắc đẹp, thư giãn đáng tin cậy cho mỗi khách hàng."}
                      </p>
                    </div>
                  </article>
                </li>
                <li className="swiper-slide">
                  <article className="why-choose__item">
                    <figure className="why-choose__media">
                      <img className="why-choose__media-image" src="https://mihousespa.com/thumbs/100x70x2/upload/news/2026/09/05/why-choose-2-1788572589.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Chi phí hợp lý" width="100" height="70" />
                    </figure>
                    <div className="why-choose__info">
                      <h3 className="why-choose__name">
                        {"Chi phí hợp lý"}
                      </h3>
                      <p className="why-choose__desc">
                        {"Mức giá hợp lý, minh bạch, phù hợp với nhu cầu làm đẹp và thư giãn của nhiều khách hàng."}
                      </p>
                    </div>
                  </article>
                </li>
                <li className="swiper-slide">
                  <article className="why-choose__item">
                    <figure className="why-choose__media">
                      <img className="why-choose__media-image" src="https://mihousespa.com/thumbs/100x70x2/upload/news/2026/09/05/why-choose-3-1788572598.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Không gian sang trọng" width="100" height="70" />
                    </figure>
                    <div className="why-choose__info">
                      <h3 className="why-choose__name">
                        {"Không gian sang trọng"}
                      </h3>
                      <p className="why-choose__desc">
                        {"Không gian nâu – be tinh tế, ấm cúng và thanh lịch, mang đến cảm giác thư giãn và thoải mái ngay từ khi bước vào."}
                      </p>
                    </div>
                  </article>
                </li>
                <li className="swiper-slide">
                  <article className="why-choose__item">
                    <figure className="why-choose__media">
                      <img className="why-choose__media-image" src="https://mihousespa.com/thumbs/100x70x2/upload/news/2026/09/05/why-choose-4-1788572607.webp" loading="lazy" fetchPriority="auto" decoding="async" alt="Tư vấn nhiệt tình" width="100" height="70" />
                    </figure>
                    <div className="why-choose__info">
                      <h3 className="why-choose__name">
                        {"Tư vấn nhiệt tình"}
                      </h3>
                      <p className="why-choose__desc">
                        {"Đội ngũ Mi House Spa luôn lắng nghe, tư vấn tận tình và hỗ trợ khách hàng lựa chọn dịch vụ phù hợp với nhu cầu, sở thích và mong muốn cá nhân."}
                      </p>
                    </div>
                  </article>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="dao-tao" className="training-featured training-landing py:100">
        <div className="wrap-content">
          <header className="home__header text-center"><div className="home__subtitle">TRAIN</div><h2 className="home__title">Đào tạo học viên</h2></header>
          <div className="training-landing__grid mh-swipe-strip" aria-label="Các chuyên ngành đào tạo">
            {[
              ['Đào tạo Nail','trainingNail','https://mihousespa.com/thumbs/500x800x1/upload/news/2026/09/10/anh-chup-man-hinh-2026-09-10-luc-124213-1789018938.webp'],
              ['Đào tạo Gội đầu','trainingHair','https://mihousespa.com/thumbs/500x690x1/upload/news/2026/09/10/khong-gian-3-1789038355.webp'],
              ['Đào tạo Massage','trainingMassage','https://mihousespa.com/thumbs/500x800x1/upload/news/2026/09/10/anh-chup-man-hinh-2026-09-10-luc-124320-1789019006.webp'],
            ].map(([title,key,src])=><article className="training-landing__card" key={key}>
              <button type="button" className="training-landing__image-button" aria-label={'Xem ảnh '+title} data-lightbox="training">
                <img className="training-landing__image" src={cms?.settings?.[key+'Image']||src} alt={cms?.settings?.[key+'Title']||title} loading="lazy"/>
              </button>
              <h3 className="training-landing__name">{cms?.settings?.[key+'Title']||title}</h3>
            </article>)}
          </div>
        </div>
      </section>
      <AlbumShowcase/>
      <div className="marquee home__welcome bg:theme-brand py:30" data-speed="80">
        <div className="marquee__track">
          <div className="marquee__group">
            <img src="https://mihousespa.com/assets/images/icon-3stars.png" alt="" width="86" height="33" />
            <span>
              {"Mi House Spa"}
            </span>
          </div>
          <div className="marquee__group">
            <img src="https://mihousespa.com/assets/images/icon-3stars.png" alt="" width="86" height="33" />
            <span>
              {"Mi House Spa"}
            </span>
          </div>
        </div>
      </div>
      <section id="tiktok" className="video-featured my:100">
        <div className="video-featured__container wrap-content">
          <header className="home__header video-featured__header xl:flex-100">
            <div className="home__subtitle fw:600 fsz:90 leading:tightest text-uppercase text-gradient gradient:#EDE3D1">
              {"Tiktok"}
            </div>
            <h2 className="home__title ff:title fw:700 fsz:60 text-uppercase text:theme-brand m-0">
              {"Liên kết tiktok"}
            </h2>
          </header>
          <div className="video__list video-featured__body xl:w-100">
            <div className="swiper swiper-auto" data-swiper="slidesPerView:1|spaceBetween:10|breakpoints:{321:{slidesPerView:2,spaceBetween:10},577:{slidesPerView:2,spaceBetween:10},851:{slidesPerView:3,spaceBetween:16},1025:{slidesPerView:3,spaceBetween:24},1201:{slidesPerView:3,spaceBetween:40}}|autoplay:{delay:5000,pauseOnMouseEnter:true,disableOnInteraction:false}|speed:1000|lazy:true|loop:true">
              <ul className="swiper-wrapper">
                <li className="swiper-slide">
                  <div className="video__item">
                    <article className="video__card" data-fancybox="video" data-src="https://mihousespa.com/upload/file/missaa3137663155697017785620-1789034316.mp4" data-caption=" ">
                      <figure className="video__media scale-img play-icon">
                        <img className="video__media-image w-100" src="https://mihousespa.com/thumbs/420x670x1/upload/news/2026/09/10/anh-chup-man-hinh-2026-09-10-luc-165825-1789034316.webp" loading="lazy" fetchPriority="auto" decoding="async" alt=" " width="420" height="670" />
                      </figure>
                      <h3 className="video__name text-split">
                        {" "}
                      </h3>
                    </article>
                  </div>
                </li>
                <li className="swiper-slide">
                  <div className="video__item">
                    <article className="video__card" data-fancybox="video" data-src="https://mihousespa.com/upload/file/meilnail77649745681149627669-1789034265.mp4" data-caption=" ">
                      <figure className="video__media scale-img play-icon">
                        <img className="video__media-image w-100" src="https://mihousespa.com/thumbs/420x670x1/upload/news/2026/09/10/anh-chup-man-hinh-2026-09-10-luc-165738-1789034266.webp" loading="lazy" fetchPriority="auto" decoding="async" alt=" " width="420" height="670" />
                      </figure>
                      <h3 className="video__name text-split">
                        {" "}
                      </h3>
                    </article>
                  </div>
                </li>
                <li className="swiper-slide">
                  <div className="video__item">
                    <article className="video__card" data-fancybox="video" data-src="https://mihousespa.com/upload/file/darkbabenails7666390344141409556-1789034160.mp4" data-caption=" ">
                      <figure className="video__media scale-img play-icon">
                        <img className="video__media-image w-100" src="https://mihousespa.com/thumbs/420x670x1/upload/news/2026/09/10/anh-chup-man-hinh-2026-09-10-luc-165651-1789034224.webp" loading="lazy" fetchPriority="auto" decoding="async" alt=" " width="420" height="670" />
                      </figure>
                      <h3 className="video__name text-split">
                        {" "}
                      </h3>
                    </article>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
