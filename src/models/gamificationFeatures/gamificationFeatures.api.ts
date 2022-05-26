import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TGamificationFeaturesResponse = {
  valuableAwarding: boolean;
  valuableUsage: boolean;
  adventure: boolean;
  tournaments: boolean;
};

const API_URL =
  "/casino-player/player-gamification-feature-toggle/api/v1/player/features";

export const gamificationFeaturesApi = createApi({
  reducerPath: "gamificationFeatures",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: builder => ({
    getGamificationFeatures: builder.query<TGamificationFeaturesResponse, void>(
      {
        keepUnusedDataFor: 1,
        query: () => "",
      }
    ),
  }),
});
