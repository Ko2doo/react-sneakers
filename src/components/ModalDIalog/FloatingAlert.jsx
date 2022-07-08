/*
 * FloatingAlert.jsx - компонент попап с информацией о действии пользователя,
 * при клике какой либо кнопки.
 *
 *
 */

import React from 'react';

function FloatingAlert(props) {
  return (
    <article className="alert_info">
      <header className="alert_info_headerbar">
        <h2 className="alert_info_title">Совершено действие:</h2>
        <button className="alert_info_close-btn" title="Закрыть">
          <img
            src="/img/icons/ic-delete_this_item.svg"
            alt="Exit cart"
            className="icon_close_this_item"
          />
        </button>
      </header>

      <p className="alert_info_description">{props.description}</p>
    </article>
  );
}

export default FloatingAlert;
