import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import ModalButtonFooter from "./ModalButtonFooter";

const stories = storiesOf("Sports/ModalButtonFooter", module);

stories.add("Default View", () => (
  // @ts-expect-error ts-migrate(2786) FIXME: 'ModalButtonFooter' cannot be used as a JSX compon... Remove this comment to see the full error message
  <ModalButtonFooter onClick={action("onClick")}>
    Modal button footer
  </ModalButtonFooter>
));
