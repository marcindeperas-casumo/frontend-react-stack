// @flow
import React, { PureComponent } from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  small_image: string,
  medium_image: string,
  large_image: string,
  onClick: ?Function,
  link: ?string,
};

export default class CuratedCardBackground extends PureComponent<Props> {
  render() {
    const {
      small_image,
      medium_image,
      large_image,
      onClick,
      link,
    } = this.props;

    return (
      <a
        className="o-ratio__content u-cursor-pointer"
        href={link}
        onClick={onClick}
      >
        <ImageLazy
          className="o-ratio__content u-object-fit-cover"
          images={{ small_image, medium_image, large_image }}
        />
      </a>
    );
  }
}
