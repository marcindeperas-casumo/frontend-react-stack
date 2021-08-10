import BezierEasing from "bezier-easing";
import React from "react";
import { formatCurrency } from "Utils";

import "./MoneyAmountCounter.scss";

export const MoneyAmountCounter = ({
  amount,
  animationTime = 2000,
  locale,
  currency,
}) => {
  const [value, setValue] = React.useState(0);
  const [startTime, setStartTime] = React.useState<number>();
  const [passedTime, setPassedTime] = React.useState(0);

  React.useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, [startTime]);

  React.useEffect(() => {
    const bezier = BezierEasing(0.28, 1.0, 0.59, 1.0);

    if (passedTime <= animationTime) {
      const interval = setInterval(() => {
        setPassedTime(Date.now() - startTime);

        if (passedTime >= animationTime) {
          clearInterval(interval);
        }
      }, 20);

      if (animationTime > 0) {
        setValue(bezier(passedTime / animationTime) * amount);
      }

      return () => {
        clearInterval(interval);
      };
    } else {
      setValue(amount);
    }
  }, [amount, animationTime, passedTime, startTime]);

  const formattedValue = formatCurrency({
    value,
    currency,
    locale,
    minimumFractionDigits: 2,
  });

  return (
    <span className="c-casumo_jackpot_animation-animated_money_value">
      {formattedValue}
    </span>
  );
};
