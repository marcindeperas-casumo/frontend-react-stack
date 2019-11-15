// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { interpolate, interpolateTimeInterval } from "Utils";
import StillOnBreakImage from "./StillOnBreak.svg";

type Props = {
  t: ?{
    still_on_break: string,
    still_on_break_subtext: string,
    still_on_break_button_label: string,
    minutes: string,
    hours: string,
    seconds: string,
  },
  onClick: () => void,
  /* Unix timestamp in millis */
  exclusionExpiryTime: number,
};

export function StillOnBreak(props: Props) {
  const { t, onClick, exclusionExpiryTime } = props;
  const seconds = (exclusionExpiryTime - Date.now()) / 1000;
  const timeInterval = interpolateTimeInterval({
    seconds,
    t: {
      ...t,
    },
  });

  return (
    <Flex direction="vertical">
      <StillOnBreakImage />
      <Text
        size="2xlg"
        tag="h3"
        className="t-color-plum-dark-1 u-padding u-margin-top--lg"
      >
        {t?.still_on_break}
      </Text>
      <Text className="u-padding u-margin-bottom--2xlg">
        {interpolate(t?.still_on_break_subtext, { time: timeInterval })}
      </Text>
      <Button
        size="md"
        variant="primary"
        onClick={onClick}
        className="u-width--full u-margin-top--3xlg"
      >
        {t?.still_on_break_button_label || ""}
      </Button>
    </Flex>
  );
}
