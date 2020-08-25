// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { WAGERING_NOTIFICATION_TYPES } from "Models/playing/playing.constants";
import { SlotsModal } from "./SlotsModal";
const stories = storiesOf("SlotsModal", module);

const props = {
  config: { type: WAGERING_NOTIFICATION_TYPES.REAL_MONEY_WAGERING },
  acceptModal: action("acceptModal"),
  t: {
    modal_text_real: "Wallet funds will be used when wagering",
    cta_text: "Continue playing",
  },
};

stories.add("Default", () => <SlotsModal {...props} />);
