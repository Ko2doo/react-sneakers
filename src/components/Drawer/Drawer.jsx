/*
 * Drawer.jsx - Компонент корзины с товарами.
 *
 */

import React from 'react';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';

import CartItem from '../CartItem/CartItem';
import Info from '../Info/Info';

import style from './Drawer.module.scss';

/*
 * с помощью деструктуризации передаем вместо props onClose и items,
 * объявив что items - по умолчанию является пустым массивом (т.е. корзина по умолчанию пуста).
 */
function Drawer({ onClose, onRemove, items = [] }) {
  //hook
  const { cartItems, setCartItems, totalPrice } = useCart();

  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // отслеживаем нажатие кнопки заказа товара
  const onClickOrder = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.post('https://63c13cbd99c0a15d28e4c103.mockapi.io/orders', {
        items: cartItems,
      });

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
    } catch (error) {
      alert('Не удалось создать заказ :(');

      console.error(error);
    }

    setIsLoading(false);
  };

  // cartItem card
  let cartItem = items.map((obj) => (
    <CartItem
      key={obj.id}
      id={obj.id}
      imageUrl={obj.imageUrl}
      title={obj.title}
      price={obj.price}
      onRemove={() => onRemove(obj.id)}
    />
  ));

  return (
    <div className={style.drawer_overlay}>
      <aside className={style.drawer}>
        <header className={style.drawer_headerbar}>
          <h2 className={style.drawer_title}>Корзина</h2>

          <button onClick={onClose} className={style.btn_close} title="Закрыть корзину">
            <img
              src="img/icons/ic-delete_this_item.svg"
              alt="Exit cart"
              className={style.ic_delete_this_item}
            />
          </button>
        </header>

        {items.length > 0 ? (
          <main className={style.content}>
            <div className={style.items_container}>{cartItem}</div>
            <article className={style.summary}>
              <ul className={style.summary_list}>
                <li className={style.summary_list_item}>
                  <span className={style.total_price}>
                    Итого: <div className={style.dashed}></div> <b>{totalPrice}$</b>
                  </span>
                </li>
                <li className={style.summary_list_item}>
                  <span className={style.from_nds}>
                    Налог 5%: <div className={style.dashed}></div> <b>{(totalPrice / 100) * 5}$</b>
                  </span>
                </li>
              </ul>

              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className={style.btn_checkout}
                title="Нажмите чтобы перейти к оформлению">
                <span className={style.txt}>Оформить заказ</span>
                <img
                  src="img/icons/ic-arrow-right.svg"
                  alt="icon arrow right"
                  className={style.ic_arrow_right}
                />
              </button>
            </article>
          </main>
        ) : (
          <main className={style.content}>
            <Info
              title={isOrderComplete ? 'Заказ Оформлен' : 'Корзина пустая'}
              description={
                isOrderComplete
                  ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                  : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
              }
              imageUrl={isOrderComplete ? 'img/icons/ic-order-complite.png' : 'img/icons/box.svg'}
            />
          </main>
        )}
      </aside>
    </div>
  );
}

export default Drawer;
