import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getProducts = createAsyncThunk('products/getList', async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return await res.json();
});

export const getProductDetail = createAsyncThunk('products/getDetail', async (id) => {
  const res = await fetch('https://fakestoreapi.com/products/' + id);
  if (!res.ok) throw new Error('Product not found');
  return await res.json();
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    itemsLoading: false,
    itemsError: null,
    detail: null,
    detailLoading: false,
    detailError: null,
  },
  reducers: {
    clearProductDetail(state) {
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
        state.itemsError = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.itemsLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.itemsLoading = false;
        state.itemsError = action.error.message;
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