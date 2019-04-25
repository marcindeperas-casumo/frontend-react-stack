// @flow
import * as R from "ramda";
import * as React from "react";
import Skeleton from "@casumo/cmp-skeleton";

type Props = {
  fontSize: number,
  lineHeight: number,
  radius: number,
};

// eslint-disable-next-line fp/no-mutation
ParagraphSkeleton.defaultProps = {
  radius: 2,
};

export function ParagraphSkeleton(props: Props) {
  return (
    <Skeleton viewBox={null} width="100%" height={`${4 * props.lineHeight}px`}>
      {R.times(
        i => (
          <rect
            key={i}
            x={0}
            y={i * props.lineHeight}
            rx={props.radius}
            ry={props.radius}
            width="100%"
            height={`${props.fontSize}px`}
          />
        ),
        3
      )}
      <rect
        x={0}
        y={3 * props.lineHeight}
        rx={props.radius}
        ry={props.radius}
        width="50%"
        height={`${props.fontSize}px`}
      />
    </Skeleton>
  );
}
