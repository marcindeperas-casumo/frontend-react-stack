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
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
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
    <Flex className="t-color-grey-70" direction="vertical" spacing="sm">
      <Flex.Item>
        <GameRowSearchTitle
          highlightSearchQuery={highlightSearchQuery}
          name={name}
          isInMaintenance={isInMaintenance}
          query={query}
        />
      </Flex.Item>
      {renderSecondaryText && <Flex.Item>{renderSecondaryText()}</Flex.Item>}
    </Flex>
  );
};
