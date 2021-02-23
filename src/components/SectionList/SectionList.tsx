/* @flow */
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";
export type Section = {
    data: any[];
    title?: string;
};
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'sections'.
type Props<T> = {} | sections;
// @ts-expect-error ts-migrate(2693) FIXME: 'Section' only refers to a type, but is being used... Remove this comment to see the full error message
Section[],
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'renderItem'.
    renderItem;
// @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
T => (React as any).Node,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'renderSectionHeader'.
    renderSectionHeader;
// @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
(title: string) => (React as any).Node,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'keyExtractor'.
    keyExtractor ?  : T => string,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'direction'.
    direction;
// @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
"vertical" | "horizontal",
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'style'.
    style ?  : { [string]: mixed },
    // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'className'. Did you mean 'classN... Remove this comment to see the full error message
    className;
// @ts-expect-error ts-migrate(2693) FIXME: 'string' only refers to a type, but is being used ... Remove this comment to see the full error message
string,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'itemSpacing'.
    itemSpacing;
// @ts-expect-error ts-migrate(1361) FIXME: 'spacerSizes' cannot be used as a value because it... Remove this comment to see the full error message
spacerSizes,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'sectionSpacing'.
    sectionSpacing;
// @ts-expect-error ts-migrate(2693) FIXME: 'string' only refers to a type, but is being used ... Remove this comment to see the full error message
string,
        | ;
;
export default class SectionList extends React.PureComponent<Props<*>> {
    static defaultProps = {
        direction: "vertical",
        className: "",
        sectionSpacing: "default",
        renderSectionHeader: (title: string) => (<Text tag="p" className="u-font-weight-bold u-padding-y--lg u-margin-bottom--none">
        {title}
      </Text>),
    };
    renderSection = (section: Section, index: number) => {
        const { keyExtractor = (item: {}) => index } = this.props;
        const key = keyExtractor(section) || index;
        return (<Flex.Item key={key}>
        <Flex direction={this.props.direction} spacing="none">
          {section.title && this.props.renderSectionHeader(section.title)}
          {section.data?.length && (<List items={section.data} itemSpacing={this.props.itemSpacing} render={this.props.renderItem}/>)}
        </Flex>
      </Flex.Item>);
    };
    render() {
        return (<Flex style={{ overflow: "hidden", ...this.props.style }} direction={this.props.direction} className={this.props.className} spacing="default">
        {this.props.sections.map(this.renderSection)}
      </Flex>);
    }
}
