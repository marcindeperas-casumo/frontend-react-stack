// @flow
import React, { PureComponent } from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  /** The source of the image */
  src: string,
  /** The alternate text for the image */
  alt?: string,
  /** The maximum width of the image used */
  maxWidth?: number,
};

const MAX_CONTENT_WIDTH = 578;

export class ContentImage extends PureComponent<Props> {
  render() {
    const { src, alt = "", maxWidth = MAX_CONTENT_WIDTH } = this.props;
    const className = `
      u-width--full
      u-padding-x--lg
      u-padding-x--none@mobile
      u-margin-x--auto
      u-margin-bottom--lg
    `;

    return (
      <ImageLazy
        className={className}
        src={src}
        alt={alt}
        dpr={3}
        imgixOpts={{
          w: maxWidth,
        }}
      />
    );
  }
}
