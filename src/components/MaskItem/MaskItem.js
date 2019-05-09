// @flow
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
  id,
  width,
  height,
  className,
  shapeMask,
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
