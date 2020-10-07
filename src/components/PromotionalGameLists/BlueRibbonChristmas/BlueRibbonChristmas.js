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
import { useFetch, useTranslations } from "Utils/hooks";
import {
  urls,
  blueRibbonGamesListId,
  jackpotWidgetContentPage,
  type JackpotWidgetContentPage,
} from "./blueRibbonConsts";
import { usePotStateChangeEvent } from "./useBlueRibbonSDK";
import { BlueRibbonJackpotsWidget } from "./BlueRibbonJackpotsWidget";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

export function BlueRibbonChristmas() {
  const { response } = useFetch(urls.handshake);
  const t = useTranslations<JackpotWidgetContentPage>(jackpotWidgetContentPage);
  const pots = usePotStateChangeEvent();
  const { data } = useQuery<A.GameListQuery, A.GameListQueryVariables>(
    GameListQuery,
    {
      variables: { id: blueRibbonGamesListId, numberOfGames: 30 },
    }
  );

  const columns = R.splitEvery(3, R.pathOr([], ["gamesList", "games"], data));
  const available = R.propOr(false, "available", response);

  if (!available || !t || !response) {
    return null;
  }

  return (
    <Flex direction="vertical" className="o-wrapper u-padding-top--xlg">
      <ScrollableListTitleRow paddingLeft title={t.section_title} />
      <Scrollable
        numberOfItems={columns.length + 1}
        itemRenderer={i => {
          if (i === 0) {
            return (
              <BlueRibbonJackpotsWidget
                key="br-widget"
                t={t}
                jackpots={response.jackpots[0].pots
                  .map(
                    ({ communityWinRatio, mainWinRatio, potId, potName }) => ({
                      value: pots[potId]?.progressive,
                      label: potName,
                      status: pots[potId]?.potStatus,
                      potId,
                      communityWinRatio,
                      mainWinRatio,
                    })
                  )
                  .filter(x => x.value)}
              />
            );
          }

          return columns[i - 1].map(game => (
            <div key={game.id} className="u-padding-bottom">
              <GameRow
                big
                game={game}
                className="t-background-white u-padding--md t-border-r--md t-elevation--10"
                renderText={() => <GameRowText name={game.name} />}
              />
            </div>
          ));
        }}
        padding={PADDING_PER_DEVICE}
      />
    </Flex>
  );
}
