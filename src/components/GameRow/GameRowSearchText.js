// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { GameRowSearchTitle } from "Components/GameRow/GameRowSearchTitle";
import type { SearchProps } from "Components/GameRow/GameRow";

export const GameRowSearchText = ({
  name,
  search,
}: {
  name: string,
  search: SearchProps | boolean,
}) => {
  /* eslint-disable fp/no-let, fp/no-mutation */
  let highlightSearchQuery, query;

  if (typeof search === "boolean") {
    highlightSearchQuery = false;
    query = "";
  } else {
    ({ highlightSearchQuery, query } = search);
  }
  /* eslint-enable fp/no-let, fp/no-mutation */

  return (
    <Flex.Block className="u-padding-left--sm t-color-grey-dark-2">
      <GameRowSearchTitle
        highlightSearchQuery={highlightSearchQuery}
        name={name}
        query={query}
      />
    </Flex.Block>
  );
};
