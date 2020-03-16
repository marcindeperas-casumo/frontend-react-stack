// @flow
import React from "react";
import { CuratedCardBackgroundNew } from "./CuratedCardBackgroundNew";
import { CuratedCardBackgroundDeprecated } from "./CuratedCardBackgroundDeprecated";

type Props = {
  onClick: ?Function,
  link: ?string,
  image: ?string,
  smallImage: ?string,
  mediumImage: ?string,
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
