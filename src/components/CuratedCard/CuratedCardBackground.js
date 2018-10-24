// @flow
import React, { PureComponent } from "react";
import ImageLazy from "Components/Image/ImageLazy";
import { launchGame } from "Services/LaunchGameService";

type Props = {
  small_image: string,
  medium_image: string,
  large_image: string,
};

export default class CuratedCardBackground extends PureComponent<Props> {
  onClick = () => {
    const { game, active_promotions } = this.props;
    if (game.length) {
      const slug = game[0];
      launchGame({ slug });
    } else if (active_promotions.length) {
      window.location.href = "/promotions";
    }
  };

  render() {
    const { small_image, medium_image, large_image } = this.props;

    return (
      <a className="o-ratio__content u-cursor-pointer" onClick={this.onClick}>
        <ImageLazy
          className="o-ratio__content u-object-fit-cover"
          images={{ small_image, medium_image, large_image }}
        />
      </a>
    );
  }
}
