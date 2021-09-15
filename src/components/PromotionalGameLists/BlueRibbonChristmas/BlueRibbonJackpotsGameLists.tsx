import { useQuery } from "@apollo/client";
import * as React from "react";
import * as R from "ramda";
import * as A from "Types/apollo";
import { GameListHorizontalWithWidget } from "Components/GameListHorizontal/GameListHorizontalWithWidget";
import { GameListQuery } from "Components/GameListHorizontal/GameListHorizontalDefault/GameListHorizontalDefault.graphql";
import { useTranslatedUrl, useTranslations } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { BlueRibbonJackpotsWidget } from "./BlueRibbonJackpotsWidget";
import { useBlueRibbonSDKAnonymous } from "./useBlueRibbonSDK";
import { useComposedJackpotConfigBySlug } from "./useComposedJackpot";

export function BlueRibbonJackpotsGameLists(props: { jackpot_slug: string }) {
  const { composedJackpot } = useComposedJackpotConfigBySlug({
    slug: props.jackpot_slug,
  });

  const t = useTranslations<{ more_link: string }>(
    "built-pages.top-lists-translations"
  );
  const jackpotConfigs = useTranslations<{
    jackpot_image: string;
  }>(`jackpots-configs.${props.jackpot_slug}`);

  useBlueRibbonSDKAnonymous();

  const seeMoreUrl = useTranslatedUrl(ROUTE_IDS.JACKPOTS_DETAILS, {
    slug: props.jackpot_slug,
  });

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
      seeMore={{
        url: `/${seeMoreUrl}`,
        text: t.more_link,
      }}
      Widget={() => (
        <BlueRibbonJackpotsWidget
          composedPots={composedJackpot.pots}
          widgetColor={composedJackpot.widgetColor}
          jackpotLogo={jackpotConfigs.jackpot_image}
        />
      )}
    />
  );
}
