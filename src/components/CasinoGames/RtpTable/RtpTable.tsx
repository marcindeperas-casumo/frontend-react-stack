import React from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import * as A from "Types/apollo";
import { isMobile } from "Components/ResponsiveLayout";
import { RtpTableRow } from "./RtpTableRow";

const formatRTPValue = (x: string) => {
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
  fetchMore,
  fullGamesCount,
  headerColumns,
}: {
  games: A.GetGamesRtpQuery["getGamesPaginated"]["games"];
  fetchMore: () => void;
  fullGamesCount: number;
  headerColumns?: Array<string>;
  valuesColumns: Array<string>;
}) => {
  const rowContainerClasses =
    "t-border-bottom t-border-left t-border-grey-5 t-background-white";
  const valuesColumns = ["rtp", "actualRtpPast6Months", "actualRtpPastYear"];
  const rowStyles = {
    height: 50,
    width: "100%",
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      fetchMore();
    }
  }, [fetchMore, inView]);

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
        // Trigger on which row to fetch more data eg below fifth from last
        const lastEntryInGamesBatch = games.length - 5 === index;
        const fullListAvailable = games.length === fullGamesCount;
        return (
          <Flex
            containerRef={
              !fullListAvailable && lastEntryInGamesBatch ? ref : null
            }
            align="stretch"
            key={game.id || index}
            style={rowStyles}
            className={rowContainerClasses}
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
