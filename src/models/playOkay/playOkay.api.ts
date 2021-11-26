import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TGetPlayerStateByIdResponse,
  TPeriod,
  TUpdateLoginTimeLimitArgs,
  TRevokeLoginTimeLimitArgs,
} from "./playOkay.types";
import { TLoginTimeLimit } from "./timeLimits/timeLimits.types";

export const playOkayApi = createApi({
  reducerPath: "playOkayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/common",
  }),
  tagTypes: ["PlayerPlayOkState"],
  endpoints: builder => ({
    getPlayerStateById: builder.query<TGetPlayerStateByIdResponse, string>({
      query: id => `/query/playok/${id}`,
      providesTags: ["PlayerPlayOkState"],
    }),
    updateLoginTimeLimit: builder.mutation<any, TUpdateLoginTimeLimitArgs>({
      query: body => ({
        url: "/command/player/setLoginTimeLimit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PlayerPlayOkState"],
    }),
    revokeLoginTimeLimit: builder.mutation<any, TRevokeLoginTimeLimitArgs>({
      query: body => ({
        url: "/command/player/revokeLoginTimeLimit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PlayerPlayOkState"],
    }),
  }),
});

export const {
  useGetPlayerStateByIdQuery,
  useUpdateLoginTimeLimitMutation,
  useRevokeLoginTimeLimitMutation,
} = playOkayApi;

export const selectLoginTimeLimitFromResult: (
  period: TPeriod,
  data: TGetPlayerStateByIdResponse | null
) => TLoginTimeLimit | null = (period, data) =>
  data?.loginTimeLimits.find(timeLimit => timeLimit.period === period);
