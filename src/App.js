// Импортируем различные компоненты
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites/Favorites';

// импорт константы контекст
export const AppContext = React.createContext({});

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

  // состояние загрузки приложения, для skeleton
  const [isLoading, setIsLoading] = React.useState(true);

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
    /*
     * Асинхронная функ-ия для контроля загрузки данных с сервера.
     * сначала грузим состояние корзины, после состояние избранных товаров, и только потом сами карточки на гл стр.
     */
    async function fetchData() {
      const cartResponse = await axios.get('https://62cff469d9bf9f1705801797.mockapi.io/cart');
      const favoritesResponse = await axios.get(
        'https://62cff469d9bf9f1705801797.mockapi.io/favorite',
      );
      const itemsResponse = await axios.get('https://62cff469d9bf9f1705801797.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data); // Запрашиваем данные корзины товаров с сервера
      setItemsFavorite(favoritesResponse.data); // Запрашиваем данные карточек товаров для гл страницы с сервера
      setItems(itemsResponse.data); // Запрашиваем данные карточек товаров для гл страницы с сервера
    }

    fetchData();
  }, []);

  // функция добавления карточек в корзину post -> отправили данные на сервер
  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://62cff469d9bf9f1705801797.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id))); // сравниваем id, если не равно, сносим.
        console.log('Удалено из корзины: ' + obj.id);
      } else {
        axios.post('https://62cff469d9bf9f1705801797.mockapi.io/cart/', obj);
        setCartItems((prev) => [...prev, obj]); // заменяем данные в массиве с помощью ...; т.е. [...имя_функции, что_добавить] еще погуглить про функцию prev
        console.log('Добавлено в корзину: ' + obj.id);
      }
    } catch (error) {
      alert('Не удалось добавить в корзину :(');
    }
  };

  // асинхронная функция добавления|удаления товара из избранного
  const onAddToFavorites = async (obj) => {
    // Если, в массиве itemFavorite находим одинаковый obj.id,
    // то при клике удаляем его.
    // Или добавляем в избранное
    try {
      if (itemsFavorite.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://62cff469d9bf9f1705801797.mockapi.io/favorite/${obj.id}`); // удаляем с сервера
        setItemsFavorite((prev) => prev.filter((favObj) => Number(favObj.id) !== Number(obj.id)));
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
      console.error(error);
    }
  };

  // функция удаления товара из корзины
  const onRemoveItem = (id) => {
    axios.delete(`https://62cff469d9bf9f1705801797.mockapi.io/cart/${id}`); // удаляем с сервера

    /*
     * с помощью filter фильтруем данные в массиве.
     * дай мне предыдущий массив, возьми всё что в нем есть отфильтруй,
     * и удали id того элемента который я передал через функцию при клике на кнопку
     */
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Метод для извлечения данных из input для поиска данных
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value); // сохраняем данные из input в setSearchValue;
  };

  // удаление данных при клике на кнопку из input
  const handlerDrawerInput = () => {
    setSearchValue(''); // при клике на кнопку очистки input`а, верни нам пустую строку в input
  };

  // проверяем наличие добавленных товаров по id, если что то есть, выводим состояние кнопок
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  /*
   * Можно сократить код
   * с {cartOpened ? <Drawer onClose={() => setCartOpened(false)} /> : null}
   * до {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
   * Если левая часть положительная, то выполняется правостоящая часть.
   **/

  return (
    <div className="wrapper">
      <AppContext.Provider
        value={{
          items,
          cartItems,
          itemsFavorite,
          isItemAdded,
          onAddToFavorites,
          setCartOpened,
          setCartItems,
        }}>
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
                  onAddToCart={onAddToCart}
                  onAddToFavorites={onAddToFavorites}
                  itemsFavorite={itemsFavorite}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  handlerDrawerInput={handlerDrawerInput}
                  isLoading={isLoading}
                />
              }
              exact></Route>
            <Route
              path="/favorites"
              element={
                <Favorites
                  onAddToCart={(obj) => onAddToCart(obj)}
                  onAddToFavorites={(obj) => onAddToFavorites(obj)}
                />
              }
              exact></Route>
          </Routes>
        </main>
      </AppContext.Provider>
    </div>
  );
}

export default App;
