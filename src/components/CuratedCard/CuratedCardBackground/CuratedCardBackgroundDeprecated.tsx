import React from "react";
import ImageLazy from "Components/Image/ImageLazy";
import breakpoints from "../CuratedCard.scss";

type PropsDeprecated = {
  onClick: Function | undefined;
  link: string | undefined;
  smallImage: string;
  mediumImage: string;
  largeImage: string;
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Function' is not assignable to type '(event:... Remove this comment to see the full error message
      onClick={onClick}
    >
      <ImageLazy
        className="o-ratio__content u-object-fit-cover"
        images={images}
      />
    </a>
  );
};
