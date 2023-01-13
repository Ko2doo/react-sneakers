/*
 *   Orders.jsx -> страница заказов
 *   Реализована локальная загрузка заказанных товаров
 *
 **/

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { AppContext } from '../../App';

import style from './Orders.module.scss';

function Orders() {
  const { onAddToFavorites } = React.useContext(AppContext); // выстаскиваем из контекста две функции
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); // для этой страницы используем свою загрузку

  React.useEffect(() => {
    // Самовызывающаяся асинхронная функция
    (async () => {
      try {
        const { data } = await axios.get('https://63c13cbd99c0a15d28e4c103.mockapi.io/orders');

        // console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов \nПодробнее в консоли браузера');
        console.error(error);
      }
    })();
  }, []);

  // orders
  let renderOrders = (isLoading ? [...Array(8)] : orders).map((item, index) => (
    <Card
      key={index}
      onAddToFavorites={(obj) => onAddToFavorites(obj)}
      loading={isLoading}
      {...item} // Грузит id, title, price, imgUrl крч весь объект целиком
    />
  ));

  return (
    <section className={style.content}>
      <div className={style.content_wrapper}>
        {orders.length > 0 ? (
          <React.Fragment>
            <div className={style.header_bar}>
              <Link to="/react-sneakers" className={style.btn_goback} title="На главную">
                <img className={style.btn_icon} src="img/icons/ic-right.svg" alt="icon item" />
              </Link>
              <h1 className={style.content_title}>Мои Заказы</h1>
            </div>

            {renderOrders}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={style.empty_section}>
              <img src="img/icons/emoji.svg" alt="плак плак" />
              <h1 className={style.empty_title}>У вас нет заказов</h1>
              <p className={style.empty_subtitle}>Слышь, купи!</p>
              <Link to="/react-sneakers" className={style.link_goback} title="Вернуться назад">
                <span className={style.btn_name}>Вернуться назад</span>
                <img
                  className={style.ic_arrow_left}
                  src="img/icons/ic-arrow-left.svg"
                  alt="Icon item"
                />
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </section>
  );
}

export default Orders;
