// @flow
import * as React from "react";
import type { Node } from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  id: string,
  overlay: Node,
  width: number,
  height: number,
  itemToMask: Node,
  className: string,
  children: React.Node,
};

const MaskItem = ({
  id,
  width,
  height,
  className,
  overlay,
  itemToMask,
  children,
}: Props) => {
  return (
    <div className={className} style={{ width, height }}>
      <div
        className="u-position-absolute"
        style={{ clipPath: `url(#__mask-image-${id})` }}
      >
        {overlay && overlay()}
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <defs>
          <clipPath id={`__mask-image-${id}`}>{children}</clipPath>
        </defs>
        <div style={{ clipPath: `url(#__mask-image-${id})` }}>
          {itemToMask && itemToMask()}
        </div>
        <rect
          clipPath={`url(#__mask-image-${id})`}
          width="144"
          height="80"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default MaskItem;
