import React from "react";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { ORIENTATION_VALUES } from "Components/ResponsiveLayout/ResponsiveLayout.types";
import BottomSnowLandscape from "./assets/backdrop-landscape.svg";
import BottomSnowPortrait from "./assets/backdrop-portrait.svg";
import Coin from "./assets/coin-scalable.svg";
import { MoneyAmountCounter } from "./MoneyAmountCounter";
import "./CounterScreen.scss";

export const CounterScreen = ({ amount, type, locale, currency }) => {
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
      <div className="c-coin-positioner c-coin-positioner">
        <Coin className="c-coin-scalable" />
      </div>
      <div class="c-text-positioner ">
        <div className="c-title-container c-title-typography">
          You won a {type.toUpperCase()} jackpot!
        </div>
        <div className="c-money-container c-money-typography">
          <MoneyAmountCounter
            amount={amount}
            animationTime={3000}
            locale={locale}
            currency={currency}
            onAnimationEnd={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
