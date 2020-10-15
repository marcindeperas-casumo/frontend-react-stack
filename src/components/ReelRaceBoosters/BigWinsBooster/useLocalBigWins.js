// @flow
import * as React from "react";
import { useTimeoutFn } from "Utils/hooks";

type Props = {
  bigWins: number,
};

type UseLocalBigWins = {
  isEven: boolean,
  isDouble: boolean,
};

const TRANS_MOD = 0.5;

export function useLocalBigWins({ bigWins }: Props): UseLocalBigWins {
  const [bigWinsLocal, setBigWinsLocal] = React.useState(bigWins);
  const isDouble = bigWinsLocal > 0 && bigWinsLocal % 2 === TRANS_MOD;
  const { clear, scheduleIn } = useTimeoutFn();

  React.useEffect(() => {
    if (bigWins > 0 && bigWins % 2 === 0) {
      setBigWinsLocal(bigWins + TRANS_MOD);

      scheduleIn(() => {
        setBigWinsLocal(prevValue => prevValue - TRANS_MOD);
      }, 1500);
    } else {
      setBigWinsLocal(bigWins);
    }

    return function unsubscribe() {
      clear();
    };
  }, [bigWins, clear, scheduleIn]);

  return {
    isEven: bigWinsLocal % 2 === 0,
    isDouble,
  };
}
