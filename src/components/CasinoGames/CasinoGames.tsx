import * as React from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import DangerousHtml from "Components/DangerousHtml";
import { useJurisdiction } from "Utils/hooks";
import { navigateById } from "Services/NavigationService";
import { isMobile } from "Components/ResponsiveLayout";
import { RtpTable } from "./RtpTable/RtpTable";

type TCasinoGamesTranslations = {
  meta_description: string;
  meta_title: string;
  rtp_description: string;
  rtp_game_name: string;
  rtp_game_provider: string;
  rtp_loading: string;
  rtp_value: string;
  actual_rtp_past_6_months: string;
  actual_rtp_past_year: string;
};

type TCasinoGamesProps = {
  t: TCasinoGamesTranslations;
  categoriesContent: any;
  games: any;
  fetchMore: () => void;
  fullGamesCount: number;
};

export const CasinoGames = ({
  t,
  categoriesContent,
  fetchMore,
  games,
  fullGamesCount,
}: TCasinoGamesProps) => {
  const [gamesData, setGamesData] = React.useState([]);

  React.useEffect(() => {
    if (games.length) {
      setGamesData(games);
    }
  }, [games]);

  const { isMGA } = useJurisdiction();

  if (!gamesData || !t || !categoriesContent) {
    return null;
  }

  const renderRtpTable = () => {
    return (
      !isMGA &&
      gamesData.length && (
        <RtpTable
          games={gamesData}
          fetchMore={fetchMore}
          fullGamesCount={fullGamesCount}
          headerColumns={[
            t.rtp_game_name,
            t.rtp_value,
            t.actual_rtp_past_6_months,
            t.actual_rtp_past_year,
          ]}
          valuesColumns={["rtp", "actualRtpPast6Months", "actualRtpPastYear"]}
        />
      )
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
          {!isMGA && <DangerousHtml html={t.rtp_description} />}
        </div>
        {renderRtpTable()}
      </>
    );
  }

  return renderRtpTable();
};
