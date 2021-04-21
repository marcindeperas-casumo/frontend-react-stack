import { TimeLockedIcon } from "@casumo/cmp-icons";
import * as React from "react";
import cx from "classnames";
import Timer from "Components/Timer";
import { useTimeoutFn } from "Utils/hooks/useTimeoutFn";
import { ProgressCircle } from "Components/Progress/ProgressCircle";

import "./FiveMinuteBreakIcon.scss";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  progressPercentage: number;
  expiringTime: number;
  className?: string;
};

export const FiveMinuteBreakIcon = ({
  onClick,
  progressPercentage,
  expiringTime,
  className,
}: Props) => {
  const { clear, scheduleAt } = useTimeoutFn();
  const [isTimerVisible, setIsTimerVisible] = React.useState(
    expiringTime - Date.now() <= 60 * 1000
  );

  React.useEffect(() => {
    if (!isTimerVisible) {
      scheduleAt(() => {
        setIsTimerVisible(true);
      }, expiringTime - 59 * 1000);
    }

    return () => clear();
  }, [clear, expiringTime, isTimerVisible, scheduleAt]);

  return (
    <div
      className={cx(
        "c-five-minute-break-icon o-position--relative u-height--3xlg u-width--3xlg t-border-r--circle",
        className
      )}
    >
      <div className="c-five-minute-break-icon__info u-height--2xlg u-width--2xlg u-overflow--hidden t-border-r--circle bg-grey-90 t-opacity-background--100">
        {isTimerVisible ? (
          <Timer
            endTime={expiringTime}
            onEnd={() => (
              <div className="c-five-minute-break-icon__timer u-line-height text-white u-font-md o-position--absolute u-font-weight-bold">
                00
              </div>
            )}
            render={state => (
              <div className="c-five-minute-break-icon__timer u-line-height text-white u-font-md o-position--absolute u-font-weight-bold">
                {state.seconds}
              </div>
            )}
          />
        ) : (
          <TimeLockedIcon
            variant="sm"
            className="c-five-minute-break-icon__icon text-white o-position--absolute"
          />
        )}
      </div>
      <ProgressCircle
        value={progressPercentage}
        fgColor="grey-20"
        bgColor="grey-50"
        className="c-five-minute-break-icon__progress t-opacity-color--25 u-height--3xlg u-width--3xlg o-position--absolute"
        width={4}
        radius={24}
      />
    </div>
  );
};
