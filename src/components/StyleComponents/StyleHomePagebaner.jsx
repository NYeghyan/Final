import * as React from 'react';
import mainImg from '../../images/mainBaner.jpg';
import style from './StyleHomePagebaner.module.css';

export default function StyleHomePagebaner() {
  return (
    <div className={style.banner}>
      <div className={style.homeBanner}>
        <div className={style.bannerInfo}>
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <div>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
          </div>
        </div>
        <div className={style.containerImg}>
          <img src={mainImg} alt="" className={style.backImg} />
        </div>
        <div className={style.divOpasyty} />
      </div>
    </div>
  );
}
