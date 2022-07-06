/*
 * CartItem.jsx - компонент карточки товара,
 * добавленный в корзину.
 */

import React from 'react';

function CartItem() {
  return (
    <article className="cart_item">
      <img src="/img/items/item2.png" alt="Sneakers preview" className="cart_item__preview" />

      <div className="product_info">
        <p className="cart_item__prodname">Мужские Кроссовки Nike Air Max 270</p>
        <span className="cart_item__prodcost">35.99$</span>
      </div>
      <button className="btn-remove" title="Удалить из корзины">
        <img
          src="/img/icons/ic-delete_this_item.svg"
          alt="Delete this item"
          className="ic-delete_this_item"
        />
      </button>
    </article>
  );
}

export default CartItem;
