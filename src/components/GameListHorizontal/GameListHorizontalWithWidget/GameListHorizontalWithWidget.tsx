import * as React from "react";
import Flex from "@casumo/cmp-flex";
import * as R from "ramda";
import * as A from "Types/apollo";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameRow, GameRowText } from "Components/GameRow";
import {
  topListWidgetWidth,
  topListWidgetHeight,
  topListWidgetHeightTwoRows,
} from "Src/constants";
import { topMarginClasses } from "Components/GameListHorizontal/constants";
import type { SeeMoreProps } from "Components/ScrollableListPaginated";
import { BlueRibbonJackpotsOnboardingWidget } from "Components/PromotionalGameLists/BlueRibbonChristmas/BlueRibbonJackpotsOnboardingWidget";
import logger from "Services/logger";

export type Props = {
  games: Array<A.GameRow_GameFragment | A.Jackpots_GameFragment>;
  name: string | undefined;
  seeMore?: SeeMoreProps;
  gamesInColumn?: number;
  jackpotSlug?: string;
  hasOnBoarding?: boolean;
  children: React.ReactChild;
};

export const GameListHorizontalWithWidget = ({
  name,
  seeMore,
  games,
  gamesInColumn = 3,
  jackpotSlug,
  hasOnBoarding = false,
  children: WidgetComponent,
}: Props) => {
  const [onboardingVisible, setOnboardingVisible] = React.useState(true);
  const userViewedJackpotOnboardingOffer = localStorage.getItem(
    "JackpotOnboardingOfferPresented"
  );

  const onCloseOnboardingWidget = () => {
    try {
      localStorage.setItem("JackpotOnboardingOfferPresented", "true");
    } catch (error) {
      logger.error("JackpotOnboardingOfferPresented local storage error", {
        error,
      });
    }
    setOnboardingVisible(false);
  };

  const columns = R.splitEvery(gamesInColumn, games);

  const itemRenderer = ({ style, columnIndex, key }) => {
    return (
      <div key={key} style={style}>
        {columnIndex === 1 &&
          hasOnBoarding &&
          onboardingVisible &&
          !userViewedJackpotOnboardingOffer && (
            <Flex direction="horizontal">
              <BlueRibbonJackpotsOnboardingWidget
                jackpotSlug={jackpotSlug}
                onClose={onCloseOnboardingWidget}
              />
            </Flex>
          )}
        {columnIndex === 0 ? (
          <Flex direction="horizontal" className="u-padding-right ">
            <div className="u-padding-left--md u-padding-left--3xlg@tablet u-padding-left--none@desktop">
              {WidgetComponent}
            </div>
          </Flex>
        ) : (
          columns[columnIndex - 1].map(game => (
            <div
              key={game.id}
              className="u-padding-bottom u-padding-left"
              style={{ width: topListWidgetWidth }}
            >
              <GameRow
                game={game}
                className="bg-white t-border-r--md t-elevation--10"
                renderText={() => (
                  <GameRowText name={game.name} description={game.gameStudio} />
                )}
              />
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className={`o-wrapper ${topMarginClasses}`}>
      <ScrollableListPaginated
        title={name}
        itemCount={
          /* +1 because widget takes up one column, and is not inside columns array */
          columns.length + 1
        }
        itemRenderer={itemRenderer}
        tileHeight={
          gamesInColumn < 3 ? topListWidgetHeightTwoRows : topListWidgetHeight
        }
        seeMore={seeMore}
      />
    </div>
  );
};
