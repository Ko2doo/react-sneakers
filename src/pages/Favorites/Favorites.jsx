import React from 'react';
import { Link } from 'react-router-dom';
import style from './Favorites.module.scss';
import Card from '../../components/Card/Card';

function Favorites(props) {
  let favoriteCard = props.itemsFavorite.map((item) => (
    <Card
      key={item.id}
      id={item.id}
      imageUrl={item.imageUrl}
      title={item.title}
      price={item.price}
      onClickAddToCart={props.onClickAddToCart}
      onAddToFavorites={props.onAddToFavorites}
      favorited={true}
    />
  ));

  return (
    <section className={style.content}>
      <div className={style.header_bar}>
        <Link to="/" className={style.btn_goback} title="На главную">
          <img className={style.btn_icon} src="/img/icons/ic-right.svg" alt="icon item" />
        </Link>
        <h1 className={style.content_title}>Мои закладки</h1>
      </div>

      {favoriteCard}
    </section>
  );
}

export default Favorites;
