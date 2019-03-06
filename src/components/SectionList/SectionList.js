/* @flow */
import React, { PureComponent, type Node } from "react";

import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";

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
  sectionSpacing: string,
|};

export default class SectionList extends PureComponent<Props<*>> {
  static defaultProps = {
    direction: "vertical",
    className: "",
    sectionSpacing: "default",
    renderSectionHeader: (title: string) => (
      <Text className="u-font-weight-bold u-font-md u-padding-top--lg u-padding-bottom--md">
        {title}
      </Text>
    ),
  };

  renderSection = (section: Section, index: number) => {
    const { keyExtractor = (item: {}) => index } = this.props;
    const key = keyExtractor(section) || index;

    return (
      <Flex.Item key={key}>
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
        spacing="default"
      >
        {this.props.sections.map(this.renderSection)}
      </Flex>
    );
  }
}
