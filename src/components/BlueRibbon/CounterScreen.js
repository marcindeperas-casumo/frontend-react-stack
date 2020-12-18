import React from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { interpolate } from "Utils";
import { ORIENTATION_VALUES } from "Components/ResponsiveLayout/ResponsiveLayout.types";
import BottomSnowLandscape from "./assets/backdrop-landscape.svg";
import BottomSnowPortrait from "./assets/backdrop-portrait.svg";
import JackpotLogo from "./assets/jackpot-logo.svg";
import Coin from "./assets/coin-scalable.svg";
import { MoneyAmountCounter } from "./MoneyAmountCounter";
import "./CounterScreen.scss";

export const CounterScreen = ({
  t,
  amount,
  type,
  locale,
  currency,
  onClose,
}) => {
  return (
    <div className="u-width--full u-height--full">
      <div className="c-snow-falling-background"></div>
      <MobileAndTablet orientation={ORIENTATION_VALUES.LANDSCAPE}>
        <BottomSnowLandscape className="u-width--full c-snow-bottom-layer" />
      </MobileAndTablet>
      <MobileAndTablet orientation={ORIENTATION_VALUES.PORTRAIT}>
        <BottomSnowPortrait className="u-width--full c-snow-bottom-layer" />
      </MobileAndTablet>
      <Desktop>
        <BottomSnowLandscape className="u-width--full c-snow-bottom-layer" />
      </Desktop>
      <div className="c-coin-positioner">
        <Coin className="c-coin-scalable" />
      </div>
      <div className="c-text-positioner">
        <Flex direction="vertical">
          <div className="c-title-container c-title-typography t-color-yellow-30 u-font-weight-black u-text-align-center">
            {interpolate(t.jacpot_win_title, { type: type.toUpperCase() })}
          </div>
          <div className="c-money-container c-money-typography">
            <MoneyAmountCounter
              amount={amount}
              animationTime={3000}
              locale={locale}
              currency={currency}
            />
          </div>
        </Flex>
      </div>
      <div className="c-counter_screen--ui-positioner u-width--full">
        <Flex direction="horizontal" justify="space-between" align="center">
          <JackpotLogo />
          <ButtonPrimary onClick={onClose} size="md">
            {t.continue_button}
          </ButtonPrimary>
        </Flex>
      </div>
    </div>
  );
};
