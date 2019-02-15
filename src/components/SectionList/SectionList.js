/* @flow */
import React, { PureComponent, type Node } from "react";

import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";

export type Section = {
  data: any[],
  title?: string,
};

type Props<T> = {|
  sections: Section[],
  renderItem: T => Node,
  renderSectionHeader: (title: string) => Node,
  keyExtractor?: T => string,
  direction: "vertical" | "horizontal",
  style?: { [string]: mixed },
  className: string,
  itemSpacing: string,
|};

export default class SectionList extends PureComponent<Props<*>> {
  static defaultProps = {
    direction: "vertical",
    className: "",
  };

  renderSection = (section: Section, index: number) => {
    const { keyExtractor = (item: {}) => index } = this.props;

    return (
      <Flex.Item key={keyExtractor(section)}>
        <Flex direction={this.props.direction} spacing="none">
          {section.title && this.props.renderSectionHeader(section.title)}
          {section.data && section.data.length && (
            <List
              items={section.data}
              itemSpacing={this.props.itemSpacing}
              render={this.props.renderItem}
            />
          )}
        </Flex>
      </Flex.Item>
    );
  };

  render() {
    return (
      <Flex
        style={{ overflow: "hidden", ...this.props.style }}
        direction={this.props.direction}
        className={this.props.className}
        spacing="none"
      >
        {this.props.sections.map(this.renderSection)}
      </Flex>
    );
  }
}
