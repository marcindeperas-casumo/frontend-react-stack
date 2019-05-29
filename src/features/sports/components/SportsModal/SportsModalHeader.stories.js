// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ModalsArea } from "Features/sports/components/Modals";
import { viewports } from "Storybook/viewports";
import { SportsModal } from "./SportsModal";
import { SportsModalHeader } from "./SportsModalHeader";

const stories = storiesOf("Sports/SportsModal/SportsModalHeader", module);

const onDismiss = action("onClose");

const render = props => () => (
  <ModalsArea>
    <SportsModal>
      <SportsModalHeader {...{ ...props, onDismiss }}>Header</SportsModalHeader>
    </SportsModal>
  </ModalsArea>
);

stories.add("Default (mobile)", render({}), viewports.mobile);
stories.add("Default (desktop)", render({}), viewports.desktop);

stories.add(
  "Back Button (mobile)",
  render({ dismissType: "back" }),
  viewports.mobile
);
stories.add(
  "Back Button (desktop)",
  render({ dismissType: "back" }),
  viewports.desktop
);

stories.add(
  "Back Button: Custom Styles (mobile)",
  render({ dismissType: "back", classNames: "t-background-red" }),
  viewports.mobile
);

stories.add(
  "Back Button: Custom Styles (desktop)",
  render({ dismissType: "back", classNames: "t-background-red" }),
  viewports.desktop
);

stories.add(
  "Close Button (mobile)",
  render({ dismissType: "close" }),
  viewports.mobile
);

stories.add(
  "Close Button (desktop)",
  render({ dismissType: "close" }),
  viewports.desktop
);

stories.add(
  "Close Button: Custom Styles (mobile)",
  render({ dismissType: "close", classNames: "t-background-blue" }),
  viewports.mobile
);

stories.add(
  "Close Button: Custom Styles (desktop)",
  render({ dismissType: "close", classNames: "t-background-blue" }),
  viewports.desktop
);
