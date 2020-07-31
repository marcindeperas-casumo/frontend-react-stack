/* @flow */
import React, { PureComponent } from "react";
import classNames from "classnames";
import type { Node } from "react";
import { DirectionDownIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import { EVENT_PROPS, EVENTS } from "Src/constants";
import tracker from "Services/tracker";

type Props = {
  label: Node,
  children: Node,
  isExpanded?: boolean,
  data?: {
    isOnboarding?: boolean,
    sportName?: string,
    sportId?: number,
    groupId?: number,
    groupName?: string,
  },
};

type State = {
  isExpanded: boolean,
};

export default class ExpandableListItem extends PureComponent<Props, State> {
  state = {
    isExpanded: Boolean(this.props.isExpanded),
  };

  toggleExpanded = () => {
    const trackingToggleExpanded = () => {
      if (
        this.state.isExpanded &&
        this.props.data &&
        this.props.data.isOnboarding
      ) {
        const eventName = EVENTS.MIXPANEL_SPORTS_ONBOARDING_COUNTRY_EXPAND;
        const data = {
          [EVENT_PROPS.SPORTS_ID]: this.props.data.sportId,
          [EVENT_PROPS.SPORTS_NAME]: this.props.data.sportName,
          [EVENT_PROPS.COUNTRY_ID]: this.props.data.groupId,
          [EVENT_PROPS.COUNTRY_NAME]: this.props.data.groupName,
        };
        tracker.track(eventName, data);
      }
    };

    this.setState(
      { isExpanded: !this.state.isExpanded },
      trackingToggleExpanded
    );
  };

  get icon() {
    return (
      <DirectionDownIcon
        className={classNames(
          "t-color-purple-60",
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
