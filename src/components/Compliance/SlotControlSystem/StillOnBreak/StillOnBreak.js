// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { navigateById } from "Services/NavigationService";
import { interpolateWithJSX } from "Utils";
import { ISO8601DurationTimer } from "Components/i18n/ISO8601DurationTimer";
import StillOnBreakImage from "./StillOnBreak.svg";
import "./StillOnBreak.scss";

type Props = {
  t: {
    still_on_break: string,
    still_on_break_subtext: string,
    still_on_break_button_label: string,
  },
  onClick: () => void,
  secondsTillEnd: number,
};

export function StillOnBreak(props: Props) {
  const { t } = props;
  const onClick = () => {
    props.onClick();
    navigateById({ routeId: "games" });
  };

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
        {interpolateWithJSX(
          {
            time: (
              <ISO8601DurationTimer
                secondsTillEnd={props.secondsTillEnd}
                t={{ separator: " " }}
                preferShort
                preferAbbreviated
              />
            ),
          },
          t.still_on_break_subtext
        )}
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
