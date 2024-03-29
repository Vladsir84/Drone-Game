import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStatus: "in_progress",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gamePassed: (state) => {
      state.gameStatus = "passed";
    },
    gameFailed: (state) => {
      state.gameStatus = "failed";
    },
    gameInit: () => {
      return initialState;
    },
  },
});

export const { gamePassed, gameFailed, gameInit } = gameSlice.actions;
export default gameSlice.reducer;
