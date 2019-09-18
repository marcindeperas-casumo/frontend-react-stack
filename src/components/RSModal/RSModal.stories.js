// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, select } from "@storybook/addon-knobs/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { Modal } from "./RSModal";
import { ModalContent } from "./RSModalContent";
import { ModalHeader } from "./RSModalHeader";

const stories = storiesOf("RSModal", module);

if (isNotChromatic) {
  stories.add("Default", () => {
    const text = {
      title: "Modal title",
      content: "Content will be here",
    };
    const modalTypes = ["REEL_RACES_CAVEATS", "PRIVACY_NOTICE"];
    const loading = boolean("Loading", true);
    const visible = boolean("Visible", true);

    return (
      <Modal
        hideModal={() => {}}
        t={loading ? null : text}
        modalType={visible && modalTypes[loading ? 1 : 0]}
      />
    );
  });
} else {
  stories.add("Default", () => {
    const text = {
      title: "Modal title",
      content: "Content will be here",
    };

    return (
      <>
        <ModalHeader title={text.title} hideModal={() => {}} />
        <ModalContent content={text.content} />
      </>
    );
  });
  stories.add("Loading", () => {
    return (
      <>
        <ModalHeader title={undefined} hideModal={() => {}} />
        <ModalContent content={undefined} />
      </>
    );
  });
}
