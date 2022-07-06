/*
 * Drawer.jsx - Компонент корзины с товарами.
 *
 */

import React from 'react';
import CartItem from './CartItem';

function Drawer() {
  return (
    <div className="drawer_overlay">
      <div className="drawer">
        <header className="drawer_headerbar">
          <h2 className="drawer_title">Корзина</h2>

          <button className="btn-close" title="Закрыть корзину">
            <img
              src="/img/icons/ic-delete_this_item.svg"
              alt="Exit cart"
              className="ic-delete_this_item"
            />
          </button>
        </header>

        <div className="items-container">
          <CartItem />
        </div>

        <article className="summary">
          <ul className="summary_list">
            <li className="summary_list_item">
              <span className="total_price">
                Итого: <div className="dashed"></div> <b>35.99$</b>
              </span>
            </li>
            <li className="summary_list_item">
              <span className="from_nds">
                Налог 5%: <div className="dashed"></div> <b>1.5$</b>
              </span>
            </li>
          </ul>

          <button className="btn-checkout" title="Нажмите чтобы перейти к оформлению">
            <span className="txt">Оформить заказ</span>
            <img
              src="/img/icons/ic-arrow-right.svg"
              alt="icon arrow right"
              className="ic-arrow-right"
            />
          </button>
        </article>
      </div>
    </div>
  );
}

export default Drawer;
