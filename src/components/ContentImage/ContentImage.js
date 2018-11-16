// @flow
import React, { PureComponent } from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  /** The source of the image */
  src: string,
  /** The alternate text for the image */
  alt?: string,
  /** The maximum width of the image used */
  width?: number,
};

const MAX_CONTENT_WIDTH = 482;

export default class ContentImage extends PureComponent<Props> {
  render() {
    const { src, alt = "", maxWidth = MAX_CONTENT_WIDTH } = this.props;
    const className = `
      u-padding-left--xlg@tablet
      u-padding-right--xlg@tablet
      u-padding-left--xlg@desktop
      u-padding-right--xlg@desktop
    `;

    return (
      <>
        <ImageLazy
          className={className}
          src={src}
          alt={alt}
          dpr={3}
          imgixOpts={{
            w: maxWidth,
          }}
        />
      </>
    );
  }
}
