import { combineReducers } from "@reduxjs/toolkit";
import { categoryApi } from "entities/Category";
import { segmentsApi } from "entities/Segment";

export const rootReducer = combineReducers({
  [categoryApi.reducerPath]: categoryApi.reducer,
  [segmentsApi.reducerPath]: segmentsApi.reducer,
});
