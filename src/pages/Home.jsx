function Home(props) {
  return (
    <section className="content">
      <div className="title_bar">
        <h1 className="content_title">
          {props.searchValue ? `Поиск по запросу: "${props.searchValue}"` : 'Все кроссовки'}
        </h1>

        <div className="search_block">
          <img src="/img/icons/ic-search.svg" alt="searching icon..." className="icon_search" />

          {props.searchValue ? (
            <button
              onClick={props.handlerDrawerInput}
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
            value={props.searchValue}
            onChange={props.onChangeSearchInput}
            className="input_item"
            placeholder="Поиск..."
            type="text"
          />
        </div>
      </div>
      {props.productCard}
    </section>
  );
}

export default Home;
