/*
 * Card.jsx - компонент карточки товара для главной страницы.
 *
 *
 */

import React from 'react';

function Card(props) {
  return (
    <article className="card">
      <div className="card_headerbar">
        <button className="add_to_favorite" title="Добавить в избранное">
          <img src="/img/icons/ic-heart-onliked.png" alt="Onliked" className="icon_onliked" />
        </button>

        <button className="check_for_favorite" title="Показать в избранном">
          <img src="/img/icons/ic-heart-liked.svg" alt="Liked" className="icon_liked" />
        </button>
      </div>

      <img src={props.imageUrl} alt="sneakers preview" className="card_preview" />

      <p className="card_prodname">{props.productTitle}</p>

      <div className="card_footer">
        <div className="card_cost">
          <span>Цена:</span>
          <b> {props.productPrice} $</b>
        </div>
        <button className="add_to_card" title="Добавить товар в корзину">
          <img src="/img/icons/ic-add.svg" alt="icon" className="icon_card-card" />
        </button>
      </div>
    </article>
  );
}

export default Card;
