// @flow
import React from "react";
import { useUnmount } from "react-use";
import { useQuery } from "@apollo/client";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import TrackClick from "Components/TrackClick";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { GameTileHeart } from "Components/GameTileHeart/GameTileHeart";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GameTileHeart.graphql' or it... Remove this comment to see the full error message
import { GameTileHeartQuery } from "./GameTileHeart.graphql";
import {
  useAddGameToMyList,
  useRemoveGameFromMyList,
  numberOfGames,
} from "./GameTileHeart.Mutations";

type Props = {
  heartClassName?: string,
  containerClassName?: string,
  gameId: string,
  gameName: string,
};

export const GameTileHeartContainer = React.memo<Props>(
  ({
    heartClassName = "u-padding u-width--2xlg",
    containerClassName = "",
    gameId,
    gameName,
  }: Props) => {
    const [skip, setSkip] = React.useState(false);

    const { data, loading } = useQuery<
      A.GameTileHeartQuery,
      A.GameTileHeartQueryVariables
    >(GameTileHeartQuery, { variables: { numberOfGames }, skip });

    useUnmount(() => setSkip(true));

    const addGame = useAddGameToMyList(gameId);
    const removeGame = useRemoveGameFromMyList(gameId);

    if (loading) {
      return null;
    }

    const isInMyList = (data?.gamesList?.games || []).find(
      x => x.id === gameId
    );
    const onFavouriteGame = isInMyList ? removeGame : addGame;

    return (
      <Flex.Item
        className={containerClassName}
        onClick={e => e.stopPropagation()}
      >
        <TrackClick
          eventName={EVENTS.MIXPANEL_GAME_FAVOURITE_CLICKED}
          data={{
            [EVENT_PROPS.GAME_NAME]: gameName,
            [EVENT_PROPS.IS_FAVOURITE]: !isInMyList,
          }}
        >
          <GameTileHeart
            className={heartClassName}
            onClick={onFavouriteGame}
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'GameTileHeartQuery_gamesList_games' is not a... Remove this comment to see the full error message
            isActive={isInMyList}
          />
        </TrackClick>
      </Flex.Item>
    );
  }
);
