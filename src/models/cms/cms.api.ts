import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LANGUAGES } from "Src/constants";
import { TGetPageBySlugArg, TGetPageBySlugResponse } from "./cms.types";

const oneHour = 3600;

export const cmsApi = createApi({
  reducerPath: "cmsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/cmsquery/v2/root/" }),
  keepUnusedDataFor: oneHour,
  endpoints: builder => ({
    getPageBySlug: builder.query<TGetPageBySlugResponse, TGetPageBySlugArg>({
      query: ({ slug, language, withChildren }) =>
        `${language ?? LANGUAGES.___en}/${slug}${withChildren ? ".*" : ""}`,
    }),
  }),
});

export const { useGetPageBySlugQuery } = cmsApi;
