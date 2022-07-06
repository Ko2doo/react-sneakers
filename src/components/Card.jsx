/*
 * Card.jsx - компонент карточки товара для главной страницы.
 *
 *
 */

import React from 'react';

function Card() {
  return (
    <article className="card">
      <div className="card_headerbar">
        <button className="add_to_favorite" title="Добавить в избранное">
          <img src="/img/icons/ic-heart-onliked.png" alt="Onliked" className="icon_onliked" />
        </button>

        <button className="check_for_favorite" title="Показать в избранном">
          <img src="/img/icons/ic-heart-liked.svg" alt="Liked" className="icon_onliked" />
        </button>
      </div>

      <img src="/img/items/item1.png" alt="sneakers preview" className="card_preview" />
      <p className="card_prodname">Мужские Кроссовки Nike Blazer Mid Suede</p>

      <div className="card_footer">
        <div className="card_cost">
          <span>Цена:</span>
          <b>24.44$</b>
        </div>
        <button className="add_to_card" title="Добавить товар в корзину">
          <img src="/img/icons/ic-add.svg" className="icon_card-card" />
        </button>
      </div>
    </article>
  );
}

export default Card;
