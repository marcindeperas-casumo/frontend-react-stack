// @flow
import React, { PureComponent } from "react";
import Media from "@casumo/cmp-media";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";

import "./SearchNotFound.scss";

export type Props = {
  /** The not found image to render */
  image: string,
  /** The not found text title to render */
  title: string,
  /** The not found text content to render */
  content: string,
  /** The function that fecthes search page on the CMS */
  startFetch: () => void,
};

class SearchNotFound extends PureComponent<Props> {
  componentDidMount() {
    const { startFetch } = this.props;

    startFetch();
  }

  render() {
    const { image, title, content } = this.props;

    return (
      <div className="o-bleed t-background-grey-light-2">
        <Media
          className="u-padding-vert--lg u-padding-horiz--md"
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
              width={64}
              alt={title}
              src={image}
            />
          )}
        />
      </div>
    );
  }
}

export default SearchNotFound;
