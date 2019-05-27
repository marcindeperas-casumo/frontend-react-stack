// @flow
import React from "react";
import { repeat } from "ramda";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ModalsArea } from "Features/sports/components/Modals";
import { viewports } from "Storybook/viewports";
import { SportsModal } from "./SportsModal";

const stories = storiesOf("Sports/SportsModal", module);

const defaultContent = (
  <div>
    <img
      alt="Bob Ross"
      src="https://images05.military.com/sites/default/files/styles/full/public/media/people/2013/05/bobrosspainting.jpg"
      className="u-margin-bottom t-border-r--16"
    />
    <p>
      Let's make some happy little clouds in our world. If there's two big trees
      invariably sooner or later there's gonna be a little tree. Remember how
      free clouds are. They just lay around in the sky all day long.
    </p>
  </div>
);

const longContent = repeat(defaultContent, 4);

const onClose = action("onClose");

const render = (headerProps, content = defaultContent) => () => (
  <ModalsArea>
    <SportsModal>
      <SportsModal.Header {...headerProps}>
        This is the header
      </SportsModal.Header>

      <SportsModal.Content>{content}</SportsModal.Content>

      <SportsModal.Footer>This is the footer area</SportsModal.Footer>
    </SportsModal>
  </ModalsArea>
);

stories.add("Default (mobile)", render({ onClose }), viewports.mobile);

stories.add("Default (desktop)", render({ onClose }), viewports.desktop);

stories.add(
  "With Back Button (mobile)",
  render({ onBack: action("onBack") }),
  viewports.mobile
);

stories.add(
  "With Back Button (desktop)",
  render({ onBack: action("onBack") }),
  viewports.desktop
);

stories.add(
  "Long content (mobile)",
  render({ onClose }, longContent),
  viewports.mobile
);

stories.add(
  "Long content (desktop)",
  render({ onClose }, longContent),
  viewports.desktop
);
