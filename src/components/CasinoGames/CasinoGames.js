// @flow
import * as React from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { useQuery } from "@apollo/react-hooks";
import DangerousHtml from "Components/DangerousHtml";
import { useTranslations } from "Utils/hooks";
import { navigateById } from "Services/NavigationService";
import { isMobile } from "Components/ResponsiveLayout";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import { GetGamesRTP } from "./GetGamesRTP.graphql";
import { RtpTable } from "./RtpTable/RtpTable";

export const CasinoGames = () => {
  const t = useTranslations<{
    meta_description: string,
    meta_title: string,
    rtp_description: string,
    rtp_game_name: string,
    rtp_game_provider: string,
    rtp_loading: string,
    rtp_value: string,
    actual_rtp_past_6_months: string,
    actual_rtp_past_year: string,
  }>("game-categories");
  const categoriesContent = useTranslations("game-categories", true);
  const query = "categories=SLOT_MACHINE";
  const { data, loading, fetchMore } = useQuery<
    A.GetGamesRTP,
    A.GetGamesRTPVariables
  >(GetGamesRTP, {
    variables: {
      query,
      offset: 0,
      limit: 48,
    },
  });

  if (loading || !data || !data.getGamesPaginated || !t || !categoriesContent) {
    return null;
  }

  const { games, gamesCount } = data.getGamesPaginated;

  const renderRtpTable = () => {
    return (
      <RtpTable
        games={games}
        data={data}
        fetchMore={fetchMore}
        query={query}
        gamesCount={gamesCount}
        scrollElementId={ROOT_SCROLL_ELEMENT_ID}
      />
    );
  };

  if (isMobile()) {
    return (
      <>
        <div className="u-padding">
          <DangerousHtml html={categoriesContent} />
          <Flex className="u-padding-y--md">
            <ButtonPrimary
              className="u-margin-left"
              onClick={() =>
                navigateById({
                  routeId: "game-information",
                  params: {
                    gameType: "slots",
                  },
                })
              }
            >
              Slots
            </ButtonPrimary>
            <ButtonPrimary
              className="u-margin-left"
              onClick={() => navigateById({ routeId: "play-roulette" })}
            >
              Ruleta
            </ButtonPrimary>
            <ButtonPrimary
              className="u-margin-left"
              onClick={() => navigateById({ routeId: "play-blackjack" })}
            >
              Blackjack
            </ButtonPrimary>
          </Flex>
          <DangerousHtml html={t.rtp_description} />
        </div>
        {renderRtpTable()}
      </>
    );
  }

  return renderRtpTable();
};
