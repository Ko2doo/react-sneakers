// custom hook
// Обычная функция, но в реакте она называется хуком.
import React from 'react';
import { AppContext } from '../App';

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((summ, obj) => obj.price + summ, 0); // Считает сумму товаров в корзине (с помощью метода reduce() из массива перебираем сумму и объект, по дефолту 0 )

  return { cartItems, setCartItems, totalPrice };
};
