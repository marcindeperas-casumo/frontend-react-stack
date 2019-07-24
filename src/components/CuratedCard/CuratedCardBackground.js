// @flow
import React, { PureComponent } from "react";
import breakpoints from "Src/styles/_settings.breakpoints.scss";
import ImageLazy from "Components/Image/ImageLazy";
type Props = {
  small_image: string,
  medium_image: string,
  large_image: string,
  onLaunchGame: ?Function,
  link: ?string,
};

const curatedCardBreakpoints = [
  `(max-width: ${parseInt(breakpoints.phablet) - 1}px)`,
  `(max-width: ${parseInt(breakpoints.tablet) - 1}px)`,
  `(min-width: ${breakpoints.tablet})`,
];

export class CuratedCardBackground extends PureComponent<Props> {
  render() {
    const {
      small_image,
      medium_image,
      large_image,
      onLaunchGame,
      link,
    } = this.props;

    const imgSrcs = [small_image, medium_image, large_image].map(
      (image, i) => ({
        mediaQuery: curatedCardBreakpoints[i],
        src: image,
      })
    );

    return (
      <a
        className="o-ratio__content u-cursor-pointer"
        href={link}
        onClick={onLaunchGame}
      >
        <ImageLazy
          className="o-ratio__content u-object-fit-cover"
          images={imgSrcs}
        />
      </a>
    );
  }
}
