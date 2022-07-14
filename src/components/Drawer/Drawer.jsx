/*
 * Drawer.jsx - Компонент корзины с товарами.
 *
 */

import React from 'react';
import CartItem from '../CartItem/CartItem';
import style from './Drawer.module.scss';

/*
 * с помощью деструктуризации передаем вместо props onClose и items,
 * объявив что items - по умолчанию является пустым массивом (т.е. корзина по умолчанию пуста).
 */
function Drawer({ onClose, items = [] }) {
  // cartItem card
  let cartItem = items.map((obj) => (
    <CartItem
      id={obj.id}
      key={obj.id}
      imageUrl={obj.imageUrl}
      title={obj.title}
      price={obj.price}
    />
  ));

  return (
    <div className={style.drawer_overlay}>
      <div className={style.drawer}>
        <header className={style.drawer_headerbar}>
          <h2 className={style.drawer_title}>Корзина</h2>

          <button onClick={onClose} className={style.btn_close} title="Закрыть корзину">
            <img
              src="/img/icons/ic-delete_this_item.svg"
              alt="Exit cart"
              className={style.ic_delete_this_item}
            />
          </button>
        </header>

        <div className={style.items_container}>{cartItem}</div>

        <article className={style.summary}>
          <ul className={style.summary_list}>
            <li className={style.summary_list_item}>
              <span className={style.total_price}>
                Итого: <div className={style.dashed}></div> <b>35.99$</b>
              </span>
            </li>
            <li className={style.summary_list_item}>
              <span className={style.from_nds}>
                Налог 5%: <div className={style.dashed}></div> <b>1.5$</b>
              </span>
            </li>
          </ul>

          <button className={style.btn_checkout} title="Нажмите чтобы перейти к оформлению">
            <span className={style.txt}>Оформить заказ</span>
            <img
              src="/img/icons/ic-arrow-right.svg"
              alt="icon arrow right"
              className={style.ic_arrow_right}
            />
          </button>
        </article>
      </div>
    </div>
  );
}

export default Drawer;
