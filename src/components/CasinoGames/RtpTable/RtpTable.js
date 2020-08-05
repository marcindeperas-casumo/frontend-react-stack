//@flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import * as R from "ramda";
import classNames from "classnames";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import VirtualList from "Components/VirtualList";
import { isMobile } from "Components/ResponsiveLayout";
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

const gamesLense = R.lensPath(["getGamesPaginated", "games"]);
export function insertIntoArray(newData: Array<any>, offset: number) {
  return R.pipe(
    R.remove(offset, newData.length),
    R.insertAll(offset, newData)
  );
}

const loadMoreConstructor = (fetchMore, gamesCount) => ({
  startIndex,
  stopIndex,
}) => {
  const tmpLimit = stopIndex - startIndex;
  const limit = Math.max(Math.min(tmpLimit, 100), 1); // it blows up above 100 and below 1
  const offset = tmpLimit > 100 ? stopIndex - limit : startIndex;

  return fetchMore<A.GetGamesRTPVariables>({
    variables: { offset, limit },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return prev;
      }

      const insertNewGames = insertIntoArray(
        fetchMoreResult.getGamesPaginated.games,
        fetchMoreResult.getGamesPaginated.offset
      );

      return R.over(
        gamesLense,
        prevGames => {
          if (prevGames.length !== gamesCount) {
            return R.pipe(
              insertIntoArray(prevGames, 0),
              insertNewGames
            )(new Array(gamesCount));
          }

          return insertNewGames(prevGames);
        },
        prev
      );
    },
  });
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
}) => {
  const t = useTranslations<{
    rtp_game_name: string,
    rtp_game_provider: string,
    rtp_loading: string,
    rtp_value: string,
  }>("game-categories");

  const rowContainerClasses =
    "t-border-bottom t-border-left t-border-grey-5 u-padding-left t-background-white";

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
        <RtpTableRow
          columns={[
            t.rtp_game_name,
            t.rtp_value,
            t.actual_rtp_past_6_months,
            t.actual_rtp_past_year,
          ]}
        />
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
                formatRTPValue(games[index]?.rtp),
                formatRTPValue(games[index]?.actualRtpPast6Months),
                formatRTPValue(games[index]?.actualRtpPastYear),
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
