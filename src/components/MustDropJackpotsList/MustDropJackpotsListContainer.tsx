// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { GAME_LIST_IDS, EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import * as A from "Types/apollo";
import { setData, setScroll } from "Models/gameBrowser";
import { useTranslations } from "Utils/hooks/useTranslations";
import { GameListHorizontalWithWidget } from "Components/GameListHorizontal/GameListHorizontalWithWidget";
import MustDropJackpotsWidget from "Components/MustDropJackpotsWidget";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './MustDropJackpotsListContaine... Remove this comment to see the full error message
import { MustDropJackpotsGamesListQuery } from "./MustDropJackpotsListContainer.graphql";

export const MustDropJackpotsListContainer = React.memo<null>(() => {
  const { data } = useQuery<
    A.MustDropJackpotsGamesListQuery,
    A.MustDropJackpotsGamesListQueryVariables
  >(MustDropJackpotsGamesListQuery, {
    variables: {
      id: GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES,
      numberOfGames: 20,
    },
  });

  const dispatch = useDispatch();

  const onSeeMoreClickHandler = () => {
    dispatch(
      setData({
        page: "jackpots",
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ page: string; filters: { "game... Remove this comment to see the full error message
        filters: { "gameFeatures=mustDropJackpot": true },
      })
    );
    dispatch(setScroll(0));
  };

  const t = useTranslations<{ more_link: string }>(
    "built-pages.top-lists-translations"
  );

  if (t && data?.gamesList?.games) {
    return (
      <TrackProvider
        data={{ [EVENT_PROPS.LOCATION]: "Must Drop Jackpots - Top Lists" }}
      >
        <GameListHorizontalWithWidget
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any[]' is not assignable to type 'string'.
          name={R.pathOr([], ["gamesList", "name"], data)}
          games={R.pathOr([], ["gamesList", "games"], data)}
          Widget={MustDropJackpotsWidget}
          seeMore={{
            text: t.more_link,
            url: "../jackpots",
            onClick: onSeeMoreClickHandler,
          }}
        />
      </TrackProvider>
    );
  }

  return null;
});
