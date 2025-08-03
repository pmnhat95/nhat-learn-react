import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    return res.json();
});

export const getProductDetail = createAsyncThunk(
  'products/getProductDetail',
  async (id, thunkAPI) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) return thunkAPI.rejectWithValue('Product not found');
    const data = await res.json();
    return data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    itemsLoading: false,
    detail: null,
    detailLoading: false,
    detailError: null,
  },
  reducers: {
    clearProductDetail: (state) => {
      state.detail = null;
      state.detailLoading = false;
      state.detailError = null;
    }
  },
  extraReducers: builder => {
    builder
      // getProducts
      .addCase(getProducts.pending, state => {
        state.itemsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.itemsLoading = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.itemsLoading = false;
      })

      // getProductDetail
      .addCase(getProductDetail.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.detailLoading = false;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.error.message;
      });
  }
});

export const { clearProductDetail } = productsSlice.actions;
export default productsSlice.reducer;