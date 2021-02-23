// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import { QuitGameNotification } from "./QuitGameNotification";
import { cms } from "./__mocks__/cms";

const stories = storiesOf("RSModal/Slots/QuitGameNotification", module);
const props = {
  acceptModal: action("acceptModal"),
  t: cms,
};

stories.add("Default", () => (
  <MockStore>
    <QuitGameNotification {...props} />
  </MockStore>
));
