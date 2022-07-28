/*
 * Card.jsx - компонент карточки товара для главной страницы.
 *
 *
 */

import React from 'react';
import ContentLoader from 'react-content-loader';
import style from './Card.module.scss';

/*
 * { title, imageUrl, price, onClickAddToCart, onClickToFavorite }
 */

function Card({
  id,
  title,
  imageUrl,
  price,
  onAddToCart,
  onAddToFavorites,
  favorited = false,
  added = false,
  loading = false,
}) {
  // use method useState from btn addToCart
  const [isAdded, setIsAdded] = React.useState(added);

  const handleBtnAddCartClick = () => {
    onAddToCart({ id, title, imageUrl, price });
    setIsAdded(!isAdded); // ! - если стоит, то меняем значение с true на false при повторном клике на кнопку.
  };

  // use method useState from btn favorite
  const [isAddedFavorite, setIsAddedFavorite] = React.useState(favorited);

  const handleBtnToFavoriteClick = () => {
    onAddToFavorites({ id, title, imageUrl, price });
    setIsAddedFavorite(!isAddedFavorite);
  };

  return (
    <article className={style.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f8f8f8"
          foregroundColor="#f3f3f3">
          <rect x="219" y="123" rx="0" ry="0" width="150" height="328" />
          <rect x="2" y="19" rx="0" ry="0" width="1" height="0" />
          <rect x="0" y="165" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="145" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="40" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="227" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="220" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <React.Fragment>
          <div className={style.card_headerbar}>
            <button
              onClick={handleBtnToFavoriteClick}
              className={isAddedFavorite ? style.btn_to_favorite__isChecked : style.btn_to_favorite}
              title={isAddedFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}>
              <img
                src={
                  isAddedFavorite
                    ? '/img/icons/ic-heart-liked.svg'
                    : '/img/icons/ic-heart-onliked.png'
                }
                alt="Onliked"
              />
            </button>
          </div>

          <img src={imageUrl} alt="sneakers preview" className={style.card_preview} />

          <p className={style.card_prodname}>{title}</p>

          <div className={style.card_footer}>
            <div className={style.card_cost}>
              <span>Цена:</span>
              <b> {price} $</b>
            </div>
            <button
              onClick={handleBtnAddCartClick}
              className={isAdded ? style.btn_add_to_basked__isChecked : style.btn_add_to_basked}
              title={isAdded ? 'Добавлен' : 'Добавить товар в корзину'}>
              <img
                src={isAdded ? '/img/icons/ic-checked.svg' : '/img/icons/ic-add.svg'}
                alt="icon"
                className={style.icon_card}
              />
            </button>
          </div>
        </React.Fragment>
      )}
    </article>
  );
}

export default Card;
