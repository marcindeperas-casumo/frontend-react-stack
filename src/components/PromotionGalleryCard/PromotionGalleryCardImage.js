import React from "react";
import ImageLazy from "Components/Image/ImageLazy";

const imgixOpts = { w: 240, h: 140, fit: "crop" };

const PromotionGalleryCardImage = ({ image }) => {
  return (
    <div className="u-margin-bottom u-margin-horiz">
      <div className="o-ratio o-ratio--promotion-card-image">
        <ImageLazy
          className="o-ratio__content c-promotion-gallery-card__img"
          src={image}
          imgixOpts={imgixOpts}
          dpr={3}
        />
      </div>
    </div>
  );
};

export default PromotionGalleryCardImage;
