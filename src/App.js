// Импортируем различные компоненты
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Card from './components/Card/Card';
import Home from './pages/Home';
import Favorites from './pages/Favorites/Favorites';

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

  // useState для избранных
  const [itemsFavorite, setItemsFavorite] = React.useState([]);

  /*
   * Состояние поля ввода для поиска товаров.
   */
  const [searchValue, setSearchValue] = React.useState(''); // Search State

  /*
   * с помощью fetch вытаскиваем данные из бэкэнда,
   * превращаем в массив данных с помощью json() и передаем в переменную json
   * хук useEffect нужен тут для отслеживания вызова данных с бэкэнда,
   * чтобы постоянно не отправлять запросы при каждом обновлении useState и app
   * --------------------------------------------------------------------------
   * Подключили библиотеку axios, теперь берем данные с бэкэнда ещё проще.
   * метод get -> получаем данные с сервера
   * fetch оставим как пример тут:
   * fetch('https://62cff469d9bf9f1705801797.mockapi.io/items')
   *   .then((res) => {
   *     return res.json();
   *   })
   *   .then((json) => {
   *     setItems(json); // записываем наш массив в setItems
   *   });
   * */
  React.useEffect(() => {
    axios.get('https://62cff469d9bf9f1705801797.mockapi.io/items').then((res) => {
      setItems(res.data); // Запрашиваем данные карточек товаров для гл страницы с сервера
    });
    axios.get('https://62cff469d9bf9f1705801797.mockapi.io/cart').then((res) => {
      setCartItems(res.data); // Запрашиваем данные корзины товаров с сервера
    });
    axios.get('https://62cff469d9bf9f1705801797.mockapi.io/favorite').then((res) => {
      setItemsFavorite(res.data); // Запрашиваем данные карточек товаров для гл страницы с сервера
    });
  }, []);

  // функция добавления карточек в корзину post -> отправили данные на сервер
  const onAddToCart = async (obj) => {
    axios.post('https://62cff469d9bf9f1705801797.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]); // заменяем данные в массиве с помощью ...; т.е. [...имя_функции, что_добавить] еще погуглить про функцию prev
    console.log(obj);
  };

  // асинхронная функция добавления|удаления товара из избранного
  const onAddToFavorites = async (obj) => {
    // Если, в массиве itemFavorite находим одинаковый obj.id,
    // то при клике удаляем его.
    // Или добавляем в избранное
    try {
      if (itemsFavorite.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://62cff469d9bf9f1705801797.mockapi.io/favorite/${obj.id}`); // удаляем с сервера
        setItemsFavorite((prev) => prev.filter((item) => item.id !== obj.id));
        console.log('Удалено из избранного:' + obj.id);
      } else {
        const { data } = await axios.post(
          'https://62cff469d9bf9f1705801797.mockapi.io/favorite',
          obj,
        );
        setItemsFavorite((prev) => [...prev, data]);
        console.log('Добавлено в избранное:' + obj.id);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты :(');
    }
  };

  // функция удаления товара из корзины
  const onRemoveItem = async (id) => {
    try {
      if (cartItems.find((itemObj) => itemObj.id === id)) {
        const { data } = await axios.delete(
          `https://62cff469d9bf9f1705801797.mockapi.io/cart/${id}`,
        ); // удаляем с сервера
        setCartItems((prev) => prev.filter((data) => data.id !== id));
        console.log('Удаляем товар с сервера и из корзины.' + data.id);
      }
    } catch (error) {
      alert('Ошибка удаления товара!');
    }

    // axios.delete(`https://62cff469d9bf9f1705801797.mockapi.io/cart/${id}`); // удаляем с сервера

    /*
     * с помощью filter фильтруем данные в массиве.
     * дай мне предыдущий массив, возьми всё что в нем есть отфильтруй,
     * и удали id того элемента который я передал через функцию при клике на кнопку
     */
    // setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Метод для извлечения данных из input для поиска данных
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value); // сохраняем данные из input в setSearchValue;
  };

  // удаление данных при клике на кнопку из input
  const handlerDrawerInput = () => {
    setSearchValue(''); // при клике на кнопку очистки input`а, верни нам пустую строку в input
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
    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => (
      <Card
        key={item.id}
        id={item.id}
        imageUrl={item.imageUrl}
        title={item.title}
        price={item.price}
        onClickAddToCart={(obj) => onAddToCart(obj)}
        onAddToFavorites={(obj) => onAddToFavorites(obj)}
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
      {cartOpened ? (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
      ) : null}

      <main className="main">
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                handlerDrawerInput={handlerDrawerInput}
                productCard={productCard}
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
              />
            }
            exact></Route>
          <Route
            path="/favorites"
            element={
              <Favorites
                itemsFavorite={itemsFavorite}
                onClickAddToCart={(obj) => onAddToCart(obj)}
                onAddToFavorites={(obj) => onAddToFavorites(obj)}
              />
            }
            exact></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
