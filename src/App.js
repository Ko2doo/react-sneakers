// Импортируем различные компоненты
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites/Favorites';
import Orders from './pages/Orders/Orders';

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
      try {
        // можно так
        // const cartResponse = await axios.get('https://62cff469d9bf9f1705801797.mockapi.io/cart');
        // const favoritesResponse = await axios.get(
        //   'https://62cff469d9bf9f1705801797.mockapi.io/favorite',
        // );
        // const itemsResponse = await axios.get('https://62cff469d9bf9f1705801797.mockapi.io/items');

        // а можно и так (используется Promise.all()):
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://62cff469d9bf9f1705801797.mockapi.io/cart'),
          axios.get('https://62cff469d9bf9f1705801797.mockapi.io/favorite'),
          axios.get('https://62cff469d9bf9f1705801797.mockapi.io/items'),
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data); // Запрашиваем данные корзины товаров с сервера
        setItemsFavorite(favoritesResponse.data); // Запрашиваем данные карточек товаров для гл страницы с сервера
        setItems(itemsResponse.data); // Запрашиваем данные карточек товаров для гл страницы с сервера
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // функция добавления карточек в корзину post -> отправили данные на сервер
  // Ищем объект в корзине (если добавили) и передаём данные на сервер
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id)); // Ищем объект с parentId -> если находим так же - сносим, или добавляем.

      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id))); // сравниваем id, если не равно, сносим.
        await axios.delete(`https://62cff469d9bf9f1705801797.mockapi.io/cart/${findItem.id}`);

        console.log(`Удалено из корзины: id${obj.id} parentId${obj.parentId}`);
      } else {
        setCartItems((prev) => [...prev, obj]); // ждем ответа от бэкэнда
        const { data } = await axios.post('https://62cff469d9bf9f1705801797.mockapi.io/cart/', obj); // ждём ответа от сервера
        // setCartItems((prev) => [...prev, data]); // заменяем данные в массиве с помощью ...; т.е. [...имя_функции, что_добавить] еще погуглить про функцию prev

        // после ответа бэкэнда, обновляем массив:
        /*
         *   в условии ниже сравниваем parentId с бэкэнда с parendId из корзины (state)
         *   если равно, то заменяем на новый объект, иначе возвращаем item
         **/
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );

        console.log(`Добавлено в корзину: id${obj.id} parentId${obj.parentId}`);
      }
    } catch (error) {
      alert('Не удалось добавить в корзину :(');
      console.error(error);
    }
  };

  // асинхронная функция добавления|удаления товара из избранного
  const onAddToFavorites = async (obj) => {
    // Если, в массиве itemFavorite находим одинаковый obj.id,
    // то при клике удаляем его.
    // Или добавляем в избранное
    try {
      if (itemsFavorite.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        await axios.delete(`https://62cff469d9bf9f1705801797.mockapi.io/favorite/${obj.id}`); // удаляем с сервера
        // setItemsFavorite((prev) => prev.filter((favObj) => Number(favObj.id) !== Number(obj.id)));
        setItemsFavorite((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));

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
    try {
      axios.delete(`https://62cff469d9bf9f1705801797.mockapi.io/cart/${id}`); // удаляем с сервера

      /*
       * с помощью filter фильтруем данные в массиве.
       * дай мне предыдущий массив, возьми всё что в нем есть отфильтруй,
       * и удали id того элемента который я передал через функцию при клике на кнопку
       */
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка удаления товара из корзины ;(');
      console.error(error);
    }
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
    return cartItems.some((obj) => Number(obj.parentId) === Number(id)); // пробегаем по массиву корзины и вытаскиваем оттуда parrentId сверяем его с id карточки
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
          onAddToCart,
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
              path="/react-sneakers"
              element={
                <Home
                  items={items}
                  cartItems={cartItems}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToCart={onAddToCart}
                  onAddToFavorites={onAddToFavorites}
                  itemsFavorite={itemsFavorite}
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

            <Route
              path="/orders"
              element={
                <Orders
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
