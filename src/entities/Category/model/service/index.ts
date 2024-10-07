import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "shared";
import { ICategory } from "entities/Category";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverUrl}` }),
  endpoints: (builder) => ({
    fetchAllCategories: builder.query<ICategory[], null>({
      query: () => "categories",
    }),
  }),
});
