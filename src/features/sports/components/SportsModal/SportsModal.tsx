// @flow
import * as React from "react";
import classNames from "classnames";
import { SportsModalHeader } from "Features/sports/components/SportsModal/SportsModalHeader";
import { Modal } from "Components/Modal";

import "./SportsModal.scss";

type Props = {
  className?: string,
  children: React.Node,
};

const Content = ({ children, className }: Props) => (
  <Modal.Content className={classNames("u-padding-x--md", className)}>
    <div className="c-sports-modal__content-inner">{children}</div>
  </Modal.Content>
);

export class SportsModal extends React.Component<Props> {
  static Header = SportsModalHeader;
  static Footer = Modal.Footer;
  static Content = Content;

  render() {
    return (
      <Modal className="c-sports-modal t-background-white">
        {this.props.children}
      </Modal>
    );
  }
}
