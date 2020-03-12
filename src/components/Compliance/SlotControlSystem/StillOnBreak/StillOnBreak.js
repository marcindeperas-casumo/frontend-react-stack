// @flow
import * as React from "react";
import { useInterval } from "react-use";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { navigateById } from "Services/NavigationService";
import { interpolateWithJSX } from "Utils";
import {
  ISO8601DurationContainer,
  convertSecondsToISO8601Duration,
} from "Components/i18n/ISO8601Duration";
import StillOnBreakImage from "./StillOnBreak.svg";
import "./StillOnBreak.scss";

type Props = {
  t: {
    still_on_break: string,
    still_on_break_subtext: string,
    still_on_break_button_label: string,
    days?: string,
    minutes?: string,
    hours?: string,
    seconds: string,
  },
  onClick: () => void,
  secondsTillEnd: number,
  fetchContent: () => void,
};

export function StillOnBreak(props: Props) {
  const { t, secondsTillEnd, fetchContent } = props;
  const [elapsedSecs, setElapsedSecs] = React.useState(0);
  const duration = convertSecondsToISO8601Duration(
    secondsTillEnd - elapsedSecs,
    { isShort: true }
  );
  const onClick = () => {
    props.onClick();
    navigateById({ routeId: "games" });
  };
  const timeInterval = <ISO8601DurationContainer duration={duration} />;

  useInterval(() => setElapsedSecs(elapsedSecs + 1), 1000);

  React.useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <Flex direction="vertical">
      <StillOnBreakImage className="c-scs__still-on-break__image" />
      <Text
        size="2xlg"
        tag="h3"
        className="t-color-plum-dark-1 u-padding u-margin-top--lg"
      >
        {t.still_on_break}
      </Text>
      <Text className="u-padding u-margin-bottom--2xlg">
        {interpolateWithJSX({ time: timeInterval }, t.still_on_break_subtext)}
      </Text>
      <Button
        size="md"
        variant="primary"
        onClick={onClick}
        className="u-width--full u-margin-top--3xlg"
      >
        {t.still_on_break_button_label}
      </Button>
    </Flex>
  );
}
