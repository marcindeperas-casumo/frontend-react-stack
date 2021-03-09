import React from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import * as A from "Types/apollo";
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
  const valuesColumns = ["rtp", "actualRtpPast6Months", "actualRtpPastYear"];
  const rowStyles = {
    height: 50,
    width: "100%",
  };
  const loadMoreRows = loadMoreConstructor(
    fetchMore,
    data.getGamesPaginated.gamesCount
  );
  setTimeout(() => {
    fetchMore({ offset: games.length });
    // loadMoreRows({ offset: games.length });
  }, 10000);

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

      {games.map((game, index) => {
        const lastGame = games.length - 1 === index;
        const rowClass = lastGame
          ? rowContainerClasses + "last-game-entry-row"
          : rowContainerClasses;

        // eslint-disable-next-line fp/no-mutation
        const rowTopOffset = index === 0 ? 59 : index * 50;
        const stylesInclTop = {
          top: rowTopOffset,
          ...rowStyles,
        };
        return (
          <Flex
            align="stretch"
            key={game.id || index}
            style={stylesInclTop}
            className={rowClass}
          >
            <RtpTableRow
              columns={[
                game?.title,
                ...valuesColumns.map(keyName =>
                  game ? formatRTPValue(game[keyName]) : null
                ),
              ]}
              textProps={textClasses}
            />
          </Flex>
        );
      })}
    </Flex>
  );
};
