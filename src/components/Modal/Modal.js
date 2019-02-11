/* @flow */
import * as React from "react";
import classNames from "classnames";

import { ArrowLeftIcon, CrossIcon } from "@casumo/cmp-icons";
import Button from "@casumo/cmp-button";
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

const visibleWhen = condition => ({
  style: { visibility: condition ? "visible" : "hidden" },
});

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
          <Flex.Item {...visibleWhen(this.props.dismissType === "back")}>
            <Button
              className="u-padding--md t-background-noel-grey"
              onClick={this.props.onClose}
            >
              <ArrowLeftIcon />
            </Button>
          </Flex.Item>
          <Flex.Block className="o-flex-justify--center u-font-weight-bold">
            {this.props.header || null}
          </Flex.Block>
          <Flex.Item {...visibleWhen(this.props.dismissType === "close")}>
            <Button
              className="u-padding--md t-background-noel-grey"
              onClick={this.props.onClose}
            >
              <CrossIcon />
            </Button>
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
        <Flex.Block>{this.props.footer || null}</Flex.Block>
      </Flex>
    );
  }
}
