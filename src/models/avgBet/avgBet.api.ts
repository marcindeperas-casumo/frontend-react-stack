import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import clientHttp from "Lib/http";
import { TCurrencyCode } from "Src/constants";

export type TAverageBetResponse = {
  averageBet: {
    currency: TCurrencyCode;
    amount: number;
  };
};

const API_URL = "/casino-player/crm-profile/api/v1/average-bet";

export const getAverageBet: () => Promise<TAverageBetResponse> = () =>
  clientHttp.get(API_URL) as Promise<TAverageBetResponse>;

export const avgBetApi = createApi({
  reducerPath: "getAvgBetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: builder => ({
    getAverageBet: builder.query<TAverageBetResponse, void>({
      keepUnusedDataFor: 1,
      query: () => `casino-player/crm-profile/api/v1/average-bet`,
    }),
  }),
});
