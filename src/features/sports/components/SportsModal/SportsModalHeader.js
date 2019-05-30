// @flow
import React from "react";
import type { Node } from "react";
import { cond, equals, T } from "ramda";
// import classNames from "classnames";
// import { ArrowLeftIcon, CrossIcon } from "@casumo/cmp-icons";
import { Modal } from "Components/Modal";
import { Desktop, Mobile } from "Components/ResponsiveLayout";

import "./SportsModalHeader.scss";

type SharedProps = {
  children: Node,
  className?: string,
};

type HeaderProps = SharedProps & {
  onBack?: () => void,
  onClose?: () => void,
};

type DecoratorProps = {
  dismissType?: "none" | "back" | "close",
};

// mobile        -> shows close button on the right hand side
// tablet and up -> shows floating close button
export const SportsModalHeaderWithCloseButton = ({
  children,
  onClose,
  onBack,
}: HeaderProps) => (
  <>
    <Desktop>Desktop Header: with Close Button</Desktop>
    <Mobile>Mobile Header: with Close Button</Mobile>
  </>
);

// mobile        -> shows back button on the left hand side
// tablet and up -> shows back button on the left hand side and floating close button
export const SportsModalHeaderWithBackButton = ({
  children,
  onClose,
  onBack,
}: HeaderProps) => (
  <>
    <Desktop>Desktop Header: with Back Button</Desktop>
    <Mobile>Mobile Header: with Back Button</Mobile>
  </>
);

// mobile        -> shows header without dismiss buttons
// tablet and up -> shows header without dismiss buttons
export const SportsModalHeaderWithoutDismissButtons = ({
  children,
  onClose,
  onBack,
}: HeaderProps) => (
  <>
    <Desktop>Desktop Header: Default (without Dismiss Buttons)</Desktop>
    <Mobile>Mobile Header: Default (without Dismiss Buttons)</Mobile>
  </>
);

// mobile        -> returns mobile modal header and applies decorators if dismissType !== "none"
// tablet and up -> returns tablet modal header and applies decorators if dismissType !== "none"
export const SportsModalHeader = ({
  dismissType = "none",
  ...passthroughProps
}: HeaderProps & DecoratorProps) => {
  const HeaderVariant = cond([
    [equals("back"), () => SportsModalHeaderWithBackButton],
    [equals("close"), () => SportsModalHeaderWithCloseButton],
    [T, () => SportsModalHeaderWithoutDismissButtons],
  ])(dismissType);

  return (
    <Modal.Header className="c-sports-modal__header u-padding">
      <HeaderVariant {...passthroughProps} />
    </Modal.Header>
  );
};
