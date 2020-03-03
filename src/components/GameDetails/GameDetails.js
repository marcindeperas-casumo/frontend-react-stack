// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Text from "@casumo/cmp-text";
import { PlayIcon } from "@casumo/cmp-icons";
import Button from "@casumo/cmp-button";
import gql from "graphql-tag";
import * as A from "Types/apollo";
import { navigateById } from "Services/NavigationService";
import { launchGame } from "Services/LaunchGameService";
import DangerousHtml from "Components/DangerousHtml";
import { GameDetailsSkeleton } from "Components/GameDetails/GameDetailsSkeleton";
import { GameDetailsImage } from "Components/GameDetails/GameDetailsImage";

const GAME_QUERY = gql`
  query GetGame($slug: String!) {
    game(slug: $slug) {
      name
      logo
      backgroundImage
      description
      categories
      media {
        type
        path
        order
      }
      hasPlayForFun
    }
    playButtonText: getText(
      id: "root:mobile.game-details:fields.play_button_text"
    )
    practiceButtonText: getText(
      id: "root:mobile.game-details:fields.practice_button_text"
    )
    signUpButtonText: getText(
      id: "root:mobile.game-details:fields.sign_up_button_text"
    )
    trophiesHeading: getText(
      id: "root:mobile.game-details:fields.trophies_heading"
    )
    gameInMaintenanceText: getText(
      id: "root:mobile.game-details:fields.game_in_maintenance_text"
    )
    gameOnlyOnDesktopText: getText(
      id: "root:mobile.game-details:fields.game_only_on_desktop_text"
    )
    allGamesText: getText(id: "root:mobile.game-details:fields.all_games_text")
    gameReviewsHeadingText: getText(
      id: "root:mobile.game-details:fields.game_reviews_heading_text"
    )
  }
`;

export const GameDetails = ({ slug }: { slug: string }) => {
  const { loading, data } = useQuery<A.GetGame, A.GetGameVariables>(
    GAME_QUERY,
    {
      variables: { slug },
    }
  );
  // if hasGame
  // skeleton
  // handle games that don't exist
  if (!loading && !data) {
    navigateById({ routeId: "404" });
  }

  if (!loading && data && data.game) {
    // console.log(data.game);
    return (
      <div className="t-background-white u-margin-x--auto">
        <GameDetailsImage
          image={data.game.backgroundImage}
          mark={data.game.logo}
        />
        <div className="u-padding--md">
          <Text size="md" className="u-font-weight-bold u-margin-bottom--md">
            {data.game.name}
          </Text>
          <Text className="u-margin-bottom">
            <DangerousHtml html={data.game.description} />
          </Text>
          {data.game.media.map((media: ?A.GetGame_game_media) => (
            <img
              key={media.path}
              className="u-margin-bottom"
              src={media.path}
              alt=""
            />
          ))}
        </div>
        <div className="u-position-fixed u-bottom-0 u-left-shell-offset u-right-0 t-background-white u-padding--md">
          <Button
            className="u-width--full u-margin-bottom--md"
            variant="primary"
            onClick={() => launchGame({ slug })}
          >
            <PlayIcon size="sm" className="u-margin-right--sm" />
            <span>{data.playButtonText}</span>
          </Button>

          {data.game.hasPlayForFun && (
            <Button
              className="u-width--full"
              variant="secondary"
              onClick={() =>
                launchGame({
                  slug,
                  hasPlayForFun: data.game.hasPlayForFun,
                })
              }
            >
              <span>{data.practiceButtonText}</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return <GameDetailsSkeleton />;
};
