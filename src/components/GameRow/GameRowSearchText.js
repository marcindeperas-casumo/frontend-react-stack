// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { GameRowSearchTitle } from "Components/GameRow";

type SearchProps = {
  /** The search query */
  query?: string,
  /** Whether highlight the search query on the game title or not  */
  highlightSearchQuery?: boolean,
};

type Props = {
  name: string,
  search: SearchProps | boolean,
  isInMaintenance: boolean,
  renderSecondaryText?: () => React.Node,
};

export const GameRowSearchText = (props: Props) => {
  const { name, search, renderSecondaryText, isInMaintenance } = props;
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
        isInMaintenance={isInMaintenance}
        query={query}
      />
      {renderSecondaryText && renderSecondaryText()}
    </Flex.Block>
  );
};
