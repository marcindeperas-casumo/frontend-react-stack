// @flow
import React from "react";
import { boolean } from "@storybook/addon-knobs/react";
import { storiesOf } from "@storybook/react";
import { DanishEntryOverlay } from "./DanishEntryOverlay";

const stories = storiesOf("Danish Entry Overlay", module);

const props = {
  t: {
    limit_type_daily: "Daily",
    limit_type_weekly: "Weekly",
    limit_type_monthly: "Monthly",
    limit: "limit",
    modal_title: "Set deposit limit",
    modal_description:
      "This is short description about why you have to set it yo!",
    limit_saved_info: "Limit saved, enjoy",
    playokay_settings_reference:
      "You can set your limits later in play okay settings section",
    save_limit_button: "Save limit",
    got_it_button: "Got it!",
  },
};

const OverlayDecorator = ({ depositLimitSet }) => {
  return (
    <div className="t-background-white o-flex--vertical t-border-r@tablet c-rsmodal">
      <DanishEntryOverlay
        {...props}
        isDepositLimitProperlySet={depositLimitSet}
        saveLimit={() => {}}
      />
    </div>
  );
};

stories.add("Overlay", () => {
  const depositLimitSet = boolean("Has depoit limit been set", true);
  return <OverlayDecorator depositLimitSet={depositLimitSet} />;
});
