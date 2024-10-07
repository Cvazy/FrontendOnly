import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers";
import { categoryApi } from "entities/Category";
import { segmentsApi } from "entities/Segment";

export function createReduxStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        categoryApi.middleware,
        segmentsApi.middleware,
      ),
  });
}
