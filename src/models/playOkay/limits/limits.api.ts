import kebabCase from "lodash.kebabcase";
import { TLimitGroup } from "../config/config.types";
import { playOkayApi } from "../playOkay.api";
import { TPeriod } from "../playOkay.types";
import {
  TCancelComingLimitArgs,
  TRevokeLimitArgs,
  TUpdateLimitArgs,
} from "./limits.api.mutation.types";

export const playOkayLimitsApi = playOkayApi.injectEndpoints({
  endpoints: builder => ({
    updateLimit: builder.mutation<any, TUpdateLimitArgs>({
      query: ({ limitGroup, periodSetting, ...body }) => ({
        url: `casino-player/playok/api/${limitGroupToApiEndpoint(limitGroup)}`,
        method: "POST",
        body: {
          ...body,
          ...(isLimitGroupPeriodless(limitGroup) ? null : { periodSetting }),
        },
      }),
      invalidatesTags: ["PlayerPlayOkState"],
    }),
    revokeLimit: builder.mutation<any, TRevokeLimitArgs>({
      query: ({ limitGroup, periodSetting }) => ({
        url: `casino-player/playok/api/${limitGroupToApiEndpoint(
          limitGroup
        )}/revoke${endpointSuffix(limitGroup, periodSetting)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PlayerPlayOkState"],
    }),
    cancelComingLimit: builder.mutation<any, TCancelComingLimitArgs>({
      query: ({ limitGroup, periodSetting }) => ({
        url: `casino-player/playok/api/${limitGroupToApiEndpoint(
          limitGroup
        )}/cancel${endpointSuffix(limitGroup, periodSetting)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PlayerPlayOkState"],
    }),
  }),
});

export const {
  useUpdateLimitMutation,
  useRevokeLimitMutation,
  useCancelComingLimitMutation,
} = playOkayLimitsApi;

function limitGroupToApiEndpoint(limitGroup: TLimitGroup): string {
  return kebabCase(limitGroup.split("/")[1]);
}

function isLimitGroupPeriodless(limitGroup: TLimitGroup): boolean {
  return limitGroup === "time/LoginTimeBlock";
}

function endpointSuffix(limitGroup: TLimitGroup, periodSetting: TPeriod) {
  if (isLimitGroupPeriodless(limitGroup)) {
    return "";
  }

  return `/${periodSetting}`;
}
