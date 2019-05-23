// @flow
import * as React from "react";
import type { Node } from "react";

type Props = {
  id: string,
  width: number,
  height: number,
  className?: string,
  shapeMask: () => Node,
  imageUrl: string,
  blur?: number,
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
  /** The shape of the mask to display from the element */
  shapeMask,
  /** The url of the image to be nasked */
  imageUrl,
  /** The amount of bluring to be applied */
  blur = 0,
}: Props) => (
  <div className={className} style={{ width, height }}>
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <defs>
        <clipPath id={`__mask-image-${id}`}>{shapeMask()}</clipPath>
      </defs>
      <filter id={`__blur-image-${id}`}>
        <feGaussianBlur stdDeviation={blur} />
      </filter>
      <image
        clipPath={`url(#__mask-image-${id})`}
        filter={`url(#__blur-image-${id})`}
        href={imageUrl}
        preserveAspectRatio="none"
        x="0"
        y="0"
        width="100%"
        height="100%"
      />
    </svg>
  </div>
);

export default MaskImage;
