import { createSlice } from "@reduxjs/toolkit";
// import { message } from "antd";

export const saveCartToStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
const storedItems = localStorage.getItem('cartItems');
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: storedItems ? JSON.parse(storedItems) : [],
    totalAmount: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveCartToStorage(state.items);
      // message.success('Add to cart success');
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    increaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      saveCartToStorage(state.items);
    },
    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveCartToStorage(state.items);
    },
    clearCart: state => {
      state.items = [];
      saveCartToStorage(state.items);
    }
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;