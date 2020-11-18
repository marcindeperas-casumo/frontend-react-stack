// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/react-hooks";
import Flex from "@casumo/cmp-flex";
import Scrollable from "@casumo/cmp-scrollable";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import * as A from "Types/apollo";
import { GameRow, GameRowText } from "Components/GameRow";
import { GameListQuery } from "Components/GameListHorizontal/GameListHorizontalDefault/GameListHorizontalDefault.graphql";
import { useTranslations } from "Utils/hooks";
import {
  blueRibbonGamesListId,
  jackpotWidgetWidth,
  jackpotWidgetContentPage,
  type JackpotWidgetContentPage,
} from "./blueRibbonConsts";
import { BlueRibbonJackpotsWidgetContainer } from "./BlueRibbonJackpotsWidgetContainer";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "none",
};

type Props = {
  jackpot: {
    pots: Array<{
      communityWinRatio: number,
      mainWinRatio: number,
      potId: string,
      potName: string,
    }>,
  },
};

export function BlueRibbonChristmas({ jackpot }: Props) {
  const t = useTranslations<JackpotWidgetContentPage>(jackpotWidgetContentPage);
  const { data } = useQuery<A.GameListQuery, A.GameListQueryVariables>(
    GameListQuery,
    {
      variables: { id: blueRibbonGamesListId, numberOfGames: 30 },
    }
  );
  const columns = R.splitEvery(3, R.pathOr([], ["gamesList", "games"], data));

  if (!t) {
    return null;
  }

  return (
    <Flex direction="vertical" className="o-wrapper u-padding-top--xlg">
      <div className="u-margin-x--md u-margin-x--3xlg@tablet u-margin-x--none@desktop">
        <ScrollableListTitleRow title={t.section_title} />
      </div>
      <Scrollable
        numberOfItems={columns.length + 1}
        itemRenderer={i => {
          if (i === 0) {
            return <BlueRibbonJackpotsWidgetContainer key="br-widget" />;
          }

          return columns[i - 1].map(game => (
            <div
              key={game.id}
              className="u-padding-bottom"
              style={{ width: jackpotWidgetWidth }}
            >
              <GameRow
                big
                game={game}
                className="t-background-white u-padding--md t-border-r--md t-elevation--10"
                renderText={() => (
                  <div style={{ width: 156 }}>
                    <GameRowText name={game.name} />
                  </div>
                )}
              />
            </div>
          ));
        }}
        padding={PADDING_PER_DEVICE}
      />
    </Flex>
  );
}
