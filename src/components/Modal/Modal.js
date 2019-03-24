/* @flow */
import * as React from "react";
import classNames from "classnames";
import { ArrowLeftIcon, CrossIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";

import "./Modal.scss";

type DismissType = "close" | "back" | "none";

type Props = {
  onClose: () => void,
  children: React.Node,
  className?: string,
  header?: React.Node,
  footer?: React.Node,
  dismissType?: DismissType,
};

type DismissButtonProps = {
  children: any,
  onClick: () => void,
  isVisible: boolean,
};

export const DismissButton = ({
  children,
  onClick,
  isVisible,
}: DismissButtonProps) => (
  <Flex
    align="center"
    justify="center"
    className="c-modal__dismiss-button t-color-white t-background-grey-dark-4 t-border-r--circle"
    onClick={onClick}
    style={{ visibility: isVisible ? "visible" : "hidden" }}
  >
    {children}
  </Flex>
);

// this workaround is to prevent double-scrollbars as they are already set from the durandal stack
const durandalScrollWorkaround = (overflowY: ?string) =>
  window.document
    .querySelectorAll("html, .scroll-y")
    .forEach(el => (el.style.overflowY = overflowY)); // eslint-disable-line fp/no-mutation

export default class Modal extends React.Component<Props> {
  static defaultProps = {
    className: "",
    header: "",
    footer: null,
    dismissType: "close",
  };

  get header() {
    return (
      <>
        <Flex.Item>
          <DismissButton
            onClick={this.props.onClose}
            isVisible={this.props.dismissType === "back"}
          >
            <ArrowLeftIcon />
          </DismissButton>
        </Flex.Item>
        <Flex.Block className="c-modal__header o-flex-justify--center u-font-weight-bold">
          {this.props.header}
        </Flex.Block>
        <Flex.Item>
          <DismissButton
            onClick={this.props.onClose}
            isVisible={this.props.dismissType === "close"}
          >
            <CrossIcon />
          </DismissButton>
        </Flex.Item>
      </>
    );
  }

  componentDidMount() {
    durandalScrollWorkaround("hidden");
  }

  componentWillUnmount() {
    durandalScrollWorkaround(null);
  }

  render() {
    return (
      <Flex
        direction="vertical"
        className={classNames("c-modal", this.props.className)}
        spacing="none"
      >
        <Flex
          className="c-modal__top-bar o-flex__item-fixed-size u-padding t-background-grey-dark-3 t-color-white"
          direction="horizontal"
          align="center"
          spacing="md"
          justify="space-between"
        >
          {this.header}
        </Flex>
        <Flex.Block className="c-modal__content">
          <div className="u-content-width--tablet">{this.props.children}</div>
        </Flex.Block>
        <Flex.Block className="c-modal__footer">
          <div className="u-content-width--tablet">{this.props.footer}</div>
        </Flex.Block>
      </Flex>
    );
  }
}
