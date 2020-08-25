// @flow
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { GameLauncher } from "Components/GameLauncher";
import { InfoBar } from "Components/Compliance/SlotControlSystem/InfoBar";
import { VerticalStretcher } from "Components/VerticalStretcher";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import type { GameProviderModel } from "GameProviders";
import { PlayOkayBar } from "Components/Compliance/PlayOkayBar";
import { WAGERING_NOTIFICATION_TYPES } from "../../models/playing/playing.constants";

type Props = {
  gameProviderModel: GameProviderModel,
  shouldShowSlotControlSystem: boolean,
  bonusAmount: number,
};

export const GamePage = ({
  gameProviderModel,
  shouldShowSlotControlSystem,
  bonusAmount = 0,
}: Props) => {
  const dispatch = useDispatch();

  const [bonusBalanceModalShown, setBonusBalanceModalShown] = useState(false);
  const [realBalanceModalShown, setRealBalanceModalShown] = useState(false);
  const [bonusBalance, setBonusBalance] = useState(0);

  useEffect(() => {
    if (bonusBalance !== bonusAmount) {
      setBonusBalance(bonusAmount);
      if (!bonusBalanceModalShown) {
        dispatch(
          showModal(REACT_APP_MODAL.ID.WAGERING_NOTIFICATION, {
            mustAccept: false,
            type: WAGERING_NOTIFICATION_TYPES.BONUS_MONEY_WAGERING,
          })
        );
        setBonusBalanceModalShown(true);
      }
    }
  }, [dispatch, bonusAmount, bonusBalance, bonusBalanceModalShown]);

  useEffect(() => {
    if (!bonusAmount && bonusBalance && !realBalanceModalShown) {
      dispatch(
        showModal(REACT_APP_MODAL.ID.WAGERING_NOTIFICATION, {
          mustAccept: false,
          type: WAGERING_NOTIFICATION_TYPES.REAL_MONEY_WAGERING,
        })
      );
      setRealBalanceModalShown(true);
    }
  }, [dispatch, bonusAmount, bonusBalance, realBalanceModalShown]);

  return (
    <VerticalStretcher gameProviderModel={gameProviderModel}>
      <Flex
        className="u-width--full u-height--full t-background-grey-90 t-color-white"
        direction="vertical"
        spacing="none"
      >
        <Flex.Item>
          <PlayOkayBar />
        </Flex.Item>
        <Flex.Block className="u-position-relative o-flex c-game-page__flexible-game-container">
          <div
            className={classNames(
              "u-inset-0 u-position-absolute",
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
