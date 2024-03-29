import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

export const getToken = createAsyncThunk("token", async ({ id, chunkNo }) => {
  try {
    const { data } = await axios.get(
      `https://cave-drone-server.shtoa.xyz/token/${chunkNo}`,
      {
        params: { id },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
});

const tokenSlice = createSlice({
  name: "token",
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(getToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload;
      })
      .addCase(getToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export default tokenSlice.reducer;
