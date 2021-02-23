// @flow
import * as React from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { isEmpty } from "ramda";
import type {
  spacerSizes,
  responsiveSpacerSizes,
} from "@casumo/cudl-react-prop-types";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import { horizontalListsDevicePaddings } from "Src/constants";
export const DEFAULT_SPACING = "default";

type OwnProps = {
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    title?: ?string;
    /** url to "see more" page, if null will not render "see more" link */
    seeMoreUrl?: string;
    items: Array<any>;
    spacing: spacerSizes | responsiveSpacerSizes;
    /** "see more" link translation */
    seeMoreText?: string;
    itemClassName?: string;
    // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
    itemRenderer: (i: number) => React.Node;
};

type Props = OwnProps & typeof ScrollableList.defaultProps;

export default class ScrollableList extends React.PureComponent<Props> {
  static defaultProps = {
    items: [],
    spacing: DEFAULT_SPACING,
  };

  keyGetter = (i: number) => this.props.items[i].id;

  render() {
    const {
      items,
      seeMoreText,
      seeMoreUrl,
      spacing,
      title,
      itemClassName,
      itemRenderer,
    } = this.props;

    if (isEmpty(items)) {
      return null;
    }

    return (
      <div>
        {title && (
          <ScrollableListTitleRow
            paddingLeft
            title={title}
            {...(seeMoreText && seeMoreUrl
              ? { seeMore: { text: seeMoreText, url: seeMoreUrl } }
              : {})}
          />
        )}
        <Scrollable
          numberOfItems={items.length}
          keyGetter={this.keyGetter}
          itemRenderer={itemRenderer}
          itemClassName={itemClassName}
          padding={horizontalListsDevicePaddings}
          itemSpacing={spacing}
        />
      </div>
    );
  }
}
