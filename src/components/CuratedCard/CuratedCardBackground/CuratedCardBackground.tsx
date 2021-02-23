// @flow
import React from "react";
import { CuratedCardBackgroundNew } from "./CuratedCardBackgroundNew";
import { CuratedCardBackgroundDeprecated } from "./CuratedCardBackgroundDeprecated";

type Props = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  onClick: ?Function,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  link: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  image: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  smallImage: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  mediumImage: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  largeImage: ?string,
};

export const CuratedCardBackground = (props: Props) => {
  const { image, smallImage, mediumImage, largeImage } = props;

  if (image && !smallImage && !mediumImage && !largeImage) {
    return (
      <CuratedCardBackgroundNew
        onClick={props.onClick}
        link={props.link}
        image={image}
      />
    );
  }

  if (smallImage && mediumImage && largeImage) {
    return (
      <CuratedCardBackgroundDeprecated
        smallImage={smallImage}
        mediumImage={mediumImage}
        largeImage={largeImage}
        onClick={props.onClick}
        link={props.link}
      />
    );
  }

  return null;
};
