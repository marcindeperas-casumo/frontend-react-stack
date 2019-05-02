// @flow
import * as React from "react";

type Props = {
  id: string,
  imageUrl: string,
  width: number,
  height: number,
  children: React.Node,
  className: string,
};

const MaskImage = ({
  id,
  imageUrl,
  width,
  height,
  className,
  children,
}: Props) => {
  return (
    <div className={className} style={{ width, height }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <defs>
          <clipPath id={`__mask-image-${id}`}>{children}</clipPath>
        </defs>

        <image
          clipPath={`url(#__mask-image-${id})`}
          href={imageUrl}
          preserveAspectRatio="none"
          x="0"
          y="0"
          // width="100%"
          // height="100%"
        />
      </svg>
    </div>
  );
};

export default MaskImage;
