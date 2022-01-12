import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TApiMutationArgs,
  TGetExclusionsResponse,
} from "./gameTypeExclusions.types";

export const gameTypeExclusionsApi = createApi({
  reducerPath: "gameTypeExclusionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/casino-player/game-type-exclusions/api/exclusion",
  }),
  tagTypes: ["GameTypeExclusion"],
  endpoints: builder => ({
    getExclusions: builder.query<TGetExclusionsResponse, void>({
      query: () => "",
      providesTags: ["GameTypeExclusion"],
    }),
    addExclusions: builder.mutation<any, TApiMutationArgs>({
      query: body => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GameTypeExclusion"],
    }),
    revokeExclusions: builder.mutation<any, TApiMutationArgs>({
      query: body => ({
        url: "/revoke",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["GameTypeExclusion"],
    }),
    cancelExclusionRevocations: builder.mutation<any, TApiMutationArgs>({
      query: body => ({
        url: "/revoke/cancel",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["GameTypeExclusion"],
    }),
  }),
});

export const {
  useGetExclusionsQuery,
  useAddExclusionsMutation,
  useRevokeExclusionsMutation,
  useCancelExclusionRevocationsMutation,
} = gameTypeExclusionsApi;
