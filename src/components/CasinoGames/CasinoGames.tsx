import * as React from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import DangerousHtml from "Components/DangerousHtml";
import { useJurisdiction } from "Utils/hooks";
import { navigateById } from "Services/NavigationService";
import { isMobile } from "Components/ResponsiveLayout";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import { RtpTable } from "./RtpTable/RtpTable";

type TCasinoGamesTranslations = {
  meta_description: string,
  meta_title: string,
  rtp_description: string,
  rtp_game_name: string,
  rtp_game_provider: string,
  rtp_loading: string,
  rtp_value: string,
  actual_rtp_past_6_months: string,
  actual_rtp_past_year: string,
};

type TCasinoGamesProps = {
  t: TCasinoGamesTranslations,
  categoriesContent: any,
  gamesResponse: any,
  loadMore: () => void,
};

export const CasinoGames = ({
  t,
  categoriesContent,
  data,
  loading,
  fetchMore,
}: TCasinoGamesProps) => {
  const [gamesData, setGamesData] = React.useState([]);
  const [gamesIDs, setGamesIDs] = React.useState([]);
  const [
    gamesListPercentageReceived,
    setGamesListPercentageReceived,
  ] = React.useState([]);

  // if (
  //   gamesListPercentageReceived.indexOf(gamesResponse.dataBatchPercentage) ===
  //   -1
  // ) {
  //   const gamesDataCombined = gamesResponse.data?.getGamesPaginated?.games
  //     ? [...gamesData, ...gamesResponse.data?.getGamesPaginated?.games]
  //     : [...gamesData];
  //   setGamesData(gamesDataCombined);
  //   setGamesListPercentageReceived([
  //     ...gamesListPercentageReceived,
  //     gamesResponse.dataBatchPercentage,
  //   ]);
  // }

  React.useEffect(() => {
    if (data && data?.getGamesPaginated?.games) {
      // if received batch of games sample IDs are not yet part of already received IDs proceed with merging
      if (
        !gamesIDs.length ||
        (gamesIDs.indexOf(data.getGamesPaginated.games[2].id) === -1 &&
          gamesIDs.indexOf(data.getGamesPaginated.games[0].id) === -1)
      ) {
        gamesData.length
          ? setGamesData([...gamesData, ...data.getGamesPaginated.games])
          : setGamesData(data.getGamesPaginated.games);
        // Store received IDs to avoid duplicated due to query retriggering
        const gameIDs = data.getGamesPaginated.games.reduce(
          (ids, { id }) => [...ids, id],
          []
        );
        gamesIDs.length
          ? setGamesIDs([...gameIDs, ...gamesIDs])
          : setGamesIDs(gameIDs);
      }
    }
  }, [data, gamesData, gamesIDs]);

  const { isMGA } = useJurisdiction();

  if (loading || !gamesData || !t || !categoriesContent) {
    return null;
  }

  const renderRtpTable = () => {
    return (
      !isMGA &&
      gamesData.length && (
        <RtpTable
          games={gamesData}
          data={data}
          fetchMore={fetchMore}
          gamesCount={gamesData.length}
          scrollElementId={ROOT_SCROLL_ELEMENT_ID}
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
