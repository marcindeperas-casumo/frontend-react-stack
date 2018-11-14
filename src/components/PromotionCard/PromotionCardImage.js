import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

const PromotionCardImage = ({ image }) => {
  return (
    <ImageLazy
      className="u-display--block c-promotion-card__img u-margin"
      src={image}
      imgixOpts={{ w: 240, h: 140 }}
      dpr={3}
    />
  );
};

export default PromotionCardImage;
