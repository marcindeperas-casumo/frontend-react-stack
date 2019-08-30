/* @flow */
import * as React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import { take, sum } from "ramda";

type BaseSkeletonParams = {
  width: string | number,
  height: string | number,
  x: number,
  y: number,
};

const KambiClientSkeleton = () => (
  <>
    <KambiNavSkeleton />
    <Skeleton
      colorHi="#d3d8e1"
      colorLow="#e5eaed"
      viewBox={null}
      width="100%"
      height={134 * 3 + 49}
    >
      <KambiHeaderSkeleton width="calc(100% - 6px)" height={49} x={3} y={0} />
      {[0, 1, 2].map(i => (
        <KambiOfferingSkeleton
          key={i}
          x={3}
          y={i * 134 - i * 3 + 46}
          width="calc(100% - 6px)"
          height={134}
        />
      ))}
    </Skeleton>
  </>
);

export default KambiClientSkeleton;

const KambiNavSkeleton = () => {
  const widths = [109, 61, 109];
  const gap = 21;
  const calculateWidths = i => sum(take(i, widths));
  const totalElWidth = sum(widths) + (widths.length - 1) * gap;

  return (
    <Skeleton
      colorHi="#d3d8e1"
      colorLow="#e5eaed"
      viewBox={null}
      width="100%"
      height={100}
    >
      {widths.map((width, i) => (
        <rect
          key={i}
          rx={1.5}
          ry={1.5}
          x={`calc((100% - ${totalElWidth}) / 2 + (${i} * ${gap} + ${calculateWidths(
            i
          )}))`}
          y={40}
          height={16}
          width={width}
        />
      ))}
    </Skeleton>
  );
};

const KambiHeaderSkeleton = ({ width, height, x, y }: BaseSkeletonParams) => (
  <OutlinedBox width={width} height={height} x={x} y={y} thickness={3}>
    <rect height={10} width={96} y={y + 18} x={14} rx={3} ry={3} />
  </OutlinedBox>
);

const KambiOfferingSkeleton = ({ width, height, x, y }: BaseSkeletonParams) => (
  <OutlinedBox width={width} height={height} thickness={3} x={x} y={y}>
    <rect height={10} width={81} rx={3} ry={3} x={20 + x} y={28 + y} />

    <rect height={8} width={46} rx={3} ry={3} x={20 + x} y={48 + y} />
    <rect height={8} width={46} rx={3} ry={3} x={71 + x} y={48 + y} />

    <rect
      height={39}
      width={`calc((${width} - 24) / 3)`}
      rx={3}
      ry={3}
      x={9 + x}
      y={81 + y}
    />
    <rect
      height={39}
      width={`calc((${width} - 24) / 3)`}
      rx={3}
      ry={3}
      x={`calc(15 + (${width} - 24) / 3 )`}
      y={81 + y}
    />
    <rect
      height={39}
      width={`calc((${width} - 24) / 3)`}
      rx={3}
      ry={3}
      x={`calc(18 + (${width} - 24) * 2 / 3)`}
      y={81 + y}
    />
  </OutlinedBox>
);

type OutlinedBoxParams = BaseSkeletonParams & {
  thickness: number,
  children?: React.Node,
};

const OutlinedBox = ({
  width,
  height,
  thickness,
  x,
  y,
  children,
}: OutlinedBoxParams) => {
  return (
    <>
      <rect
        width={width}
        height={thickness}
        x={x}
        y={y}
        rx={thickness}
        ry={thickness}
      />
      <rect
        width={width}
        height={thickness}
        x={x}
        y={`calc(${height} - ${thickness} + ${y})`}
        rx={thickness}
        ry={thickness}
      />
      <rect
        width={thickness}
        height={height}
        y={y}
        x={`calc(${width} - ${thickness} + ${x})`}
        rx={thickness}
        ry={thickness}
      />
      <rect
        width={thickness}
        x={x}
        y={y}
        height={height}
        rx={thickness}
        ry={thickness}
      />
      {children}
    </>
  );
};
