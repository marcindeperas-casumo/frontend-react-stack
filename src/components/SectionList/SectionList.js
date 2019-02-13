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
  keyExtractor?: (item: any) => string,
  direction?: "vertical" | "horizontal",
  style?: { [string]: mixed },
  className?: string,
  itemSpacing: string,
|};

export default class SectionList extends PureComponent<Props<*>> {
  static defaultProps = {
    direction: "vertical",
    className: "",
  };

  renderSection = (section: Section, index: number) => {
    const {
      renderItem,
      renderSectionHeader,
      keyExtractor = (item: {}) => index,
      direction,
      itemSpacing,
    } = this.props;

    const key = keyExtractor(section);
    const { title, data } = section;

    return (
      <Flex.Item key={key}>
        <Flex direction={direction} spacing="none">
          {title && renderSectionHeader(title)}
          {data.length && (
            <List
              items={section.data}
              itemSpacing={itemSpacing}
              render={renderItem}
            />
          )}
        </Flex>
      </Flex.Item>
    );
  };

  render() {
    const { sections, direction, className } = this.props;

    const style = { overflow: "hidden", ...this.props.style };

    return (
      <Flex
        direction={direction}
        style={style}
        className={className}
        spacing="none"
      >
        {sections.map(this.renderSection)}
      </Flex>
    );
  }
}
