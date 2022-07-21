import React from 'react';
import style from './Favorites.module.scss';
import Card from '../Card/Card';

function Favorites(props) {
  let favoriteCard = props.itemsFavorite.map((item) => (
    <Card
      key={item.id}
      imageUrl={item.imageUrl}
      title={item.title}
      price={item.price}
      onClickAddToCart={(obj) => props.onAddToCart(obj)}
      onAddToFavorites={(obj) => props.onAddToFavorites(obj)}
    />
  ));

  return (
    <section className={style.content}>
      <div className={style.header_bar}>
        <button className={style.btn_goback} title="Назад">
          <img className={style.btn_icon} src="/img/icons/ic-right.svg" alt="icon item" />
        </button>
        <h1 className={style.content_title}>Мои закладки</h1>
      </div>

      {favoriteCard}
    </section>
  );
}

export default Favorites;
