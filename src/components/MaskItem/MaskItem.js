// @flow
// To move this to CUDL
import * as React from "react";
import type { Node } from "react";

type Props = {
  id: string,
  width: number,
  height: number,
  className?: string,
  shapeMask: Function,
  children: Node,
};

const MaskItem = ({
  /** An id for the masked item. This should be unique all through out the page */
  id,
  /** Total width of the masked element */
  width,
  /** Total height of the masked element */
  height,
  /** Class name to attach to the masked item */
  className,
  /** The shape of the mask to display from the elemen t */
  shapeMask,
  /** The element to mask */
  children,
}: Props) => {
  return (
    <div className={className} style={{ width, height }}>
      <div
        className="u-position-absolute o-mask-overlay"
        style={{ clipPath: `url(#__mask-item-${id})` }}
      >
        {children}
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <defs>
          <clipPath id={`__mask-item-${id}`}>
            {shapeMask && shapeMask()}
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default MaskItem;
