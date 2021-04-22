import * as React from "react";
import classNames from "classnames";
import { SportsModalHeader } from "Features/sports/components/SportsModal/SportsModalHeader";
import { Modal } from "Components/Modal";

import "./SportsModal.scss";

type Props = {
  className?: string;
  children: React.ReactNode;
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
      <Modal className="c-sports-modal BG-white">
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'ReactNode' is not assignable to type 'ReactC... Remove this comment to see the full error message */}
        {this.props.children}
      </Modal>
    );
  }
}
