import React from "react";
import cx from "classnames";
import ImageLazy from "Components/Image/ImageLazy";
import { isTablet, isDesktop } from "Components/ResponsiveLayout";
import { promotionsHeaderImageSet } from "./utils";

import "Components/PromotionHeaderImage/PromotionHeaderImage.scss";

type TProps = {
  /** Promotion image url */
  image: string;
  /** The Column width this item should span in the grid layout, currently supporting 2 columns  */
  gridColumnWidth?: string;
  /** Additional css classes */
  className?: string;
};

const ROOT_CLASSNAME = "c-promotion-header-image";

const PromotionHeaderImage: React.FC<TProps> = ({
  image,
  gridColumnWidth = "1",
  className,
}: TProps) => {
  const images = promotionsHeaderImageSet(image);
  const isTabletOrDesktop = isTablet() || isDesktop();

  return (
    <div
      className={cx(
        ROOT_CLASSNAME,
        isTabletOrDesktop && "px-lg pb-lg",
        gridColumnWidth && `col-span-${gridColumnWidth}`,
        className
      )}
    >
      <ImageLazy
        className={cx(isTabletOrDesktop && "rounded-3xl")}
        images={images}
      />
    </div>
  );
};

export default PromotionHeaderImage;
