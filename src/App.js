
function App() {
  return (
    <div className="wrapper">
      <main className="main">

        <header className="header">
          <div className="header_slogan_element">
            <img src="/img/icons/ic-sneakers.svg" className="ic-logo" />
            <div className="market_name">
              <h3 className="market_title">React Sneakers</h3>
              <p className="market_misc">
                Магазин лучших кроссовок
              </p>
            </div>
          </div>

          <div className="header_userbar_element">
            <ul className="userbar">
              <li className="userbar_item">
                <img src="/img/icons/ic-card.svg" className="icon_userbar ic-card" />
                <span>22.44$</span>
              </li>
              <li className="userbar_item">
                <img src="/img/icons/ic-userbar.svg" className="icon_userbar ic-userbar" />
              </li>
            </ul>
          </div>
        </header>

        <section className="content">
          <h1 className="content_title">
            Все кроссовки
          </h1>

          <div className="card">
            <img src="/img/items/item1.png" className="card_preview" />
            <p className="card_prodname">
              Мужские Кроссовки Nike Blazer Mid Suede
            </p>

            <div className="card_footer">
              <div className="card_cost">
                <span>Цена:</span>
                <b>24.44$</b>
              </div>
              <button className="add_to_card" title="Добавить товар в корзину">
                <img src="/img/icons/ic-add.svg" className="icon_card-card" />
              </button>
            </div>
          </div>

          <div className="card">
            <img src="/img/items/item2.png" className="card_preview" />
            <p className="card_prodname">
              Мужские Кроссовки Nike Air Max 270
            </p>

            <div className="card_footer">
              <div className="card_cost">
                <span>Цена:</span>
                <b>24.44$</b>
              </div>
              <button className="add_to_card" title="Добавить товар в корзину">
                <img src="/img/icons/ic-add.svg" className="icon_card-card" />
              </button>
            </div>
          </div>

          <div className="card">
            <img src="/img/items/item3.png" className="card_preview" />
            <p className="card_prodname">
              Мужские Кроссовки Nike Blazer Mid Suede
            </p>

            <div className="card_footer">
              <div className="card_cost">
                <span>Цена:</span>
                <b>24.44$</b>
              </div>
              <button className="add_to_card" title="Добавить товар в корзину">
                <img src="/img/icons/ic-add.svg" className="icon_card-card" />
              </button>
            </div>
          </div>

          <div className="card">
            <img src="/img/items/item4.png" className="card_preview" />
            <p className="card_prodname">
              Кроссовки Puma X Aka Boku Future Rider
            </p>

            <div className="card_footer">
              <div className="card_cost">
                <span>Цена:</span>
                <b>24.44$</b>
              </div>
              <button className="add_to_card" title="Добавить товар в корзину">
                <img src="/img/icons/ic-add.svg" className="icon_card-card" />
              </button>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}

export default App;
