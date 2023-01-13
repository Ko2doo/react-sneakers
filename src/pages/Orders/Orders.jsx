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
        const { data } = await axios.get('/orders');

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
        <div className={style.header_bar}>
          <Link to="/" className={style.btn_goback} title="На главную">
            <img className={style.btn_icon} src="/img/icons/ic-right.svg" alt="icon item" />
          </Link>
          <h1 className={style.content_title}>Мои Заказы</h1>
        </div>

        {renderOrders}
      </div>
    </section>
  );
}

export default Orders;
