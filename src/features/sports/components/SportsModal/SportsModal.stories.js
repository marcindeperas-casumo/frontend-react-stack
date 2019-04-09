// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import { ModalsArea } from "Features/sports/components/Modals";
import { SportsModal } from "./SportsModal";

const stories = storiesOf("Sports/SportsModal", module);

const content = (
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

stories.add(
  "Default",
  () => (
    <ModalsArea>
      <SportsModal>
        <SportsModal.Header onClose={action("onClose")}>
          This is the header
        </SportsModal.Header>

        <SportsModal.Content>{content}</SportsModal.Content>

        <SportsModal.Footer>This is the footer area</SportsModal.Footer>
      </SportsModal>
    </ModalsArea>
  ),
  info({ text: "Default" })
);

stories.add(
  "With back",
  () => (
    <ModalsArea>
      <SportsModal>
        <SportsModal.Header
          onClose={action("onClose")}
          onBack={action("onBack")}
        >
          This is the header
        </SportsModal.Header>

        <SportsModal.Content>{content}</SportsModal.Content>

        <SportsModal.Footer>This is the footer area</SportsModal.Footer>
      </SportsModal>
    </ModalsArea>
  ),
  info({ text: "Default" })
);

stories.add(
  "Long content",
  () => (
    <ModalsArea>
      <SportsModal>
        <SportsModal.Header>This is the header</SportsModal.Header>

        <SportsModal.Content>
          {content} {content} {content} {content}
        </SportsModal.Content>

        <SportsModal.Footer>This is the footer area</SportsModal.Footer>
      </SportsModal>
    </ModalsArea>
  ),
  info({ text: "Default" })
);
