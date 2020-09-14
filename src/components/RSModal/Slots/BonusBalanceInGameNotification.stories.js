// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { WAGERING_NOTIFICATION_TYPES } from "Models/playing/playing.constants";
import { BonusBalanceInGameNotification } from "./BonusBalanceInGameNotification";
const stories = storiesOf("BonusBalanceInGameNotification", module);

const props = {
  config: { type: WAGERING_NOTIFICATION_TYPES.REAL_MONEY_WAGERING },
  acceptModal: action("acceptModal"),
  t: {
    modal_title: "Wagering notification",
    modal_text_bonus: "Bonus",
    modal_text_real: "Wallet funds will be used when wagering",
    cta_text: "Continue playing",
  },
};

stories.add("Default", () => <BonusBalanceInGameNotification {...props} />);
