// Импортируем различные компоненты
import Drawer from './components/Drawer';
import Header from './components/Header';
import Card from './components/Card';

function App(props) {
  // массив с данными для формирования карточек товаров
  const productCardDataArray = [
    {
      id: 1,
      title: 'Мужские Кроссовки Nike Blazer Mid Suede',
      price: 24.44,
      imageUrl: '/img/items/item1.png',
    },
    {
      id: 2,
      title: 'Мужские Кроссовки Nike Air Max 270',
      price: 22.44,
      imageUrl: '/img/items/item2.png',
    },
    {
      id: 3,
      title: 'Мужские Кроссовки Nike Blazer Mid Suede',
      price: 30,
      imageUrl: '/img/items/item3.png',
    },
    {
      id: 4,
      title: 'Кроссовки Puma X Aka Boku Future Rider',
      price: 45.2,
      imageUrl: '/img/items/item4.png',
    },
  ];

  // Записываем в переменную productCard вызов компонента <Card/>,
  // с уже распечатанными данными из массива productCardDataArray.
  let productCard = productCardDataArray.map((productCard) => (
    <Card
      id={productCard.id}
      key={productCard.id}
      imageUrl={productCard.imageUrl}
      productTitle={productCard.title}
      productPrice={productCard.price}
    />
  ));

  return (
    <div className="wrapper">
      <Drawer />

      <main className="main">
        <Header />

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
