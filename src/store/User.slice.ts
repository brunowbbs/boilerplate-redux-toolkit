import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";

interface UserSliceState {
  name: string;
  fetching: boolean;
}

const initialState: UserSliceState = {
  name: "",
  fetching: false,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async function (query: string) {
    const response = await fetch("http://localhost:3000/user");
    const userResponse = await response.json();

    return userResponse.name;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addNome(state, action: PayloadAction<{ name: string }>) {
      state.name = action.payload.name;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.name = action.payload;
      })
      .addMatcher(isPending, (state, payload) => {
        state.fetching = true;
      })
      .addMatcher(isFulfilled, (state, payload) => {
        state.fetching = false;
      })
      .addMatcher(isRejected, (state, payload) => {
        state.fetching = false;
      });
  },
});

export const UserReducer = userSlice.reducer;
export const { addNome } = userSlice.actions;
