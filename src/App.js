
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
        </section>

      </main>
    </div>
  );
}

export default App;
