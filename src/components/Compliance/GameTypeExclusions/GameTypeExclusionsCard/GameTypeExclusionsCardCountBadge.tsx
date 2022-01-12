import * as React from "react";
import cx from "classnames";
import Badge from "@casumo/cmp-badge";

type TProps = {
  count: number;
};

export function GameTypeExclusionsCardCountBadge({ count }: TProps) {
  const someSelected = count > 0;

  return (
    <Badge
      tag="div"
      size="xs"
      bgColor={cx({
        "grey-20": !someSelected,
        "purple-60": someSelected,
      })}
      circle
    >
      {count}
    </Badge>
  );
}
