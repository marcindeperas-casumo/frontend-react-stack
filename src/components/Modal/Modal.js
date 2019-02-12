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
  header?: string | React.Node,
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
  <div
    className="t-color-white t-background-grey-dark-4 t-border-r--circle u-padding--md"
    onClick={onClick}
    style={{ visibility: isVisible ? "visible" : "hidden" }}
  >
    {children}
  </div>
);

export default class Modal extends React.Component<Props> {
  static defaultProps = {
    className: "",
    header: "",
    footer: null,
    dismissType: "close",
  };

  get header() {
    return (
      <Flex.Item className="c-modal__top-bar o-flex--1 u-padding">
        <Flex className="u-padding--sm" align="center">
          <Flex.Item>
            <DismissButton
              onClick={this.props.onClose}
              isVisible={this.props.dismissType === "back"}
            >
              <ArrowLeftIcon />
            </DismissButton>
          </Flex.Item>
          <Flex.Block className="c-modal__header o-flex-justify--center u-font-weight-bold">
            {this.props.header || null}
          </Flex.Block>
          <Flex.Item>
            <DismissButton
              onClick={this.props.onClose}
              isVisible={this.props.dismissType === "close"}
            >
              <CrossIcon />
            </DismissButton>
          </Flex.Item>
        </Flex>
      </Flex.Item>
    );
  }

  /* eslint-disable fp/no-mutation */
  componentDidMount() {
    window.document
      .querySelectorAll("html, .scroll-y")
      .forEach(el => (el.style.overflowY = "hidden"));
  }

  componentWillUnmount() {
    window.document
      .querySelectorAll("html, .scroll-y")
      .forEach(el => (el.style.overflowY = null));
  }
  /* eslint-enable fp/no-mutation */

  render() {
    return (
      <Flex
        direction="vertical"
        className={classNames("c-modal", this.props.className)}
        spacing="none"
      >
        <Flex
          className="o-flex__item-fixed-size"
          direction="horizontal"
          align="center"
          spacing="md"
          justify="space-between"
        >
          {this.header}
        </Flex>
        <Flex.Block className="c-modal__content">
          {this.props.children}
        </Flex.Block>
        <Flex.Block className="c-modal__footer">
          {this.props.footer || null}
        </Flex.Block>
      </Flex>
    );
  }
}
