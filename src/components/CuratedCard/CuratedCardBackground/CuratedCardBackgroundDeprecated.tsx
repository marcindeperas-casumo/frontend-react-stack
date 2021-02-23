// @flow
import React from "react";
import ImageLazy from "Components/Image/ImageLazy";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../CuratedCard.scss' or its co... Remove this comment to see the full error message
import breakpoints from "../CuratedCard.scss";

type PropsDeprecated = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  onClick: ?Function,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
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
