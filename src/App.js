// Импортируем различные компоненты
import React from 'react';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Card from './components/Card/Card';

function App() {
  // Передаём в массив данные с mockapi.io (бэкэнда) используя хук useState,
  // дальше распечатываем данные в карточки товаров.
  const [items, setItems] = React.useState([]);

  /*
   * обрабатываем событие по клику на кнопку "корзина товаров", и открываем корзину,
   * функцию передаём в пропсах в компонент header
   */
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]); // отдельный массив для хранения товаров в корзине.

  /*
   * Состояние поля ввода для поиска товаров.
   */
  const [searchValue, setSearchValue] = React.useState(''); // Search State

  /*
   * с помощью fetch вытаскиваем данные из бэкэнда,
   * превращаем в массив данных с помощью json() и передаем в переменную json
   * хук useEffect нужен тут для отслеживания вызова данных с бэкэнда,
   * чтобы постоянно не отправлять запросы при каждом обновлении useState и app
   */
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
  const onDeleteItem = (id) => {
    setCartItems(cartItems.filter((obj) => obj.id !== id));
  };

  // Записываем в переменную productCard вызов компонента <Card/>,
  // с уже распечатанными данными из массива приходящего с бэкэнда.
  /* С помощью filter ищем в наших карточках (item)
   * найди в item - title (заголовок, описание)
   * в title найди любое содержимое которое есть в searchValue
   * toLowerCase() -> js функция, переводящая строку в нижний регистр, в данном примере
   * мы переводим в нижний регистр всё, что будет печататься в поле для ввода.
   * При этом не затрагивая рендер компонента на странице, т.е. исходный текст будет таким как в БД.
   */
  let productCard = items
    .filter((item) => item.title.toLowerCase().includes(searchValue))
    .map((item) => (
      <Card
        key={item.id}
        imageUrl={item.imageUrl}
        title={item.title}
        price={item.price}
        onClickAddToCart={(obj) => onAddToCart(obj)}
        // onClickToFavorite={}
      />
    ));

  // Метод для извлечения данных из input для поиска данных
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value); // сохраняем данные из input в setSearchValue;
  };

  // удаление данных при клике на кнопку из input
  const handlerDrawerInput = () => {
    setSearchValue(''); // при клике на кнопку очистки input`а, верни нам пустую строку в input
  };

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
            <h1 className="content_title">
              {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
            </h1>

            <div className="search_block">
              <img src="/img/icons/ic-search.svg" alt="searching icon..." className="icon_search" />

              {searchValue ? (
                <button
                  onClick={handlerDrawerInput}
                  className="btn_dwar"
                  title="Очистить поле ввода">
                  <img
                    src="/img/icons/ic-delete_this_item.svg"
                    alt="Draw input"
                    className="ic_delete_this_item"
                  />
                </button>
              ) : null}
              <input
                value={searchValue}
                onChange={onChangeSearchInput}
                className="input_item"
                placeholder="Поиск..."
                type="text"
              />
            </div>
          </div>

          {productCard}
        </section>
      </main>
    </div>
  );
}

export default App;
