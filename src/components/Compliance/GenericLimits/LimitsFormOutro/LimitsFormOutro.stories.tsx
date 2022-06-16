import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DateTime } from "luxon";
import { TLimitInternalFormat } from "Models/playOkay";
import { settingsCms } from "Models/playOkay/__mocks__/settingsCms";
import { LimitsFormOutro } from "./LimitsFormOutro";

export default {
  component: LimitsFormOutro,
} as ComponentMeta<typeof LimitsFormOutro>;

const timeInFuture = DateTime.fromObject({
  year: 2022,
  month: 10,
  day: 2,
}).toMillis();
const decreasingLimits: Array<TLimitInternalFormat> = [
  {
    period: "Daily",
    value: 120,
  },
];
const increasingLimits: Array<TLimitInternalFormat> = [
  {
    period: "Daily",
    value: 120,
    comingChange: {
      period: "Daily",
      value: 200,
      activationTime: timeInFuture,
    },
  },
];
const comingRevocationAndChange: Array<TLimitInternalFormat> = [
  {
    period: "Daily",
    value: 120,
    comingChange: {
      period: "Daily",
      value: 200,
      activationTime: timeInFuture,
    },
  },
  {
    period: "Weekly",
    value: 1000,
    comingRevocation: {
      automaticRevocation: true,
      waitingForConfirmation: false,
      revocationTime: timeInFuture,
    },
  },
];

export const DecreasingLimit: ComponentStory<typeof LimitsFormOutro> = () => (
  <LimitsFormOutro
    t={settingsCms}
    onClickCta={() => null}
    currentLimits={decreasingLimits}
    changedPeriods={["Daily"]}
  />
);

export const IncreasingLimit: ComponentStory<typeof LimitsFormOutro> = () => (
  <LimitsFormOutro
    t={settingsCms}
    onClickCta={() => null}
    currentLimits={increasingLimits}
    changedPeriods={["Daily"]}
  />
);

export const ComingRevocationAndChange: ComponentStory<
  typeof LimitsFormOutro
> = () => (
  <LimitsFormOutro
    t={settingsCms}
    onClickCta={() => null}
    currentLimits={comingRevocationAndChange}
    changedPeriods={["Daily", "Weekly"]}
  />
);
