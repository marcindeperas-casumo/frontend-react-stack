import { playOkayApi } from "../playOkay.api";
import {
  TApiExclusionGroupRecord,
  TApiGetPlayerConfigResponse,
  TApiLimitGroup,
  TApiLimitGroupConfig,
  TApiLimitMasterGroup,
  TApiLimitRequirement,
} from "./config.api.types";
import {
  TGetPlayerConfigResponse,
  TLimitPeriodConfig,
  TPeriodSelection,
} from "./config.types";
import {
  apiToLocalLimitGroupMapping,
  loginBlockChoices,
  loginTimeConstraintsPerPeriod,
} from "./config.constants";

export const playOkayConfigApi = playOkayApi.injectEndpoints({
  endpoints: builder => ({
    getPlayerConfig: builder.query<TGetPlayerConfigResponse, void>({
      query: () => "casino-player/playok/api/config",
      transformResponse: (response: TApiGetPlayerConfigResponse) => ({
        exclusions: apiToLocalExclusions(response.exclusions),
        limits: Object.entries(response.limits).reduce(
          (limitsAccu, [group, groupEntry]) => [
            ...limitsAccu,
            ...Object.entries(groupEntry).reduce(
              (groupAccu, [subgroup, subgroupEntry]) =>
                [
                  ...groupAccu,
                  subgroupEntry.enabled
                    ? {
                        group: apiToLocalLimitGroupMapping[subgroup],
                        allowMany: subgroupEntry.allowMany,
                        mandatory: getPeriodSelection(
                          subgroup as TApiLimitGroup,
                          subgroupEntry.requirement
                        ),
                        available: getPeriodConfigs(
                          group as TApiLimitMasterGroup,
                          subgroup as TApiLimitGroup,
                          subgroupEntry
                        ),
                      }
                    : null,
                ].filter(Boolean),
              []
            ),
          ],
          []
        ),
      }),
    }),
  }),
});

export const { useGetPlayerConfigQuery } = playOkayConfigApi;

function getPeriodSelection(
  subgroup: TApiLimitGroup,
  requirement: TApiLimitRequirement
): TPeriodSelection {
  if (requirement === "OPTIONAL") {
    return "none";
  }

  if (requirement === "ONE") {
    return "anyone";
  }

  return "all";
}

function getPeriodConfigs(
  group: TApiLimitMasterGroup,
  subgroup: TApiLimitGroup,
  {
    validPeriods,
    permissions,
    maxAllowedLimits,
    minAllowedLimits,
  }: TApiLimitGroupConfig
): Array<TLimitPeriodConfig> {
  if (group === "time") {
    if (subgroup === "loginBlock") {
      return [
        {
          period: "LoginBlockStart",
          permissions,
          min: 0,
          max: 23,
          field: {
            type: "select",
            choices: loginBlockChoices,
          },
        },
        {
          period: "LoginBlockEnd",
          permissions,
          min: 0,
          max: 23,
          field: {
            type: "select",
            choices: loginBlockChoices,
          },
        },
      ];
    }

    if (subgroup === "loginTime") {
      return validPeriods?.map(period => ({
        period,
        permissions,
        min: loginTimeConstraintsPerPeriod[period].min,
        max: loginTimeConstraintsPerPeriod[period].max,
      }));
    }
  }

  return validPeriods?.map(period => ({
    period,
    permissions,
    min: minAllowedLimits?.[period]?.amount,
    max: maxAllowedLimits?.[period]?.amount,
  }));
}

function apiToLocalExclusions(apiExclusions: TApiExclusionGroupRecord) {
  return Object.entries(apiExclusions).reduce((accu, [type, config]) => {
    return [
      ...accu,
      config.enabled
        ? {
            type,
            permissions: config.permissions,
            // eslint-disable-next-line fp/no-mutating-methods
            validPeriods: Object.values(config.validPeriods).sort(
              (a, b) => a - b
            ),
          }
        : null,
    ].filter(Boolean);
  }, []);
}
