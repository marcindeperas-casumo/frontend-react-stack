// @flow
import React, { PureComponent } from "react";
import Media from "@casumo/cmp-media";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";

export type Props = {
  /** If the CMS page is fetched */
  isFetched: boolean,
  /** The not found image to render */
  image: string,
  /** The not found text title to render */
  title: string,
  /** The not found text content to render */
  content: string,
};

class SearchNotFound extends PureComponent<Props> {
  render() {
    const { image, title, content, isFetched } = this.props;

    if (!isFetched) {
      return null;
    }

    return (
      <Media
        className="t-background-grey-light-2 u-padding-vert--lg u-padding-horiz--md"
        renderText={() => (
          <div>
            <Text className="u-margin-bottom--sm u-font-weight-bold">
              <DangerousHtml html={title} />
            </Text>
            <Text className="u-margin-bottom--none" size="sm">
              <DangerousHtml html={content} />
            </Text>
          </div>
        )}
        renderImage={() => (
          <img
            className="u-display--block"
            alt="Search not found"
            src={image}
          />
        )}
      />
    );
  }
}

export default SearchNotFound;
