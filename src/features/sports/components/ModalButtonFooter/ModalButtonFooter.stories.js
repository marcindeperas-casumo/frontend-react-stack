// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import ModalButtonFooter from "./ModalButtonFooter";

const stories = storiesOf("Sports/ModalButtonFooter", module);

stories.add(
  "Default",
  () => (
    <ModalButtonFooter onClick={action("onClick")}>
      Modal button footer
    </ModalButtonFooter>
  ),
  info({ text: "Default" })
);
