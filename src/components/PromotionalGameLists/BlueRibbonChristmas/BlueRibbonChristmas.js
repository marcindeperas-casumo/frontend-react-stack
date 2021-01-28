// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { GameListQuery } from "Components/GameListHorizontal/GameListHorizontalDefault/GameListHorizontalDefault.graphql";
import { useTranslations } from "Utils/hooks";
import { GameListHorizontalWithWidget } from "Components/GameListHorizontal/GameListHorizontalWithWidget";
import {
  blueRibbonGamesListId,
  jackpotWidgetContentPage,
  type JackpotWidgetContentPage,
} from "./blueRibbonConsts";
import { BlueRibbonJackpotsWidgetContainer } from "./BlueRibbonJackpotsWidgetContainer";

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

export const BlueRibbonChristmas = React.memo<Props>(({ jackpot }: Props) => {
  const t = useTranslations<JackpotWidgetContentPage>(jackpotWidgetContentPage);
  const { data } = useQuery<A.GameListQuery, A.GameListQueryVariables>(
    GameListQuery,
    {
      variables: { id: blueRibbonGamesListId, numberOfGames: 30 },
    }
  );

  if (!t) {
    return null;
  }

  return (
    <GameListHorizontalWithWidget
      name={t.section_title}
      games={R.pathOr([], ["gamesList", "games"], data)}
      Widget={BlueRibbonJackpotsWidgetContainer}
    />
  );
});
