import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import { Modal } from "./RSModal";
import { ModalContentLoading } from "./RSModalContent";
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
      <MockStore>
        <Modal
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ hideModal: () => void; t: { title: string;... Remove this comment to see the full error message
          hideModal={() => {}}
          t={loading ? null : text}
          modalType={visible && modalTypes[loading ? 1 : 0]}
        />
      </MockStore>
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
        <ModalHeader
          title={text.title}
          closeAction={() => {}}
          showCloseButton
        />
        <div style={{ height: 200, backgroundColor: "#ffcd32" }} />
      </>
    );
  });
  stories.add("Loading", () => {
    return (
      <>
        <ModalHeader />
        <ModalContentLoading />
      </>
    );
  });
}
