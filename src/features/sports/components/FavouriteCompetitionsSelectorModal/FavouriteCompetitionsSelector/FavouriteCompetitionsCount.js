// @flow
import * as React from "react";
import Badge from "@casumo/cmp-badge";
import Flex from "@casumo/cmp-flex";

const FavouriteCompetitionsCount = ({ count }: { count: number }): React.Node =>
  count ? (
    <Flex.Item>
      <Badge
        tag="h6"
        size="xs"
        bgColor="plum"
        txtColor="white"
        className="u-font-weight-bold"
        circle
      >
        {count}
      </Badge>
    </Flex.Item>
  ) : null;

export default FavouriteCompetitionsCount;
