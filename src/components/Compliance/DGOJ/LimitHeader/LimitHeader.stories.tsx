import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import * as React from "react";
import DepositLimitsIcon from "Components/Compliance/DGOJ/DepositLimits/DepositLimitsOverview/depositLimits.svg";
import { LimitHeader } from "./LimitHeader";
import { LimitHeaderButton } from "./LimitHeaderButton";

const stories = storiesOf("Compliance/DGOJ/LimitHeader", module);

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
