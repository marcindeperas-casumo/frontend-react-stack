import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { DepositLimitsCancelAdjustment } from "./DepositLimitsCancelAdjustment";

const stories = storiesOf(
  "Compliance/DGOJ/DepositLimits/DepositLimitsCancelAdjustment",
  module
);
stories.add("Default", () => (
  <DepositLimitsCancelAdjustment
    t={{
      cancel_adjustment_title: "Do you want to cancel this adjustment?",
      cancel_adjustment_content:
        "This will be cancelled immediately and you’ll also get a 7 day break from making increases.",
      button_yes: "Yes",
      button_no: "No",
    }}
    handleButtonYes={action("handleButtonYes click")}
    handleButtonNo={action("handleButtonNo click")}
  />
));
