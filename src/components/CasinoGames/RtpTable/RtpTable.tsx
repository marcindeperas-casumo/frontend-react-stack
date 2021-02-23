//@flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import * as A from "Types/apollo";
import VirtualList from "Components/VirtualList";
import { isMobile } from "Components/ResponsiveLayout";
import { loadMoreConstructor } from "Utils";
import { RtpTableRow } from "./RtpTableRow";

const formatRTPValue = (x: ?string) => {
  if (!x) {
    return "";
  }

  const n = parseFloat(x).toFixed(2);
  if (n === "NaN") {
    // happens when parseFloat returned NaN
    return "";
  }

  return n;
};

const rowHeight = 50;
const textClasses = isMobile()
  ? {}
  : { className: "u-text-overflow--ellipsis" };

export const RtpTable = ({
  games,
  data,
  fetchMore,
  query,
  gamesCount,
  scrollElementId,
  headerColumns,
  valuesColumns,
}: {
  games: Array<A.GetGamesRTP_getGamesPaginated_games>,
  data: any,
  fetchMore: any,
  query: string,
  gamesCount: number,
  scrollElementId: string,
  headerColumns: Array<?string>,
  valuesColumns: Array<string>,
}) => {
  const rowContainerClasses =
    "t-border-bottom t-border-left t-border-grey-5 t-background-white";

  return (
    <Flex
      direction="vertical"
      className="t-border-top t-border-grey-5 u-margin-top"
    >
      <Flex
        className={classNames(
          "u-position-sticky--top u-top-0 u-zindex--content-overlay",
          rowContainerClasses
        )}
        style={{ minHeight: rowHeight }}
      >
        <RtpTableRow columns={headerColumns} />
      </Flex>

      <VirtualList
        games={games}
        loadMoreRows={loadMoreConstructor(
          fetchMore,
          data.getGamesPaginated.gamesCount
        )}
        isRowLoaded={({ index }) => Boolean(games[index])}
        rowHeight={rowHeight}
        listHash={query}
        pageSize={24}
        totalNumberOfRows={gamesCount}
        rowRenderer={({
          key,
          index,
          style,
        }: {
          key: string,
          index: number,
          style: Object,
        }) => (
          <Flex
            align="stretch"
            key={key}
            style={style}
            className={rowContainerClasses}
          >
            <RtpTableRow
              columns={[
                games[index]?.title,
                ...valuesColumns.map(keyName =>
                  games[index] ? formatRTPValue(games[index][keyName]) : null
                ),
              ]}
              textProps={textClasses}
            />
          </Flex>
        )}
        scrollElement={document.getElementById(scrollElementId)}
      />
    </Flex>
  );
};
