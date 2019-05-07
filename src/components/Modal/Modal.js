/* @flow */
import React from "react";
import type { Node } from "react";
import classNames from "classnames";

import "./Modal.scss";

type SharedProps = {
  children: Node,
  className?: string,
};

const ModalContainer = (props: SharedProps): Node => (
  <div className={classNames("c-modal", props.className)}>{props.children}</div>
);

const Footer = (props: SharedProps): Node => (
  <div className={classNames("c-modal__footer", props.className)}>
    {props.children}
  </div>
);

const Header = (props: SharedProps): Node => (
  <div className={classNames("c-modal__header", props.className)}>
    {props.children}
  </div>
);

const Content = (props: SharedProps): Node => (
  <div className={classNames("c-modal__content", props.className)}>
    {props.children}
  </div>
);

export const Modal = (props: SharedProps) => {
  return (
    <ModalContainer className={classNames(props.className)}>
      {props.children}
    </ModalContainer>
  );
};

/* eslint-disable fp/no-mutation */
Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;
/* eslint-enable fp/no-mutation */
