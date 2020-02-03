// @flow
import React from "react";
import { CuratedCardBackgroundNew } from "./CuratedCardBackgroundNew";
import { CuratedCardBackgroundDeprecated } from "./CuratedCardBackgroundDeprecated";

type Props = {
  onClick: ?Function,
  link: ?string,
  image?: string,
  smallImage?: string,
  mediumImage?: string,
  largeImage?: string,
};

export const CuratedCardBackground = (props: Props) => {
  const { image, smallImage, mediumImage, largeImage } = props;
  const isNewVersion = image && !smallImage && !mediumImage && !largeImage;

  return isNewVersion ? (
    <CuratedCardBackgroundNew {...props} />
  ) : (
    <CuratedCardBackgroundDeprecated {...props} />
  );
};
