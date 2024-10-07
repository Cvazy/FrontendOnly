import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "shared";
import { ISegment } from "entities/Segment";

export const segmentsApi = createApi({
  reducerPath: "segmentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverUrl}` }),
  endpoints: (builder) => ({
    fetchAllCategories: builder.query<ISegment[], number>({
      query: (categoryId: number) => ({
        url: "segments",
        params: { category_id: categoryId },
      }),
    }),
  }),
});
