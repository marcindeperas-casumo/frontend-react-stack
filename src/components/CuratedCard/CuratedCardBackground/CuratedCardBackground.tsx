import React from "react";
import { CuratedCardBackgroundNew } from "./CuratedCardBackgroundNew";
import { CuratedCardBackgroundDeprecated } from "./CuratedCardBackgroundDeprecated";

type Props = {
  onClick: Function | undefined;
  link: string | undefined;
  image: string | undefined;
  smallImage: string | undefined;
  mediumImage: string | undefined;
  largeImage: string | undefined;
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
