// @flow
import React, { PureComponent } from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  small_image: string,
  medium_image: string,
  large_image: string,
};

export default class CuratedCardBackground extends PureComponent<Props> {
  render() {
    const { small_image, medium_image, large_image } = this.props;

    return (
      <a className="o-ratio__content" href="/" onClick={this.onClick}>
        <ImageLazy
          className="o-ratio__content u-object-fit-cover"
          images={{ small_image, medium_image, large_image }}
        />
      </a>
    );
  }
}
