import { useQuery } from "@apollo/client";
import * as React from "react";
import { useSelector } from "react-redux";
import * as R from "ramda";
import * as A from "Types/apollo";
import { GameListHorizontalWithWidget } from "Components/GameListHorizontal/GameListHorizontalWithWidget";
import { GameListQuery } from "Components/GameListHorizontal/GameListHorizontalDefault/GameListHorizontalDefault.graphql";
import { useTranslatedUrl, useTranslations } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { blueRibbonJackpotBySlugSelector } from "Models/blueribbonJackpots/jackpots.selectors";
import { useBlueRibbonSDKAnonymous } from "./useBlueRibbonSDK";
import { useComposedJackpotConfigBySlug } from "./useComposedJackpot";
import { BlueRibbonJackpotsWidgetContainer } from "./BlueRibbonJackpotsWidgetContainer";

export const BlueRibbonJackpotsGameLists = React.memo(function (props: {
  jackpot_slug: string;
}) {
  useComposedJackpotConfigBySlug({ slug: props.jackpot_slug });
  const composedJackpot = useSelector(
    blueRibbonJackpotBySlugSelector(props.jackpot_slug)
  );

  const t = useTranslations<{ more_link: string }>(
    "built-pages.top-lists-translations"
  );

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

  return (
    Boolean(composedJackpot?.pots) && (
      <>
        <GameListHorizontalWithWidget
          gamesInColumn={composedJackpot?.pots.length > 2 ? 3 : 2}
          name={composedJackpot?.title}
          games={R.pathOr([], ["gamesList", "games"], data)}
          jackpotSlug={props.jackpot_slug}
          seeMore={{
            url: `/${seeMoreUrl}`,
            text: t?.more_link,
          }}
          hasOnBoarding
        >
          <BlueRibbonJackpotsWidgetContainer
            jackpot_slug={props.jackpot_slug}
          />
        </GameListHorizontalWithWidget>
      </>
    )
  );
});
