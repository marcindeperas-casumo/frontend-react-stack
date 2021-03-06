import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import { sessionIdSelector } from "Models/handshake";
import { useMarket } from "Utils/hooks";
import { TMarket } from "Src/constants";
import { TGetSummaryArgs, TGetSummaryResponse } from "./loginSession.types";

export const loginSessionApi = createApi({
  reducerPath: "loginSessionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/common",
  }),
  endpoints: builder => ({
    getSummary: builder.query<TGetSummaryResponse, TGetSummaryArgs>({
      keepUnusedDataFor: 1,
      query: ({ market, sessionId }) =>
        `/session/summary/${market}/${sessionId}`,
    }),
  }),
});

export function useGetSummaryQuery() {
  const sessionId = useSelector(sessionIdSelector) as string;
  const market = useMarket() as TMarket;

  return loginSessionApi.useGetSummaryQuery({
    market,
    sessionId,
  });
}
