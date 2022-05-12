import { useQuery } from "@apollo/client";
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { GameListHorizontalWithWidget } from "Components/GameListHorizontal/GameListHorizontalWithWidget";
import { GameListQuery } from "Components/GameListHorizontal/GameListHorizontalDefault/GameListHorizontalDefault.graphql";
import { useTranslations } from "Utils/hooks";
import { PromotionalGameListWidget } from "./PromotionalGameListWidget";

export type PromotionalGameList = {
  read_more_text: string;
  read_more_link: string;
  terms_and_conditions_text: string;
  terms_and_conditions_url: string;
  background_image: string;
  sticker_background_color?: string;
};

export function PromotionalGameListsContainer(props: {
  game_list_name: string;
  config: string;
}) {
  const promotionDetails = useTranslations<{
    read_more_text: string;
    read_more_link: string;
    terms_and_conditions_text: string;
    terms_and_conditions_url: string;
    background_image: any;
    sticker_background_color?: string;
    game_list_name: string;
  }>(`generic-promotional-game-lists.${props.config}`);

  const { data } = useQuery<A.GameListQuery, A.GameListQueryVariables>(
    GameListQuery,
    {
      variables: {
        id: props.game_list_name,
        numberOfGames: 30,
      },
    }
  );

  return (
    promotionDetails && (
      <GameListHorizontalWithWidget
        gamesInColumn={3}
        name={promotionDetails.game_list_name}
        games={R.pathOr([], ["gamesList", "games"], data)}
      >
        <Flex direction="horizontal" className="u-padding-right">
          <PromotionalGameListWidget
            content={{
              read_more_text: promotionDetails.read_more_text,
              read_more_link: promotionDetails.read_more_link,
              terms_and_conditions_text:
                promotionDetails.terms_and_conditions_text,
              terms_and_conditions_url:
                promotionDetails.terms_and_conditions_url,
              background_image: promotionDetails?.background_image?.url,
              sticker_background_color:
                promotionDetails.sticker_background_color,
            }}
          />
        </Flex>
      </GameListHorizontalWithWidget>
    )
  );
}
