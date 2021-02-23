// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/GameListHorizontal/... Remove this comment to see the full error message
import { GameListQuery } from "Components/GameListHorizontal/GameListHorizontalDefault/GameListHorizontalDefault.graphql";
import { useTranslations } from "Utils/hooks";
import { GameListHorizontalWithWidget } from "Components/GameListHorizontal/GameListHorizontalWithWidget";
import {
  blueRibbonGamesListId,
  jackpotWidgetContentPage,
  // @ts-expect-error ts-migrate(2305) FIXME: Module '"./blueRibbonConsts"' has no exported memb... Remove this comment to see the full error message
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
