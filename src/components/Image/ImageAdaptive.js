// @flow
import React, { PureComponent } from "react";
import Picture from "@casumo/cmp-picture";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import type { Pictures } from "@casumo/cudl-react-prop-types";
import { head } from "ramda";
import { LOW_RES_IMAGE_SETTINGS } from "../../constants";

type Props = {|
  className: string,
  images: Pictures,
  isIntersecting: boolean,
|};

export default class ImageAdaptive extends PureComponent<Props> {
  static defaultProps = {
    className: "",
  };

  render() {
    const { className, images, isIntersecting } = this.props;

    // loading `<Picture>` on top when ready instead,
    // not replacing when `isIntersecting` untill we find a better fix
    // another solution could be delaying the replacement
    return (
      <React.Fragment>
        <ResponsiveImage
          className={className}
          src={head(images).src}
          {...LOW_RES_IMAGE_SETTINGS}
        />
        {isIntersecting && (
          <Picture className={className} images={images} dpr={3} />
        )}
      </React.Fragment>
    );
  }
}
