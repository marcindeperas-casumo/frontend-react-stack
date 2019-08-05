// @flow
import React from "react";
import { repeat } from "ramda";
import { storiesOf } from "@storybook/react";
import { ModalsArea } from "Features/sports/components/Modals";
import { viewports } from "Storybook/viewports";
import { SportsModal } from "./SportsModal";

const stories = storiesOf("Sports/SportsModal", module);

const shortContent = (
  <div>
    <img
      alt="Bob Ross"
      src="https://images05.military.com/sites/default/files/styles/full/public/media/people/2013/05/bobrosspainting.jpg"
      className="u-margin-bottom t-border-r--md"
    />
    <p>
      Let's make some happy little clouds in our world. If there's two big trees
      invariably sooner or later there's gonna be a little tree. Remember how
      free clouds are. They just lay around in the sky all day long.
    </p>
  </div>
);

const longContent = repeat(shortContent, 4);

const render = content => () => (
  <ModalsArea>
    <SportsModal>
      <SportsModal.Header>This is the header</SportsModal.Header>

      <SportsModal.Content>{content}</SportsModal.Content>

      <SportsModal.Footer>This is the footer area</SportsModal.Footer>
    </SportsModal>
  </ModalsArea>
);

stories.add("Short Content (mobile)", render(shortContent), viewports.mobile);
stories.add("Short Content (desktop)", render(shortContent), viewports.desktop);
stories.add("Long Content (mobile)", render(longContent), viewports.mobile);
stories.add("Long Content (desktop)", render(longContent), viewports.desktop);
