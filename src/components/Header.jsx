/*
 * Header.jsx - компонент шапка приложения.
 */

import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header_slogan_element">
        <img src="/img/icons/ic-sneakers.svg" alt="Sneakers logotype" className="ic-logo" />
        <div className="market_name">
          <h3 className="market_title">React Sneakers</h3>
          <p className="market_misc">Магазин лучших кроссовок</p>
        </div>
      </div>

      <div className="header_userbar_element">
        <ul className="userbar">
          <li className="userbar_item">
            <img src="/img/icons/ic-card.svg" alt="icon card" className="icon_userbar ic-card" />
            <span>22.44$</span>
          </li>
          <li className="userbar_item">
            <img
              src="/img/icons/ic-userbar.svg"
              alt="icon userbar"
              className="icon_userbar ic-userbar"
            />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
