import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const realityCheckApi = createApi({
  reducerPath: "realityCheckApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: builder => ({
    acknowledgeGglPendingConfirmation: builder.mutation<
      void,
      { playerId: string; playerJurisdiction }
    >({
      query: ({ playerId, playerJurisdiction }) => ({
        headers: {
          "X-Player-Id": playerId,
          "X-Player-Jurisdiction": playerJurisdiction,
        },
        url: `api/ggl/pending-confirmation/ack`,
        method: "POST",
      }),
    }),
  }),
});

export const { useAcknowledgeGglPendingConfirmationMutation } = realityCheckApi;
