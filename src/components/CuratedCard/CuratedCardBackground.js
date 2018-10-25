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
    const { game } = this.props;
    if (game.length) {
      const slug = game[0];
      launchGame({ slug });
    }
  };

  render() {
    const {
      game,
      small_image,
      medium_image,
      large_image,
      active_promotions,
    } = this.props;

    return (
      <a
        className="o-ratio__content u-cursor-pointer"
        href={!game.length && active_promotions.length ? "/promotions" : null}
        onClick={this.onClick}
      >
        <ImageLazy
          className="o-ratio__content u-object-fit-cover"
          images={{ small_image, medium_image, large_image }}
        />
      </a>
    );
  }
}
