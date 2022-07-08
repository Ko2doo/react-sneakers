/*
 * Card.jsx - компонент карточки товара для главной страницы.
 *
 *
 */

import React from 'react';

import style from './Card.module.scss';

function Card(props) {
  const addToCart = () => {
    alert(props.productTitle + ' - ' + props.productPrice);
  };

  return (
    <article className={style.card}>
      <div className={style.card_headerbar}>
        <button className={style.add_to_favorite} title="Добавить в избранное">
          <img src="/img/icons/ic-heart-onliked.png" alt="Onliked" className={style.icon_onliked} />
        </button>

        <button className={style.check_for_favorite} title="Показать в избранном">
          <img src="/img/icons/ic-heart-liked.svg" alt="Liked" className={style.icon_liked} />
        </button>
      </div>

      <img src={props.imageUrl} alt="sneakers preview" className={style.card_preview} />

      <p className={style.card_prodname}>{props.productTitle}</p>

      <div className={style.card_footer}>
        <div className={style.card_cost}>
          <span>Цена:</span>
          <b> {props.productPrice} $</b>
        </div>
        <button onClick={addToCart} className={style.add_to_card} title="Добавить тов ар в корзину">
          <img src="/img/icons/ic-add.svg" alt="icon" className={style.icon_card} />
        </button>
      </div>
    </article>
  );
}

export default Card;
