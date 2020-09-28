// @flow
import * as React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import Flex from "@casumo/cmp-flex";
import { Select } from "Components/Select";
import { useTranslations } from "Utils/hooks";
import * as A from "Types/apollo";

type Props = {
  setSort: A.GamesSortOrder => void,
  supportedSorts: Array<A.GamesSortOrder>,
  sort: ?A.GamesSortOrder,
};

const loading = (
  <Skeleton
    colorHi="#d3d8e1"
    colorLow="#e5eaed"
    viewBox={null}
    width="92"
    height="32"
  >
    <rect x="0" y="0" rx="16" ry="16" width="100%" height="100%" />
  </Skeleton>
);
export function GameListPageSort({ sort, setSort, supportedSorts }: Props) {
  const t = useTranslations<{
    A_TO_Z_BY_TITLE: string,
    HIGHEST_TO_LOWEST_BY_JACKPOT_VALUE: string,
    LEAST_TO_MOST_POPULAR: string,
    LOWEST_TO_HIGHEST_BY_JACKPOT_VALUE: string,
    MOST_TO_LEAST_POPULAR: string,
    NEWEST_TO_OLDEST_BY_RELEASE_DATE: string,
    OLDEST_TO_NEWEST_BY_RELEASE_DATE: string,
    Z_TO_A_BY_TITLE: string,
    title: string,
  }>("new-game-browser.sorting");

  return (
    <Flex className="u-margin-right u-margin-bottom">
      {t ? (
        <Select
          onChange={setSort}
          options={supportedSorts.reduce(
            (acc, curr) => ({
              ...acc,
              // $FlowIgnore: CURATED_* are hidden from front-end
              [curr]: t[curr],
            }),
            {}
          )}
          value={sort}
          emptyState={t.title}
        />
      ) : (
        loading
      )}
    </Flex>
  );
}
