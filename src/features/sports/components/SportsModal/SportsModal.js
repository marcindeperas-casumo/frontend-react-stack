// @flow
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { SportsModalHeader } from "Features/sports/components/SportsModal/SportsModalHeader";
import { Modal } from "Components/Modal";

import "./SportsModal.scss";

type Props = {
  className?: string,
  children: Node,
};

const Content = ({ children, className }: Props) => (
  <Modal.Content className={classNames("u-padding-horiz--md", className)}>
    <div className="c-sports-modal__content-inner">{children}</div>
  </Modal.Content>
);

export class SportsModal extends React.Component<Props> {
  static Header = SportsModalHeader;
  static Footer = Modal.Footer;
  static Content = Content;

  render() {
    return <Modal className="c-sports-modal">{this.props.children}</Modal>;
  }
}
