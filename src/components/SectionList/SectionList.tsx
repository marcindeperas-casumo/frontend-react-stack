import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";
import * as React from "react";

export type Section = {
  data: any[];
  title?: string;
};

type Props<T> = {
  sections: Section[];
  renderItem: (x: T) => React.ReactNode;
  renderSectionHeader: (title: string) => React.ReactNode;
  keyExtractor?: (x: T) => string;
  direction: "vertical" | "horizontal";
  style?: { [k: string]: any };
  className: string;
  itemSpacing: spacerSizes;
  sectionSpacing: string;
};

export default class SectionList extends React.PureComponent<Props<any>> {
  static defaultProps = {
    direction: "vertical",
    className: "",
    sectionSpacing: "default",
    renderSectionHeader: (title: string) => (
      <Text
        tag="p"
        className="u-font-weight-bold u-padding-y--lg u-margin-bottom--none"
      >
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
          {section.data?.length && (
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
