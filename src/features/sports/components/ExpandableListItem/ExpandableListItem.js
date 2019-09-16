/* @flow */
import React, { PureComponent } from "react";
import classNames from "classnames";
import type { Node } from "react";
import { DirectionDownIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";

type Props = {
  label: Node,
  children: Node,
  isExpanded?: boolean,
};

type State = {
  isExpanded: boolean,
};

export default class ExpandableListItem extends PureComponent<Props, State> {
  state = {
    isExpanded: Boolean(this.props.isExpanded),
  };

  toggleExpanded = () => this.setState({ isExpanded: !this.state.isExpanded });

  get icon() {
    return (
      <DirectionDownIcon
        className={classNames(
          "t-color-plum",
          this.state.isExpanded && "u-transform--flip-y"
        )}
      />
    );
  }

  render() {
    return (
      <Flex direction="vertical" className="u-padding-y--sm">
        <Flex.Item
          data-test="expandable-list-item-header"
          onClick={() => this.toggleExpanded()}
        >
          <Flex align="center">
            <Flex.Block>{this.props.label}</Flex.Block>
            <Flex.Item>{this.icon}</Flex.Item>
          </Flex>
        </Flex.Item>
        {this.state.isExpanded && (
          <Flex.Item className="u-margin-top--md">
            {this.props.children}
          </Flex.Item>
        )}
      </Flex>
    );
  }
}
