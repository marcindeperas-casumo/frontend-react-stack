// @flow
import React from "react";
import ImageLazy from "Components/Image/ImageLazy";
import breakpoints from "../CuratedCard.scss";

type PropsDeprecated = {
  onClick: ?Function,
  link: ?string,
  smallImage: string,
  mediumImage: string,
  largeImage: string,
};

export const CuratedCardBackgroundDeprecated = ({
  smallImage,
  mediumImage,
  largeImage,
  onClick,
  link,
}: PropsDeprecated) => {
  const images = [
    {
      src: smallImage,
      mediaQuery: `(max-width: ${breakpoints.phablet - 1}px)`,
    },
    {
      src: mediumImage,
      mediaQuery: `(max-width: ${breakpoints.tablet - 1}px)`,
    },
    {
      src: largeImage,
      mediaQuery: `(min-width: ${breakpoints.tablet}px)`,
    },
  ];

  return (
    <a
      className="o-ratio__content u-cursor-pointer"
      href={link}
      onClick={onClick}
    >
      <ImageLazy
        className="o-ratio__content u-object-fit-cover"
        images={images}
      />
    </a>
  );
};
