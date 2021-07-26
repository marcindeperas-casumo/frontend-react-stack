import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

const imgixOpts = { w: 240, h: 140, fit: "crop", q: 100 };

export const PromotionCardImage = ({ image }) => {
  return (
    <div className="o-ratio o-ratio--promotion-card-image">
      <ImageLazy
        className="o-ratio__content rounded-t-2xl"
        src={image}
        imgixOpts={imgixOpts}
      />
    </div>
  );
};
