// @flow
import * as React from "react";
import * as R from "ramda";
import classNames from "classnames";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import DangerousHtml from "Components/DangerousHtml";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import { isMobile } from "Components/ResponsiveLayout";
import { useTranslations } from "Utils/hooks";
import VirtualList from "Components/VirtualList";
import { navigateById } from "Services/NavigationService";
import { GetGamesRTP } from "./GetGamesRTP.graphql";

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
const TableRow = ({
  columns = [],
  textProps = {},
}: {
  columns: Array<?string>,
  textProps?: {},
}) => (
  <>
    <Flex
      className="t-border-right o-flex__block"
      align="center"
      style={{ width: "40%" }}
    >
      <Text size="sm" {...textProps}>
        {columns[0]}
      </Text>
    </Flex>
    <Flex
      className="t-border-right"
      justify="center"
      align="center"
      style={{ width: "20%" }}
    >
      <Text size="sm" {...textProps}>
        {columns[1]}
      </Text>
    </Flex>
    <Flex
      className="t-border-right"
      justify="center"
      align="center"
      style={{ width: "20%" }}
    >
      <Text size="sm" {...textProps}>
        {columns[2]}
      </Text>
    </Flex>
    <Flex
      className="t-border-right"
      justify="center"
      align="center"
      style={{ width: "20%" }}
    >
      <Text size="sm" {...textProps}>
        {columns[3]}
      </Text>
    </Flex>
  </>
);
const rowContainerClasses =
  "t-border-bottom t-border-left u-padding-left t-background-white";
export const CasinoGames = () => {
  const t = useTranslations<{
    meta_description: string,
    meta_title: string,
    rtp_description: string,
    rtp_game_name: string,
    rtp_game_provider: string,
    rtp_loading: string,
    rtp_value: string,
    actual_rtp_past_6_months: string,
    actual_rtp_past_year: string,
  }>("game-categories");
  const categoriesContent = useTranslations("game-categories", true);
  // const slotsContent = useTranslations("game-categories.slots");
  // console.log(a, b);
  const query = "categories=SLOT_MACHINE";
  const { data, loading, fetchMore } = useQuery<
    A.GetGamesRTP,
    A.GetGamesRTPVariables
  >(GetGamesRTP, {
    variables: {
      query,
      offset: 0,
      limit: 48,
    },
  });

  if (loading || !data || !data.getGamesPaginated || !t || !categoriesContent) {
    return null;
  }

  const { games, gamesCount } = data.getGamesPaginated;

  const rtpTable = (
    <Flex direction="vertical" className="t-border-top u-margin-top">
      <Flex
        className={classNames(
          "u-position-sticky--top u-top-0 u-zindex--content-overlay",
          rowContainerClasses
        )}
        style={{ minHeight: rowHeight }}
      >
        <TableRow
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
            <TableRow
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
        scrollElement={document.getElementById(ROOT_SCROLL_ELEMENT_ID)}
      />
    </Flex>
  );

  if (isMobile()) {
    return (
      <>
        <div className="u-padding">
          <DangerousHtml html={categoriesContent} />
          <Flex className="u-padding-y--md">
            <Button
              variant="primary"
              className="u-margin-left"
              onClick={() =>
                navigateById({
                  routeId: "game-information",
                  params: {
                    gameType: "slots",
                  },
                })
              }
            >
              Slots
            </Button>
            <Button
              variant="primary"
              className="u-margin-left"
              onClick={() => navigateById({ routeId: "play-roulette" })}
            >
              Ruleta
            </Button>
            <Button
              variant="primary"
              className="u-margin-left"
              onClick={() => navigateById({ routeId: "play-blackjack" })}
            >
              Blackjack
            </Button>
          </Flex>
          <DangerousHtml html={t.rtp_description} />
        </div>
        {rtpTable}
      </>
    );
  }

  return rtpTable;
};
