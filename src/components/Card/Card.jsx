/*
 * Card.jsx - компонент карточки товара для главной страницы.
 *
 *
 */

import React from 'react';

import style from './Card.module.scss';

/*
 * { title, imageUrl, price, onClickAddToCart, onClickToFavorite }
 */

function Card({
  id,
  title,
  imageUrl,
  price,
  onClickAddToCart,
  onAddToFavorites,
  favorited = false,
  added = false,
}) {
  // use method useState from btn addToCart
  const [isAdded, setIsAdded] = React.useState(added);

  const handleBtnAddCartClick = () => {
    onClickAddToCart({ id, title, imageUrl, price });
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
      <div className={style.card_headerbar}>
        <button
          onClick={handleBtnToFavoriteClick}
          className={isAddedFavorite ? style.btn_to_favorite__isChecked : style.btn_to_favorite}
          title={isAddedFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}>
          <img
            src={
              isAddedFavorite ? '/img/icons/ic-heart-liked.svg' : '/img/icons/ic-heart-onliked.png'
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
    </article>
  );
}

export default Card;
