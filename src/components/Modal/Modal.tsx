/* @flow */
import React from "react";
import type { Node } from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";

import "./Modal.scss";

type SharedProps = {
  children: Node,
  className?: string,
};

const ModalContainer = ({ children, className }: SharedProps): Node => (
  <Flex
    className={classNames("c-modal", className)}
    direction="vertical"
    spacing="none"
  >
    {children}
  </Flex>
);

const Footer = ({ children, className }: SharedProps): Node => (
  <Flex.Item className={classNames("c-modal__footer", className)}>
    {children}
  </Flex.Item>
);

const Header = ({ children, className }: SharedProps): Node => (
  <Flex.Item className={classNames("c-modal__header", className)}>
    {children}
  </Flex.Item>
);

const Content = ({ children, className }: SharedProps): Node => (
  <Flex.Block className={classNames("c-modal__content", className)}>
    {children}
  </Flex.Block>
);

export const Modal = ({ children, className }: SharedProps) => (
  <ModalContainer className={classNames(className)}>{children}</ModalContainer>
);

/* eslint-disable fp/no-mutation */
Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;
/* eslint-enable fp/no-mutation */
