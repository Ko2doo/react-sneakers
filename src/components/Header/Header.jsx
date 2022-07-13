/*
 * Header.jsx - компонент шапка приложения.
 */

import React from 'react';
import style from './Header.module.scss';

function Header() {
  return (
    <header className={style.header}>
      <div className={style.header_slogan_element}>
        <img src="/img/icons/ic-sneakers.svg" alt="Sneakers logotype" className={style.ic_logo} />
        <div className={style.market_name}>
          <h3 className={style.market_title}>React Sneakers</h3>
          <p className={style.market_misc}>Магазин лучших кроссовок</p>
        </div>
      </div>

      <div className={style.header_userbar_element}>
        <ul className={style.userbar}>
          <li className={style.userbar_item}>
            <button className={style.btn_drawer}>
              <img src="/img/icons/ic-card.svg" alt="icon card" className={style.ic_card} />
              <span>22.44$</span>
            </button>
          </li>
          <li className={style.userbar_item}>
            <img src="/img/icons/ic-userbar.svg" alt="icon userbar" className={style.ic_userbar} />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
