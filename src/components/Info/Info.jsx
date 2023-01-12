/*
 * Info.jsx -> компонент с информацией о товаре
 * Используется в корзине и в избранном
 **/

import React from 'react';
import style from './Info.module.scss';
import { AppContext } from '../../App';

export const Info = ({ imageUrl, title, description }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className={style.cart_state}>
      <img className={style.emty_box_image} src={imageUrl} alt={title} />

      <h2 className={style.title}>{title}</h2>

      <p className={style.inform}>{description}</p>

      <button
        onClick={() => setCartOpened(false)}
        className={style.btn_goback}
        title="Вернуться назад">
        <span className={style.btn_name}>Вернуться назад</span>
        <img className={style.ic_arrow_left} src="/img/icons/ic-arrow-left.svg" alt="Icon item" />
      </button>
    </div>
  );
};

export default Info;
