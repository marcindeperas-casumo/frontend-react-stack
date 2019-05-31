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
      <SportsModalHeader {...{ ...props, onDismiss }} />
    </SportsModal>
  </ModalsArea>
);

const addStory = ([name, props = {}]) => {
  stories.add(
    `${name} (mobile)`,
    render({ ...props, children: name }),
    viewports.mobile
  );
  stories.add(
    `${name} (desktop)`,
    render({ ...props, children: name }),
    viewports.desktop
  );
};

[
  ["No Dismiss Buttons", { dismissType: "none" }],
  ["Back Button", { dismissType: "back" }],
  ["Close Button", { dismissType: "close" }],
].map(addStory);
