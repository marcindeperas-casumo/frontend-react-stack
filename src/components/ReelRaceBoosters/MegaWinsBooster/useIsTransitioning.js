// @flow
import * as React from "react";
import { useTimeoutFn } from "Utils/hooks";

type Props = {
  megaWins: number,
};

type UseIsTransitioning = {
  isTransitioning: boolean,
};

export function useIsTransitioning({ megaWins }: Props): UseIsTransitioning {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const { clear, scheduleIn } = useTimeoutFn();

  React.useEffect(() => {
    if (megaWins > 0) {
      setIsTransitioning(true);

      scheduleIn(() => {
        setIsTransitioning(false);
      }, 1500);
    }

    return function unsubscribe() {
      clear();
    };
  }, [clear, megaWins, scheduleIn]);

  return {
    isTransitioning,
  };
}
