import React from "react";
import "./Coins.scss";
import classNames from "classnames";
import CoinMega from "./assets/coin-mega.svg";
import CoinMajor from "./assets/coin-major.svg";
import CoinMini from "./assets/coin-mini.svg";
import { coinsDefinitions } from "./coinsDefinitions";

const CoinType = props => {
  const { group } = props.coinDefinition;
  if (group === "small") {
    return <CoinMini />;
  }

  if (group === "medium") {
    return <CoinMajor />;
  }

  if (group === "big") {
    return <CoinMega />;
  }
};

export const CoinContainer = ({
  definition,
  isVisible,
  isHighlighted,
  coinStageMet,
}) => {
  const inlineStyle = {
    top: `${definition.top - definition.height / 2}px`,
    left: `${definition.left - definition.width / 2}px`,
    width: definition.width,
    height: definition.height,
  };

  return isVisible ? (
    <div
      style={inlineStyle}
      className={classNames(
        "c-scale-in-center",
        "c-blue-ribbon-coin",
        coinStageMet && (isHighlighted ? "c-lighten" : "c-darken")
      )}
    >
      <CoinType coinDefinition={definition} />
    </div>
  ) : null;
};

const triggerCoinsAfterStage = 6;

// eslint-disable-next-line sonarjs/cognitive-complexity
export const Coins = ({ type = "landscape", onCoinsStaged }) => {
  const [coinIndex, setCoinIndex] = React.useState(0);
  const [animationStage, setAnimationStage] = React.useState(0);
  const [orientation, setOrientation] = React.useState();

  const setScreenOrientation = () => {
    setOrientation(
      window.matchMedia("(orientation: landscape)").matches
        ? "landscape"
        : "portrait"
    );
  };

  const coinSet =
    orientation === "landscape"
      ? coinsDefinitions.landscape
      : coinsDefinitions.portrait;

  React.useEffect(() => {
    window.addEventListener("resize", setScreenOrientation);

    return () => {
      window.removeEventListener("resize", setScreenOrientation);
    };
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (animationStage >= triggerCoinsAfterStage) {
        const index = coinIndex + 1;
        setCoinIndex(index >= coinSet.length ? 0 : index);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [animationStage, coinIndex, coinSet.length]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (animationStage >= triggerCoinsAfterStage) {
        clearInterval(interval);
      }
      setAnimationStage(animationStage + 1);
      if (animationStage >= 2 && onCoinsStaged) {
        onCoinsStaged();
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [animationStage, onCoinsStaged]);

  const isCoinGroupVisible = coin => {
    return (
      (coin.group === "big" && animationStage >= 0) ||
      (coin.group === "medium" && animationStage >= 1) ||
      (coin.group === "small" && animationStage >= 2)
    );
  };

  return (
    <div className="c-coins-container">
      {coinSet.map(coin => (
        <CoinContainer
          key={coin.id}
          definition={coin}
          isVisible={isCoinGroupVisible(coin)}
          coinStageMet={animationStage >= triggerCoinsAfterStage}
          isHighlighted={coinIndex + 1 === coin.order}
        />
      ))}
    </div>
  );
};
