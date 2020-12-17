import React from "react";
import { JackpotLogo } from "./JackpotLogo";
import { Jackpots } from "./Jackpots";
import { Coins } from "./Coins";
import { CounterScreen } from "./CounterScreen";
import "./BlueRibbon.scss";

export const BlueRibbonAnimation = ({ type = "major", amount }) => {
  const [coinsStaged, setCoinsStaged] = React.useState(false);
  const [showCounterScreen, setShowCounterScreen] = React.useState(false);

  return (
    <div className="c-blueribbon-animation-container u-width--full u-height--full">
      <div className="c-background-scale-in-center u-width--full u-height--full u-position--absolute"></div>
      {coinsStaged && <JackpotLogo />}
      {!showCounterScreen && (
        <Coins
          endSelection={type}
          type="landscape"
          onCoinsStaged={() => {
            setCoinsStaged(true);
          }}
          onJackpotSelected={() => {
            setShowCounterScreen(true);
          }}
        />
      )}
      {coinsStaged && !showCounterScreen && (
        <Jackpots started={coinsStaged} endSelection={type} />
      )}
      {showCounterScreen && (
        <CounterScreen
          jackpotType={type}
          amount={amount}
          onConfirm={() => {
            /* close br screen */
          }}
        />
      )}
    </div>
  );
};
