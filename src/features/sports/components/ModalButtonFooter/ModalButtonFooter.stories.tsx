import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import ModalButtonFooter from "./ModalButtonFooter";

const stories = storiesOf("Sports/ModalButtonFooter", module);

stories.add("Default View", () => (
  <ModalButtonFooter onClick={action("onClick")}>
    Modal button footer
  </ModalButtonFooter>
));
