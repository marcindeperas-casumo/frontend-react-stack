// @flow
import React from "react";
import ImageLazy from "Components/Image/ImageLazy";
import twerkpoints from "./CuratedCard.scss";

type BaseProps = {
  onLaunchGame: ?Function,
  link: ?string,
};

type PropsNew = BaseProps & {
  image: string,
};
type PropsDeprecated = BaseProps & {
  small_image: string,
  medium_image: string,
  large_image: string,
};

type Props = BaseProps & {
  image?: string,
  small_image?: string,
  medium_image?: string,
  large_image?: string,
};

const curatedCardOptions = [
  {
    mediaQuery: `(max-width: ${twerkpoints.phablet - 1}px)`,
    imgixOpts: {
      w: 343,
      h: 352,
      "fp-x": 0.625,
      "fp-y": 0.625,
      "fp-z": 1.3,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(max-width: ${twerkpoints.tablet - 1}px)`,
    imgixOpts: {
      w: 496,
      h: 264,
      "fp-x": 0.53,
      "fp-y": 0.54,
      "fp-z": 1.55,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(max-width: ${twerkpoints.desktop - 1}px)`,
    imgixOpts: {
      w: 768,
      h: 357,
      "fp-x": 0.5,
      "fp-y": 0.53,
      "fp-z": 1.42,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(max-width: ${twerkpoints.desktopLg - 1}px)`,
    imgixOpts: {
      w: 1181,
      h: 512,
      "fp-x": 0.5,
      "fp-y": 0.517,
      "fp-z": 1.2,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(min-width: ${twerkpoints.desktopLg}px)`,
    imgixOpts: {
      w: 1661,
      h: 616,
      "fp-y": 0.52,
      "fp-z": 1,
      fit: "crop",
      crop: "focalpoint",
    },
  },
];

const addImageSourceToOptions = src =>
  curatedCardOptions.map(option => ({
    ...option,
    src,
  }));

export const CuratedCardBackground = (props: Props) => {
  const { image, small_image, medium_image, large_image } = props;
  const isNewVersion = image && !small_image && !medium_image && !large_image;

  return isNewVersion ? (
    <CuratedCardBackgroundNew {...props} />
  ) : (
    <CuratedCardBackgroundDeprecated {...props} />
  );
};

export const CuratedCardBackgroundNew = ({
  image,
  onLaunchGame,
  link,
}: PropsNew) => {
  const images = addImageSourceToOptions(image);

  return (
    <a
      className="o-ratio__content u-cursor-pointer"
      href={link}
      onClick={onLaunchGame}
    >
      <ImageLazy
        className="o-ratio__content u-object-fit-cover"
        images={images}
      />
    </a>
  );
};

export const CuratedCardBackgroundDeprecated = ({
  small_image,
  medium_image,
  large_image,
  onLaunchGame,
  link,
}: PropsDeprecated) => {
  const images = [
    {
      src: small_image,
      mediaQuery: `(max-width: ${twerkpoints.phablet - 1}px)`,
    },
    {
      src: medium_image,
      mediaQuery: `(max-width: ${twerkpoints.tablet - 1}px)`,
    },
    {
      src: large_image,
      mediaQuery: `(min-width: ${twerkpoints.tablet}px)`,
    },
  ];

  return (
    <a
      className="o-ratio__content u-cursor-pointer"
      href={link}
      onClick={onLaunchGame}
    >
      <ImageLazy
        className="o-ratio__content u-object-fit-cover"
        images={images}
      />
    </a>
  );
};
