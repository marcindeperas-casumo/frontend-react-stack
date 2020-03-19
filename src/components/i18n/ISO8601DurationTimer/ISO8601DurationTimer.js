// @flow
import * as React from "react";
import * as R from "ramda";
import Timer from "Components/Timer";
import {
  ISO8601DurationContainer,
  convertSecondsToISO8601Duration,
} from "Components/i18n/ISO8601Duration";
import { convertLuxonDurationObjectToSeconds } from "Utils";

type Props = {
  secondsTillEnd: number,
  preferAbbreviated?: boolean,
  preferShort?: boolean,
  t?: {
    separator?: string,
  },
};

export function ISO8601DurationTimer(props: Props) {
  return (
    <Timer
      endTime={Date.now() + props.secondsTillEnd * 1000}
      render={state => {
        const duration = convertSecondsToISO8601Duration(
          convertLuxonDurationObjectToSeconds(R.omit(["hasEnded"], state)),
          { isShort: props.preferShort }
        );

        return (
          <ISO8601DurationContainer
            duration={duration}
            t={props.t}
            preferAbbreviated={props.preferAbbreviated}
          />
        );
      }}
    />
  );
}
