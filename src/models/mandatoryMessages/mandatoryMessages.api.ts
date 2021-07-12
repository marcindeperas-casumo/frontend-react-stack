import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { reducerPath } from "./mandatoryMessages.constants";

export const mandatoryMessagesApi = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: "/player/mandatory-messages/api",
    prepareHeaders: headers => {
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: () => ({}),
});
