// @flow
import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  image: string,
  mark: string,
};

export const GameDetailsImage = ({ image, mark }: Props) => (
  <div className="o-ratio o-ratio--game-detail-image">
    <ImageLazy
      className="o-ratio__content u-object-fit-cover"
      src={image}
      mark={mark}
      dpr={3}
      imgixOpts={{
        ar: "375:164",
        fit: "crop",
        markscale: 55,
        markalign: "middle,center",
      }}
    />
  </div>
);
