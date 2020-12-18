import React from "react";
import { AnimatedJackpotLogo } from "./AnimatedJackpotLogo";
import { Jackpots } from "./Jackpots";
import { Coins } from "./Coins";
import { CounterScreenContainer } from "./CounterScreenContainer";
import "./BlueRibbon.scss";

export const BlueRibbonAnimation = ({ t, type = "major", amount, onClose }) => {
  const [coinsStaged, setCoinsStaged] = React.useState(false);
  const [showCounterScreen, setShowCounterScreen] = React.useState(false);
  const [jackpotSelected, setJackpotSelected] = React.useState();

  const pickJackpot = () => {
    setJackpotSelected(type);
  };

  React.useEffect(() => {
    if (!jackpotSelected) {
      const timeout = setTimeout(() => {
        pickJackpot();
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  });

  React.useEffect(() => {
    if (!showCounterScreen && jackpotSelected) {
      const timeout = setTimeout(() => {
        setShowCounterScreen(true);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  });

  return (
    <div className="c-blueribbon-animation-container u-width--full u-height--full">
      <div className="c-background-scale-in-center u-width--full u-height--full u-position--absolute"></div>
      {coinsStaged && !showCounterScreen && <AnimatedJackpotLogo />}
      {!showCounterScreen && (
        <Coins
          selected={jackpotSelected}
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
        <Jackpots started={coinsStaged} selected={jackpotSelected} />
      )}
      {showCounterScreen && (
        <CounterScreenContainer
          t={t}
          type={type}
          amount={amount}
          onClose={onClose}
        />
      )}
    </div>
  );
};
