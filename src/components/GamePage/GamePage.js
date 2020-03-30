// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import LoaderGlobal from "@casumo/cmp-loader-global";
import { VerticalStretcher } from "Components/VerticalStretcher";
import {
  useGameLaunchData,
  useCrossCodebaseNavigation,
  useTranslations,
  useJurisdiction,
  useGameCategory,
  useDispatchPlaying,
} from "Utils/hooks";
import { PlayOkayBar } from "Components/Compliance/PlayOkayBar";
import { useRealityCheckModal } from "Components/Compliance/RealityCheck";
import { isSlotGame } from "Models/slotControlSystem";
import { useBeforePlayingModal } from "Components/RSModal/SlotControlSystem";
import { ROUTE_IDS } from "Src/constants";
import { ErrorMessage } from "Components/ErrorMessage";
import { GameLauncher } from "Components/GameLauncher";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";
import "./GamePage.scss";

type Props = {
  slug: string,
  playForFun: boolean,
};

export const GamePage = ({ slug, playForFun }: Props) => {
  const { isDGOJ } = useJurisdiction();
  const { navigateToKO } = useCrossCodebaseNavigation();
  const errorMessages = useTranslations("mobile.errors");
  const { loading, gameCategory } = useGameCategory(slug);
  const shouldShowSlotControlSystem =
    !loading && isDGOJ && isSlotGame(gameCategory);
  const { gameProviderModel, error, pauseGame, resumeGame } = useGameLaunchData(
    {
      playForFun,
      slug,
    }
  );
  useRealityCheckModal({ pauseGame, resumeGame });

  useDispatchPlaying({
    isPlaying: true,
    gameId: slug,
  });

  useBeforePlayingModal({
    canLaunch: Boolean(
      !playForFun &&
        !error &&
        !loading &&
        gameProviderModel &&
        shouldShowSlotControlSystem
    ),
  });

  if (error) {
    return (
      <Flex className="t-background-chrome-light-2 u-height--full">
        <ErrorMessage
          errorMessage={errorMessages?.general_error_title || ""}
          retry={() => navigateToKO(ROUTE_IDS.TOP_LISTS)}
        />
      </Flex>
    );
  }

  if (!gameProviderModel || loading) {
    return <LoaderGlobal />;
  }

  return (
    <VerticalStretcher>
      <Flex
        className="u-width--full u-height--full t-background-chrome-dark-3 t-color-white"
        direction="vertical"
        spacing="none"
      >
        <Flex.Item>
          <PlayOkayBar />
        </Flex.Item>
        <Flex.Block className="u-position-relative o-flex c-game-page__game-content-borders">
          <div
            className={classNames(
              "c-game-page__game-wrapper",
              gameProviderModel.gameWrapperClasses || []
            )}
          >
            <GameLauncher
              gameProviderModel={gameProviderModel}
              className="c-game-page__game-launcher"
            />
          </div>
        </Flex.Block>
        {shouldShowSlotControlSystem && (
          <Flex.Item>
            <InfoBar />
          </Flex.Item>
        )}
      </Flex>
    </VerticalStretcher>
  );
};
