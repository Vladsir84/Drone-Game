import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  loading: false,
  error: null,
  data: null,
};

export const initData = createAsyncThunk(
  "init",
  async ({ name, complexity }) => {
    try {
      const { data } = await axios.post(
        "https://cave-drone-server.shtoa.xyz/init",
        {
          name,
          complexity,
        }
      );
      window.localStorage.setItem("initId", data.id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initSlice = createSlice({
  name: "init",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(initData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { addUser } = initSlice.actions;
export default initSlice.reducer;
