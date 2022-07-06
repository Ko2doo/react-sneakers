// Импортируем различные компоненты
import Drawer from './components/Drawer';
import Header from './components/Header';
import Card from './components/Card';

function App() {
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

          <Card />
        </section>
      </main>
    </div>
  );
}

export default App;
