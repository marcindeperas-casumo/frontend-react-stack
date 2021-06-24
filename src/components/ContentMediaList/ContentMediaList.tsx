import React, { PureComponent } from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import List from "@casumo/cmp-list";
import Media from "@casumo/cmp-media";

type Props = {
  /** The items to render as a list */
  items: Array<Object>;
  /** The Column width this item should span in the grid layout, currently supporting 2 columns  */
  gridColumnWidth?: string;
};

type ContentMediaListItemProps = {
  /** The image url */
  image: string;
  /** The title text */
  title: string;
  /** The description text underneath title text */
  text: string;
};

const ContentMediaListItem = ({
  image,
  title,
  text,
}: ContentMediaListItemProps) => (
  <Media
    renderImage={() => (
      <img
        className="u-display--block"
        width={64}
        height={64}
        alt=""
        src={image}
      />
    )}
    renderText={() => (
      <>
        <Text size="sm" className="u-margin-bottom--sm u-font-weight-bold">
          {title}
        </Text>
        <Text size="sm" className="u-margin-bottom--none">
          {text}
        </Text>
      </>
    )}
  />
);

export class ContentMediaList extends PureComponent<Props> {
  render() {
    const { items, gridColumnWidth = "2" } = this.props;
    return (
      <div
        className={cx(
          "mb-lg px-lg",
          gridColumnWidth && `col-span-${gridColumnWidth}`
        )}
      >
        <List
          itemSpacing="md"
          items={items}
          render={({ image, title, text }) => (
            <ContentMediaListItem image={image} title={title} text={text} />
          )}
        />
      </div>
    );
  }
}
