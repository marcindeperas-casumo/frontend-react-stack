import { Duration } from "luxon";
import { playOkayApi } from "../playOkay.api";
import { TApiSuspendAccountMutationArgs } from "./exclusion.api.types";

export const exclusionsApi = playOkayApi.injectEndpoints({
  endpoints: builder => ({
    suspendAccount: builder.mutation<any, TApiSuspendAccountMutationArgs>({
      query: ({ days, reason, takeABreak }) => ({
        url: "casino-player/playok/api/self-exclusion",
        method: "POST",
        body: {
          takeABreak,
          duration: Duration.fromObject({ days }).toISO(),
          reason,
        },
      }),
    }),
  }),
});

export const { useSuspendAccountMutation } = exclusionsApi;
