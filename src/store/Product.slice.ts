import {
  createSlice,
  createAction,
  createReducer,
  createAsyncThunk,
  isPending,
  isFulfilled,
} from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async function () {
    const products = await fetch("http://localhost:3000/produtos");
    const productsResponse = products.json();

    return productsResponse;
  }
);

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria_id: number;
}

interface ProductsSliceState {
  products: Array<Product>;
  isFetching: boolean;
}

const initialState: ProductsSliceState = {
  products: [],
  isFetching: false,
};

export const increment = createAction("increment");

const productsReducer = createReducer(initialState, (builder) => {
  const peddingActions = isPending(fetchProducts);
  const fulfilledActions = isFulfilled(fetchProducts);

  builder
    .addCase(increment, (state) => {
      //state.products++;
    })
    .addMatcher(peddingActions, (state) => {
      state.isFetching = true;
    })
    .addMatcher(fulfilledActions, (state) => {
      state.isFetching = false;
    });
});

export const ProductsReducer = productsReducer;
