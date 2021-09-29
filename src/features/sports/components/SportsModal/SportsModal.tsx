import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { SportsModalHeader } from "Features/sports/components/SportsModal/SportsModalHeader";
import { SharedProps } from "./SportsModal.types";

import "./SportsModal.scss";

type Props = {
  className?: string;
  children: JSX.Element[] | JSX.Element;
};

const Content = ({ children, className }: Props) => (
  <Flex.Block className={classNames("c-sports-modal__content u-padding-x--md", className)}>
    <div className="c-sports-modal__content-inner">{children}</div>
  </Flex.Block>
);

const Footer = ({ children, className }: SharedProps) => (
  <Flex.Item className={classNames("c-modal__footer", className)}>
    {children}
  </Flex.Item>
);

export class SportsModal extends React.Component<Props> {
  static Header = SportsModalHeader;
  static Footer = Footer;
  static Content = Content;

  render() {
    return (
      <Flex
        className={classNames(
          "o-position--absolute o-inset--none",
          "c-sports-modal bg-white"
        )}
        direction="vertical"
        spacing="none"
      >
        <>{this.props.children}</>
      </Flex>
    );
  }
}
