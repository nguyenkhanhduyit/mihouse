import React from 'react';
import albumGroups from '../../album-source-map.json';
/** Two continuous visual galleries: first heading before photos, second heading after photos.
 *  Follows the markup order of uploaded _home.html, not the legacy category template. */
export default function AlbumShowcase() {
  return (
    <section id="album-anh" className="album-featured py:80" aria-label="Album ảnh Mi House Spa">
      {albumGroups.map((group,index)=>(
        <div className="album-featured__list" id={index===0?'nail-hottrend':'khong-gian'} key={group.title}>
          {index===0&&<h3 className="album-featured__title">{group.title}</h3>}
          <div className="splide album-featured__splide">
            <div className="splide__track" tabIndex="0" aria-label={'Vuốt ngang để xem ảnh '+group.title}>
              <div className="splide__list">
                {group.images.map((photo,i)=>(
                  <div className="splide__slide" key={photo.src}>
                    <figure className="album-featured__item" data-fancybox={'album-'+index} data-caption={group.title+' · '+(i+1)} data-src={photo.src}>
                      <img className="album-featured__image w-100" src={photo.src} alt={photo.alt+' '+(i+1)} loading="lazy" decoding="async" width="360" height="360"/>
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {index===1&&<h3 className="album-featured__title">{group.title}</h3>}
        </div>
      ))}
    </section>
  );
}
