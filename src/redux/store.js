import { configureStore, combineReducers } from "@reduxjs/toolkit";
import initSlice from "./slices/initSlice";
import tokenSlice from "./slices/tokenSlice";
import droneSlice from "./slices/droneSlice";
import caveSlice from "./slices/caveSlice";
import gameSlice from "./slices/gameSlice";

const rootReducer = combineReducers({
  init: initSlice,
  token: tokenSlice,
  drone: droneSlice,
  cave: caveSlice,
  game: gameSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
