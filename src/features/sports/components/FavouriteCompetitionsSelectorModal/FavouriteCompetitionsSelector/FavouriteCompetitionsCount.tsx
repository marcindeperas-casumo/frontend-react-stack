// @flow
import * as React from "react";
import Badge from "@casumo/cmp-badge";
import Flex from "@casumo/cmp-flex";

// @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
const FavouriteCompetitionsCount = ({ count }: { count: number }): React.Node =>
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
