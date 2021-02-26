// @flow
import * as R from "ramda";
import * as React from "react";
import Text from "@casumo/cmp-text";
import Skeleton from "@casumo/cmp-skeleton";
import type { fontSizes } from "@casumo/cudl-react-prop-types";

type Props = {
  size: fontSizes,
  className?: string,
  lines?: number,
};

export function ParagraphSkeleton(props: Props) {
  const lines = props.lines || 4;
  const lastLine = lines - 1;

  return (
    <Text size={props.size} className={props.className}>
      <Skeleton width="100%" height="5em">
        {R.times(
          i => (
            <rect
              key={i}
              y={`${i * 1.25 + 0.125}em`}
              rx="2"
              ry="2"
              width={`${i === lastLine ? 50 : 100}%`}
              height="1em"
            />
          ),
          lines
        )}
      </Skeleton>
    </Text>
  );
}
