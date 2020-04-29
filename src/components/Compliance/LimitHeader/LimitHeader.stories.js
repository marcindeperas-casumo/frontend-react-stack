// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs/react";
import DepositLimitsIcon from "Components/Compliance/DepositLimits/DepositLimitsOverview/depositLimits.svg";
import { LimitHeader } from "./LimitHeader";
import { LimitHeaderButton } from "./LimitHeaderButton";

const stories = storiesOf("DepositLimits/LimitHeader", module);

stories.add("Default", () => {
  const variesForDesktop = boolean("Varies for Desktop", false);
  return (
    <LimitHeader
      variesForDesktop={variesForDesktop}
      icon={<DepositLimitsIcon />}
      title="Title"
    >
      <LimitHeaderButton
        onClick={action("clicked")}
        variesForDesktop={variesForDesktop}
      >
        Button
      </LimitHeaderButton>
    </LimitHeader>
  );
});
