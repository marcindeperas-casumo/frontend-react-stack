// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import { TermsAndConditions } from "./TermsAndConditions";
import cms, { state } from "./__mocks__/cms";

const stories = storiesOf("RSModal/T&C", module);
const actions = {
  acceptModal: action("acceptModal"),
  closeModal: action("closeModal"),
  dismissModal: action("dismissModal"),
};
stories.add("Default", () => (
  <MockStore state={state}>
    <TermsAndConditions t={cms} {...actions} config={{}} />
  </MockStore>
));
