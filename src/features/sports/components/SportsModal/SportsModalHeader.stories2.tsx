import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { ModalsArea } from "Features/sports/components/Modals";
import { viewports } from "Storybook/viewports";
import { SportsModal } from "./SportsModal";
import { SportsModalHeader } from "./SportsModalHeader";

const stories = storiesOf("Sports/SportsModal/SportsModalHeader", module);

const onBack = action("onBack");
const onClose = action("onClose");

const render = props => () => (
  <ModalsArea>
    <SportsModal>
      <SportsModalHeader {...{ ...props }} />
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
  ["No Dismiss Buttons", {}],
  ["Back Button", { onBack }],
  [
    "Close Button",
    {
      onClose,
      className:
        "c-sports-modal-header--left-align t-background-white t-color-grey-90 t-border-bottom t-border-grey-5",
    },
  ],
  ["Back and Close Buttons", { onBack, onClose }],
].map(addStory);
