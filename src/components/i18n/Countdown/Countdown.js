// @flow
import * as React from "react";
import { useInterval } from "react-use";
import {
  ISO8601DurationContainer,
  convertSecondsToISO8601Duration,
} from "Components/i18n/ISO8601Duration";

type Props = {
  secondsTillEnd: number,
  preferAbbreviated?: boolean,
  preferShort?: boolean,
  t?: {
    separator?: string,
  },
};

export function Countdown(props: Props) {
  const [elapsedSecs, setElapsedSecs] = React.useState<number>(0);
  const secondsTillEnd = props.secondsTillEnd - elapsedSecs;
  const duration = convertSecondsToISO8601Duration(secondsTillEnd, {
    isShort: props.preferShort,
  });

  useInterval(
    () => setElapsedSecs(elapsedSecs + 1),
    secondsTillEnd <= 0 ? null : 1000
  );

  return (
    <ISO8601DurationContainer
      duration={duration}
      t={props.t}
      preferAbbreviated={props.preferAbbreviated}
    />
  );
}
