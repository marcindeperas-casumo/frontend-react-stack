// @flow
import * as React from "react";
import { useTimeoutFn } from "Utils/hooks";

type Props = {
  enterPredicate: () => boolean,
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
    if (enterPredicate()) {
      setIsTransitioning(true);

      scheduleIn(() => {
        setIsTransitioning(false);
      }, duration);
    }

    return function unsubscribe() {
      clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweenedValue]);

  return {
    isTransitioning,
  };
}
