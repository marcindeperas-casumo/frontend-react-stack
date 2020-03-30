// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  image: string,
  mark: string,
  text: string,
};

export const GameDetailsImageInMaintenance = ({ image, mark, text }: Props) => (
  <div className="o-ratio o-ratio--game-detail-image">
    <ImageLazy
      className="o-ratio__content u-object-fit-cover t-greyscale"
      src={image}
      mark={mark}
      imgixOpts={{
        ar: "375:164",
        fit: "crop",
        markscale: 55,
        markalign: "middle,center",
        w: "500",
      }}
    />
    <Text className="t-color-white o-ratio__content o-flex o-flex-justify--center o-flex-align--end u-padding-bottom">
      {text}
    </Text>
  </div>
);
