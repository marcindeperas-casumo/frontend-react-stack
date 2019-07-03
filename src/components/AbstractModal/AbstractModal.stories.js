// @flow
import React, { useState } from "react";
import ReactModal from "react-modal";
import { storiesOf } from "@storybook/react";
import { WaitForHostElement } from "Components/WaitForHostElement";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
import { ORIENTATION_VALUES } from "Components/ResponsiveLayout/ResponsiveLayout.types";
import { AbstractModal } from "./";
import "./AbstractModal.stories.scss";

const hostElementId = "portal-host-element";
const stories = storiesOf("AbstractModal", module);

const getParent = () => document.querySelector(`#${hostElementId}`);

function AbstractModalStory() {
  const [isOpen, setOpen] = useState(true);

  ReactModal.setAppElement(document.createElement("div"));
  return (
    <AbstractModal
      isOpen={isOpen}
      hideModal={() => setOpen(false)}
      parentSelector={getParent}
      closeTimeoutMS={100}
    >
      <h1>hello modal</h1>
    </AbstractModal>
  );
}

function AbstractModalWithResponsiveComponentsStory() {
  const [isOpen, setOpen] = useState(true);

  const commonProps = {
    isOpen,
    hideModal: () => setOpen(false),
    parentSelector: getParent,
    closeTimeoutMS: 100,
  };

  ReactModal.setAppElement(document.createElement("div"));
  return (
    <>
      <Desktop>
        <AbstractModal className="c-abstract-modal--desktop" {...commonProps}>
          <h1>hello desktop</h1>
        </AbstractModal>
      </Desktop>
      <Mobile orientation={ORIENTATION_VALUES.LANDSCAPE}>
        <AbstractModal
          className="c-abstract-modal--mobile-landscape"
          {...commonProps}
        >
          <h1>hello mobile landscape</h1>
        </AbstractModal>
      </Mobile>
      <Mobile orientation={ORIENTATION_VALUES.PORTRAIT}>
        <AbstractModal
          className="c-abstract-modal--mobile-portrait"
          {...commonProps}
        >
          <h1>hello mobile portrait</h1>
        </AbstractModal>
      </Mobile>
    </>
  );
}

const AbstractModalContainer = ({ children }) => (
  <WaitForHostElement hostElementId={hostElementId}>
    {children}
  </WaitForHostElement>
);

stories.add("Default", () => (
  <AbstractModalContainer>
    <AbstractModalStory />
  </AbstractModalContainer>
));

stories.add("With ResponsiveLayout", () => (
  <AbstractModalContainer>
    <AbstractModalWithResponsiveComponentsStory />
  </AbstractModalContainer>
));
