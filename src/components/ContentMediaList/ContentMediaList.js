// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import List from "Components/List";
import Media from "Components/Media";

type Props = {
  /** The items to render as a list */
  items: Array<Object>,
};

type ContentMediaListItemProps = {
  /** The image url */
  image: string,
  /** The title text */
  title: string,
  /** The description text underneath title text */
  text: string,
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

class ContentMediaList extends PureComponent<Props> {
  render() {
    const { items } = this.props;
    return (
      <div className="u-margin-bottom--lg u-padding-horiz--lg">
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

export default ContentMediaList;
