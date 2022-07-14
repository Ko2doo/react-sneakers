// Импортируем различные компоненты
import React from 'react';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Card from './components/Card/Card';

function App() {
  // Передаём в массив данные с mockapi.io (бэкэнда) используя хук useState,
  // дальше распечатываем данные в карточки товаров.
  const [items, setItems] = React.useState([]);

  // обрабатываем событие по клику на кнопку "корзина товаров", и открываем корзину,
  // функцию передаём в пропсах в компонент header
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]); // отдельный массив для хранения товаров в корзине.

  //  с помощью fetch вытаскиваем данные из бэкэнда,
  // превращаем в массив данных с помощью json() и передаем в переменную json
  // хук useEffect нужен тут для отслеживания вызова данных с бэкэнда,
  // чтобы постоянно не отправлять запросы при каждом обновлении useState и app
  React.useEffect(() => {
    fetch('https://62cff469d9bf9f1705801797.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json); // записываем наш массив в setItems
      });
  }, []);

  // функция добавления карточек в корзину
  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]); // заменяем данные в массиве с помощью ...; т.е. [...имя_функции, что_добавить] еще погуглить про функцию prev
  };

  // функция удаления товара из корзины
  const onDeleteItem = (obj) => {
    setCartItems(cartItems.filter((p) => p !== obj));
  };

  // Записываем в переменную productCard вызов компонента <Card/>,
  // с уже распечатанными данными из массива приходящего с бэкэнда.
  let productCard = items.map((item) => (
    <Card
      id={item.id}
      key={item.id}
      imageUrl={item.imageUrl}
      title={item.title}
      price={item.price}
      onClickAddToCart={(obj) => onAddToCart(obj)}
      // onClickToFavorite={}
    />
  ));

  /*
   * Можно сократить код
   * с {cartOpened ? <Drawer onClose={() => setCartOpened(false)} /> : null}
   * до {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
   * Если левая часть положительная, то выполняется правостоящая часть.
   **/

  return (
    <div className="wrapper">
      {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} /> : null}

      <main className="main">
        <Header onClickCart={() => setCartOpened(true)} />

        <section className="content">
          <div className="title_bar">
            <h1 className="content_title">Все кроссовки</h1>

            <div className="search_block">
              <img src="/img/icons/ic-search.svg" alt="searching icon..." className="icon_search" />
              <input className="input_item" placeholder="Поиск..." type="text" />
            </div>
          </div>

          {productCard}
        </section>
      </main>
    </div>
  );
}

export default App;
