import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  return res.json();
});

export const fetchProductDetail = createAsyncThunk('products/fetch', async (id) => {
  const res = await fetch('https://fakestoreapi.com/product/' + id);
  return res.json();
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    fetchProducts: () => {

    },
    fetchProductDetail: (state, action) => {

    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
  }
});

export default productsSlice.reducer;