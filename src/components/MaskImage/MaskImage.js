// @flow
import * as React from "react";
import { getImgixUrl } from "@casumo/cudl-react-utils";

type Props = {
  /** An id for the masked item. This should be unique all throughout the page */
  id: string,
  /** Total width of the masked element */
  width: number,
  /** Total height of the masked element */
  height: number,
  /** Class name to attach to the masked item */
  className?: string,
  /** The mask shape/s to clip the image */
  children: React.Node,
  /** The url of the image to be nasked */
  imageUrl: string,
  /** The imgix options to apply to the image */
  imgixOpts?: {},
};

const MaskImage = ({
  id,
  width,
  height,
  className,
  children,
  imageUrl,
  imgixOpts = {},
}: Props) => {
  const imgixImageUrl = getImgixUrl(imageUrl, "", imgixOpts);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
