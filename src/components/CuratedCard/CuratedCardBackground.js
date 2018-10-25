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
    const { slug } = this.props.gameData;
    launchGame({ slug });
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
        href={!game.length ? "/promotions" : null}
        onClick={game.length ? this.onClick : null}
      >
        <ImageLazy
          className="o-ratio__content u-object-fit-cover"
          images={{ small_image, medium_image, large_image }}
        />
      </a>
    );
  }
}
