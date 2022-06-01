import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Duration } from "luxon";
import * as R from "ramda";
import { TLimitGroup } from "./config/config.types";
import { TPeriod } from "./playOkay.types";
import { TGetPlayerStateByIdResponse } from "./limits/limits.api.query.types";
import {
  TUpdateLoginTimeLimitArgsDeprecated,
  TRevokeLoginTimeLimitArgsDeprecated,
  TLoginTimeLimit,
} from "./limits";

export const playOkayApi = createApi({
  reducerPath: "playOkayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["PlayerPlayOkState"],
  endpoints: builder => ({
    getPlayerStateById: builder.query<TGetPlayerStateByIdResponse, string>({
      query: id => `api/common/query/playok/${id}`,
      providesTags: ["PlayerPlayOkState"],
    }),
    updateLoginTimeLimit: builder.mutation<
      any,
      TUpdateLoginTimeLimitArgsDeprecated
    >({
      query: body => ({
        url: "api/common/command/player/setLoginTimeLimit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PlayerPlayOkState"],
    }),
    revokeLoginTimeLimit: builder.mutation<
      any,
      TRevokeLoginTimeLimitArgsDeprecated
    >({
      query: body => ({
        url: "api/common/command/player/revokeLoginTimeLimit",
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

export function selectMoneyLimitsInGroup({
  group,
  data,
}: {
  group: TLimitGroup;
  data: TGetPlayerStateByIdResponse | null;
}) {
  const [, limitType] = group.split("/");

  return data?.moneyLimits
    .filter(moneyLimit => moneyLimit.limitType === limitType)
    .map(moneyLimit => ({
      value: moneyLimit.limit.amount,
      period: moneyLimit.period,
      consumedAmount: moneyLimit.consumedAmount.amount,
      comingChange: moneyLimit.comingChange?.limit?.amount
        ? {
            activationTime: moneyLimit.comingChange.activationTime,
            value: moneyLimit.comingChange.limit.amount,
            period: moneyLimit.comingChange.period,
          }
        : null,
      comingRevocation:
        moneyLimit.comingChange && !moneyLimit.comingChange?.limit?.amount
          ? {
              revocationTime: moneyLimit.comingChange.activationTime,
              waitingForConfirmation:
                moneyLimit.comingChange.waitingForConfirmation,
              automaticRevocation: moneyLimit.comingChange.automaticRevocation,
            }
          : null,
    }));
}

export function selectTimeLimitsInGroup({
  group,
  data,
}: {
  group: TLimitGroup;
  data: TGetPlayerStateByIdResponse | null;
}) {
  if (group === "time/LoginTimeBlock") {
    return data?.loginTimeBlock
      ? [
          {
            value: Number.parseInt(data.loginTimeBlock.start),
            period: "LoginBlockStart" as TPeriod,
            comingRevocation: data.loginTimeBlock.comingRevocation,
            comingChange: data.loginTimeBlock.comingLimit
              ? {
                  activationTime:
                    data.loginTimeBlock.comingLimit.activationTime,
                  value: Number.parseInt(data.loginTimeBlock.comingLimit.start),
                  period: "LoginBlockStart" as TPeriod,
                }
              : null,
          },
          {
            value: Number.parseInt(data.loginTimeBlock.end),
            period: "LoginBlockEnd" as TPeriod,
            comingRevocation: data.loginTimeBlock.comingRevocation,
            comingChange: data.loginTimeBlock.comingLimit
              ? {
                  activationTime:
                    data.loginTimeBlock.comingLimit.activationTime,
                  value: Number.parseInt(data.loginTimeBlock.comingLimit.end),
                  period: "LoginBlockEnd" as TPeriod,
                }
              : null,
          },
        ]
      : [];
  }

  return data?.loginTimeLimits.map(timeLimit => ({
    value: Duration.fromISO(timeLimit.limit).as("hours"),
    period: timeLimit.period,
    consumedAmount: Duration.fromISO(timeLimit.consumedTime).as("hours"),
    comingRevocation: timeLimit.comingRevocation,
    comingChange: timeLimit?.comingLimit
      ? {
          activationTime: timeLimit.comingLimit.activationTime,
          value: Duration.fromISO(timeLimit.comingLimit.limit).as("hours"),
          period: timeLimit.period,
        }
      : null,
  }));
}

export const selectLimitsInGroup = R.cond([
  [R.where({ group: R.startsWith("money/") }), selectMoneyLimitsInGroup],
  [R.where({ group: R.startsWith("time/") }), selectTimeLimitsInGroup],
  [R.T, R.always([])],
]);
