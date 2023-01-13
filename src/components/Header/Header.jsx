/*
 * Header.jsx - компонент шапка приложения.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

import style from './Header.module.scss';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className={style.header}>
      <div className={style.link_element}>
        <Link to="/react-sneakers" className={style.link_to_generalpage}>
          <img src="img/icons/ic-sneakers.svg" alt="Sneakers logotype" className={style.ic_logo} />

          <div className={style.market_name}>
            <h3 className={style.market_title}>React Sneakers</h3>
            <p className={style.market_misc}>Магазин лучших кроссовок</p>
          </div>
        </Link>
      </div>

      <nav className={style.navbar}>
        <ul className={style.userbar}>
          <li className={style.userbar_item}>
            <button
              onClick={props.onClickCart}
              className={style.btn_drawer}
              title="Нажмите для открытия корзины">
              <img src="img/icons/ic-card.svg" alt="cart" className={style.ic_card} />
              <span>{totalPrice}$</span>
            </button>
          </li>
          <li className={style.userbar_item}>
            <Link title="Переход в избранное" className={style.favorite_link} to="/favorites">
              <img src="img/icons/ic-addmefavorite.svg" alt="favorites" />
            </Link>
          </li>
          <li className={style.userbar_item}>
            <Link title="Переход к покупкам" className={style.favorite_link} to="/orders">
              <img src="img/icons/ic-userbar.svg" alt="user" className={style.ic_userbar} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
