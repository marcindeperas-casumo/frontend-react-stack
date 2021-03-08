import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

const imgixOpts = { w: 240, h: 140, fit: "crop" };

export const PromotionCardImage = ({ image }) => {
  return (
    <div className="u-margin">
      <div className="o-ratio o-ratio--promotion-card-image">
        <ImageLazy
          className="o-ratio__content t-border-r-bottom-left t-border-r-bottom-right"
          src={image}
          imgixOpts={imgixOpts}
        />
      </div>
    </div>
  );
};
