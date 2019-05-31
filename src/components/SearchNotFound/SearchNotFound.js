// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
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
  className?: string,
};

class SearchNotFound extends PureComponent<Props> {
  componentDidMount() {
    const { startFetch } = this.props;

    startFetch();
  }

  render() {
    const { image, title, content } = this.props;

    return (
      <Media
        className={classNames(
          "u-padding-y--lg",
          "u-padding-x--md",
          this.props.className
        )}
        renderText={() => (
          <div>
            <Text className="u-margin-bottom--sm u-font-weight-bold">
              <DangerousHtml html={title} />
            </Text>
            <Text
              className="u-margin-bottom--none t-color-grey-dark-1"
              size="sm"
            >
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
    );
  }
}

export default SearchNotFound;
