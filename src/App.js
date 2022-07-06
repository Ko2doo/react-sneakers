
function App() {
  return (
    <div className="wrapper">

      <div className="drawer_overlay">
        <div className="drawer">
          <header className="drawer_headerbar">
            <h2 className="drawer_title">Корзина</h2>
 
            <button className="btn-close" title="Закрыть корзину">
              <img src="/img/icons/ic-delete_this_item.svg" alt="Exit cart" className="ic-delete_this_item" />
            </button>
          </header>
          

          <div className="items-container">

            <article className="cart_item">
              <img src="/img/items/item2.png" alt="Sneakers preview" className="cart_item__preview" />

              <div className="product_info">
                <p className="cart_item__prodname">
                  Мужские Кроссовки Nike Air Max 270
                </p>
                <span className="cart_item__prodcost">
                  35.99$
                </span>
              </div>
              <button className="btn-remove" title="Удалить из корзины">
                <img src="/img/icons/ic-delete_this_item.svg" alt="Delete this item" className="ic-delete_this_item" />
              </button>
            </article>

            <article className="cart_item">
              <img src="/img/items/item1.png" alt="Sneakers preview" className="cart_item__preview" />

              <div className="product_info">
                <p className="cart_item__prodname">
                  Мужские Кроссовки Nike Air Max 270
                </p>
                <span className="cart_item__prodcost">
                  24.44$
                </span>
              </div>
              <button className="btn-remove" title="Удалить из корзины">
                <img src="/img/icons/ic-delete_this_item.svg" alt="Delete this item" className="ic-delete_this_item" />
              </button>
            </article>

          </div>

          <article className="summary">
            <ul className="summary_list">
              <li className="summary_list_item">
                <span className="total_price">Итого: <div className="dashed"></div> <b>35.99$</b></span>
              </li>
              <li className="summary_list_item">
                <span className="from_nds">Налог 5%: <div className="dashed"></div> <b>1.5$</b></span>
              </li>
            </ul>

            <button className="btn-checkout" title="Нажмите чтобы перейти к оформлению">
              <span className="txt">Оформить заказ</span>
              <img 
                src="/img/icons/ic-arrow-right.svg"
                alt="icon arrow right"
                className="ic-arrow-right" />
            </button>
          </article>

        </div>
      </div>

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
          <div className="title_bar">
            <h1 className="content_title">
              Все кроссовки
            </h1>

            <div className="search_block">
              <img src="/img/icons/ic-search.svg" alt="searching icon..." className="icon_search" />
              <input className="input_item" placeholder="Поиск..." type="text" />
            </div>
          </div>

          <article className="card">
            <div className="card_headerbar">
              <button className="add_to_favorite" title="Добавить в избранное">
                <img src="/img/icons/ic-heart-onliked.png" alt="Onliked" className="icon_onliked" />
              </button>

              <button className="check_for_favorite" title="Показать в избранном">
                <img src="/img/icons/ic-heart-liked.svg" alt="Liked" className="icon_onliked" />
              </button>
            </div>

            <img src="/img/items/item1.png" alt="sneakers preview" className="card_preview" />
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
          </article>

          <article className="card">
            <img src="/img/items/item2.png" alt="sneakers preview" className="card_preview" />
            <p className="card_prodname">
              Мужские Кроссовки Nike Air Max 270
            </p>

            <div className="card_footer">
              <div className="card_cost">
                <span>Цена:</span>
                <b>35.99$</b>
              </div>
              <button className="add_to_card" title="Добавить товар в корзину">
                <img src="/img/icons/ic-add.svg" className="icon_card-card" />
              </button>
            </div>
          </article>

          <article className="card">
            <img src="/img/items/item3.png" alt="sneakers preview" className="card_preview" />
            <p className="card_prodname">
              Мужские Кроссовки Nike Blazer Mid Suede
            </p>

            <div className="card_footer">
              <div className="card_cost">
                <span>Цена:</span>
                <b>19$</b>
              </div>
              <button className="add_to_card" title="Добавить товар в корзину">
                <img src="/img/icons/ic-add.svg" className="icon_card-card" />
              </button>
            </div>
          </article>

          <article className="card">
            <img src="/img/items/item4.png" alt="sneakers preview" className="card_preview" />
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
          </article>

        </section>

      </main>
    </div>
  );
}

export default App;
