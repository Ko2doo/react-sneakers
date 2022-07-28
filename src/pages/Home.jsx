import React from 'react';
import Card from '../components/Card/Card';

function Home({
  items,
  searchValue,
  itemsFavorite,
  cartItems,
  onChangeSearchInput,
  handlerDrawerInput,
  onAddToCart,
  onAddToFavorites,
  isLoading,
}) {
  const renderItems = () => {
    // Записываем в переменную productCard вызов компонента <Card/>,
    // с уже распечатанными данными из массива приходящего с бэкэнда.
    /* С помощью filter ищем в наших карточках (item)
     * найди в item - title (заголовок, описание)
     * в title найди любое содержимое которое есть в searchValue
     * toLowerCase() -> js функция, переводящая строку в нижний регистр, в данном примере
     * мы переводим в нижний регистр всё, что будет печататься в поле для ввода.
     * При этом не затрагивая рендер компонента на странице, т.е. исходный текст будет таким как в БД.
     * метод some - работает почти как find, но возвращает false/true если хотябы один объект совпал
     */
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    // проверяем если идёт загрузка сайта, то рендерим 10 пустышек (skeleton),
    // остановилсь загрузка то рендерим нормальные предметы и подключаем к ним фильтр(поиск)
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onAddToCart={(obj) => onAddToCart(obj)}
        onAddToFavorites={(obj) => onAddToFavorites(obj)}
        added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
        loading={isLoading}
        {...item} // Грузит id, title, price, imgUrl крч весь объект целиком
      />
    ));
  };

  return (
    <section className="content">
      <div className="title_bar">
        <h1 className="content_title">
          {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
        </h1>

        <div className="search_block">
          <img src="/img/icons/ic-search.svg" alt="searching icon..." className="icon_search" />

          {searchValue ? (
            <button onClick={handlerDrawerInput} className="btn_dwar" title="Очистить поле ввода">
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
      {renderItems()}
    </section>
  );
}

export default Home;
