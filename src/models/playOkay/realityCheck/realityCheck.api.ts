import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const realityCheckApi = createApi({
  reducerPath: "realityCheckApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: builder => ({
    acknowledgeGglPendingConfirmation: builder.mutation<
      void,
      {
        body: {
          playerId: string;
          createdAt: string;
          expireAt: string;
          acknowledgedAt: string;
        };
        // playerId: string;
        // playerJurisdiction: string;
      }
    >({
      query: ({ body }) => ({
        // headers: { "X-Player-Id": playerId; "X-Player-Jurisdiction": playerJurisdiction },
        url: `api/ggl/pending-confirmation/ack`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAcknowledgeGglPendingConfirmationMutation } = realityCheckApi;
