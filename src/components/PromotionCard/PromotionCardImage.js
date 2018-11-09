import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

const PromotionCardImage = ({ promotionImage }) => {
  return (
    <ImageLazy
      className="u-display--block c-promotion-card__img u-margin"
      src={promotionImage}
      imgixOpts={{ w: 240, h: 140 }}
      dpr={3}
    />
  );
};

export default PromotionCardImage;
