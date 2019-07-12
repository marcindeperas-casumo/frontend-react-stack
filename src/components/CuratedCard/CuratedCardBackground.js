// @flow
import React, { PureComponent } from "react";
import ImageLazy from "Components/Image/ImageLazy";
import twerkpoints from "./CuratedCard.scss";
type Props = {
  small_image: string,
  medium_image: string,
  large_image: string,
  onLaunchGame: ?Function,
  link: ?string,
};

const curatedCardImgixOpts = [
  {
    w: 343,
    h: 352,
    "fp-x": 0.625,
    "fp-y": 0.625,
    "fp-z": 1.3,
    fit: "crop",
    crop: "focalpoint",
  },
  {
    w: 496,
    h: 264,
    "fp-x": 0.53,
    "fp-y": 0.54,
    "fp-z": 1.55,
    fit: "crop",
    crop: "focalpoint",
  },
  {
    w: 768,
    h: 357,
    "fp-x": 0.5,
    "fp-y": 0.53,
    "fp-z": 1.42,
    fit: "crop",
    crop: "focalpoint",
  },
  {
    w: 1181,
    h: 512,
    "fp-x": 0.5,
    "fp-y": 0.517,
    "fp-z": 1.2,
    fit: "crop",
    crop: "focalpoint",
  },
  {
    w: 1661,
    h: 616,
    "fp-y": 0.52,
    "fp-z": 1,
    fit: "crop",
    crop: "focalpoint",
  },
];

const curatedCardBreakpoints = [
  `(max-width: ${twerkpoints.phablet - 1}px)`,
  `(max-width: ${twerkpoints.tablet - 1}px)`,
  `(max-width: ${twerkpoints.desktop - 1}px)`,
  `(max-width: ${twerkpoints.desktopLg - 1}px)`,
  `(min-width: ${twerkpoints.desktopLg}px)`,
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
    const imgSrc =
      "https://cms.casumo.com/wp-content/uploads/2019/07/arwork-V1.2-1.png";
    const imgSrcs = [imgSrc, imgSrc, imgSrc, imgSrc, imgSrc].map(
      (image, i) => ({
        mediaQuery: curatedCardBreakpoints[i],
        src: image,
        imgixOpts: curatedCardImgixOpts[i],
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
