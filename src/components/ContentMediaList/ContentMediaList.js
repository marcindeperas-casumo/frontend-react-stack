// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";

import List from "Components/List";
import Media from "Components/Media";

type Props = {
  items: Array<Object>,
};

const ContentMediaListItem = ({ image, title, text }) => (
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
      <div className="u-margin-bottom--lg">
        <List
          itemSpacing="md"
          items={items}
          render={item => (
            <ContentMediaListItem
              image={item.image}
              title={item.title}
              text={item.text}
            />
          )}
        />
      </div>
    );
  }
}

export default ContentMediaList;
