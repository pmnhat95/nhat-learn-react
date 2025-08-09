import { createSelector } from "@reduxjs/toolkit";

export const cartItemsSelector = state => state.cart.items;

export const cartListSelector = createSelector(
  cartItemsSelector,
  cartItems => cartItems
);

export const cartTotalSelector = createSelector(
  cartItemsSelector,
  cartItems => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
);

export const cartCountSelector = createSelector(
  cartItemsSelector,
  cartItems => cartItems.reduce((sum, item) => sum + item.quantity, 0)
);
