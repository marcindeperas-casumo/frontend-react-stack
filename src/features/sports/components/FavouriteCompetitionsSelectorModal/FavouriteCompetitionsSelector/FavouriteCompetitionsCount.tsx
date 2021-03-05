import Badge from "@casumo/cmp-badge";
import Flex from "@casumo/cmp-flex";
import * as React from "react";

const FavouriteCompetitionsCount = ({
  count,
}: {
  count: number;
}): React.ReactNode =>
  count ? (
    <Flex.Item>
      <Badge
        tag="h6"
        size="xs"
        bgColor="purple-50"
        txtColor="white"
        className="u-font-weight-bold"
        circle
      >
        {count}
      </Badge>
    </Flex.Item>
  ) : null;

export default FavouriteCompetitionsCount;
