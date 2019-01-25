/* @flow */
import React, { PureComponent } from "react";
import type { Node } from "react";

import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";

export type Section = {
  data: any[],
  title?: string,
};

type Props = {|
  sections: Section[],
  renderItem: (item: any, index: number) => Node,
  renderSectionHeader: (title: string) => Node,
  keyExtractor?: (item: any) => string,
  direction?: "vertical" | "horizontal",
  style?: { [string]: mixed },
  className?: string,
  itemSpacing: string,
|};

export default class SectionList extends PureComponent<Props> {
  renderSection = (section: Section, index: number) => {
    const {
      renderItem,
      renderSectionHeader,
      keyExtractor = (item: {}) => index,
      direction = "vertical",
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
    const { sections, direction = "vertical", className = "" } = this.props;

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
