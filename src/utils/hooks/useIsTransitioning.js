// @flow
import * as React from "react";
import { useTimeoutFn } from "Utils/hooks";

type Props = {
  enterPredicate: (tweenedValue: number) => boolean,
  tweenedValue: number,
  duration: number,
};

type UseIsTransitioning = {
  isTransitioning: boolean,
};

export function useIsTransitioning({
  enterPredicate,
  tweenedValue,
  duration,
}: Props): UseIsTransitioning {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const { clear, scheduleIn } = useTimeoutFn();

  React.useEffect(() => {
    if (enterPredicate(tweenedValue)) {
      setIsTransitioning(true);

      scheduleIn(() => {
        setIsTransitioning(false);
      }, duration);
    }

    return function unsubscribe() {
      clear();
    };
  }, [clear, tweenedValue, scheduleIn, enterPredicate, duration]);

  return {
    isTransitioning,
  };
}
