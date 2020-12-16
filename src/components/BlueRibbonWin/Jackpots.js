import classNames from "classnames";
import React from "react";
import "./Jackpots.scss";

const jackpotNames = ["mini", "major", "mega"];

export const Jackpots = ({ jackpotType, started }) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (started) {
        const step = currentStep + 1;
        setCurrentStep(step >= 3 ? 0 : step);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [currentStep, started]);

  const highlightedName = jackpotNames.filter(
    (name, index) => index === currentStep
  )[0];

  return (
    <div className="c-jackpot-picker c-jackpot-picker-slide-in">
      <div
        className={classNames(
          "c-jackpot-items-inner",
          `c-highlight-${highlightedName}`
        )}
      >
        <div className="c-jackpot-highlighter"></div>
        <div className="c-jackpots-list">
          {jackpotNames.map(name => (
            <div
              className={classNames(
                "c-single-jackpot",
                `${name === highlightedName && "c-highlighted"}`
              )}
            >
              {name.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      <div className="c-jackpot-title-container">JACKPOT</div>
    </div>
  );
};
