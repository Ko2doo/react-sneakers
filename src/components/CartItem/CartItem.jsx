/*
 * CartItem.jsx - компонент карточки товара,
 * добавленный в корзину.
 */

import React from 'react';
import style from './CartItem.module.scss';

function CartItem(props) {
  return (
    <article className={style.cart_item}>
      <img src={props.imageUrl} alt="Sneakers preview" className={style.cart_item__preview} />

      <div className={style.product_info}>
        <p className={style.cart_item__prodname}>{props.title}</p>
        <span className={style.cart_item__prodcost}>{props.price} $</span>
      </div>
      <button onClick={props.onRemove} className={style.btn_remove} title="Удалить из корзины">
        <img
          src="img/icons/ic-delete_this_item.svg"
          alt="Delete this item"
          className={style.ic_delete_this_item}
        />
      </button>
    </article>
  );
}

export default CartItem;
