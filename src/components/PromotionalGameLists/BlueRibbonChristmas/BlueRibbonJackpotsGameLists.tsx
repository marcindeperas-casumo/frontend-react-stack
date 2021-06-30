import { useQuery } from "@apollo/client";
import * as React from "react";
import * as R from "ramda";
import * as A from "Types/apollo";
import { GameListHorizontalWithWidget } from "Components/GameListHorizontal/GameListHorizontalWithWidget";
import { GameListQuery } from "Components/GameListHorizontal/GameListHorizontalDefault/GameListHorizontalDefault.graphql";
import { BlueRibbonJackpotsWidget } from "./BlueRibbonJackpotsWidget";
import { useBlueRibbonSDKAnonymous } from "./useBlueRibbonSDK";
import { useComposedJackpotConfigBySlug } from "./useComposedJackpot";

export function BlueRibbonJackpotsGameLists(props: { jackpot_slug: string }) {
  const { composedJackpot } = useComposedJackpotConfigBySlug({
    slug: props.jackpot_slug,
  });
  useBlueRibbonSDKAnonymous();
  const { data } = useQuery<A.GameListQuery, A.GameListQueryVariables>(
    GameListQuery,
    {
      variables: {
        id: `blueribbon-${props.jackpot_slug}`,
        numberOfGames: 30,
      },
    }
  );

  if (!composedJackpot?.pots) {
    return null;
  }

  return (
    <GameListHorizontalWithWidget
      gamesInColumn={composedJackpot.pots.length > 2 ? 3 : 2}
      name={composedJackpot.title}
      games={R.pathOr([], ["gamesList", "games"], data)}
      Widget={() => (
        <BlueRibbonJackpotsWidget
          composedPots={composedJackpot.pots}
          widgetColor={composedJackpot.widgetColor}
        />
      )}
    />
  );
}
