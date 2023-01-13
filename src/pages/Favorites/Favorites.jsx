import React from 'react';
import { Link } from 'react-router-dom';
import style from './Favorites.module.scss';
import Card from '../../components/Card/Card';
import { AppContext } from '../../App';

function Favorites(props) {
  const { itemsFavorite, onAddToFavorites } = React.useContext(AppContext);

  let favoriteCard = itemsFavorite.map((item) => (
    <Card
      key={item.id}
      id={item.id}
      imageUrl={item.imageUrl}
      title={item.title}
      price={item.price}
      onAddToCart={props.onAddToCart}
      onAddToFavorites={onAddToFavorites}
      favorited={true}
    />
  ));

  return (
    <section className={style.content}>
      {itemsFavorite.length > 0 ? (
        <div className={style.content_wrapper}>
          <div className={style.header_bar}>
            <Link to="/react-sneakers" className={style.btn_goback} title="На главную">
              <img className={style.btn_icon} src="img/icons/ic-right.svg" alt="icon item" />
            </Link>
            <h1 className={style.content_title}>Мои закладки</h1>
          </div>
          {favoriteCard}
        </div>
      ) : (
        <div className={style.content_wrapper}>
          <div className={style.empty_section}>
            <img src="img/icons/emoji.svg" alt="плак плак" />
            <h1 className={style.empty_title}>Ничего нет</h1>
            <p className={style.empty_subtitle}>Вы ничего не добавили в избранное</p>
            <Link to="/react-sneakers" className={style.link_goback} title="Вернуться назад">
              <span className={style.btn_name}>Вернуться назад</span>
              <img
                className={style.ic_arrow_left}
                src="img/icons/ic-arrow-left.svg"
                alt="Icon item"
              />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Favorites;
