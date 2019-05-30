// @flow
import * as React from "react";
import { getImgixUrl } from "@casumo/cudl-react-utils";

type Props = {
  id: string,
  width: number,
  height: number,
  className?: string,
  imageUrl: string,
  imgixOpts?: {},
  children: React.Node,
};

const MaskImage = ({
  /** An id for the masked item. This should be unique all throughout the page */
  id,
  /** Total width of the masked element */
  width,
  /** Total height of the masked element */
  height,
  /** Class name to attach to the masked item */
  className,
  /** The shape of the mask to clip the image */
  children,
  /** The url of the image to be nasked */
  imageUrl,
  /** The imgix options to apply to the image */
  imgixOpts = {
    w: 1,
    blur: 100,
  },
}: Props) => {
  const imgixImageUrl = getImgixUrl(imageUrl, "", imgixOpts);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
    >
      <defs>
        <clipPath
          id={`__mask-image-${id}`}
          clipPathUnits="objectBoundingBox"
          transform={`scale(${1 / width} ${1 / height})`}
        >
          {children}
        </clipPath>
      </defs>
      <image
        clipPath={`url(#__mask-image-${id})`}
        filter={`url(#__blur-image-${id})`}
        href={imgixImageUrl}
        preserveAspectRatio="none"
        x="0"
        y="0"
        width="100%"
        height="100%"
      />
    </svg>
  );
};

export default MaskImage;
