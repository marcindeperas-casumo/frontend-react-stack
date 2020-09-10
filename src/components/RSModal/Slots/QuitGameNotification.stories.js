// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { QuitGameNotificationProps } from "./__mocks__/QuitGameNotificationProps.mock";
import { QuitGameNotification } from "./QuitGameNotification";
const stories = storiesOf("RSModal/QuitGameNotification", module);

stories.add("Default", () => (
  <MockStore>
    <QuitGameNotification {...QuitGameNotificationProps} />
  </MockStore>
));
