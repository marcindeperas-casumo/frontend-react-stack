/* @flow */
import React from "react";
import type { Node } from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";

import "./BlueRibbon.scss";


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

export const BlueRibbon = ({ children, className }: SharedProps) => (
  <div className='blue-ribbon'>{children}</div>
);

/* eslint-disable fp/no-mutation */
BlueRibbon.Header = Header;
BlueRibbon.Content = Content;
/* eslint-enable fp/no-mutation */
