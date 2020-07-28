// @flow
import * as React from "react";
import * as R from "ramda";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { navigateById } from "Services/NavigationService";
import { interpolateWithJSX } from "Utils";
import Timer from "Components/Timer";
import { Duration } from "Components/Duration";
import StillOnBreakImage from "./StillOnBreak.svg";
import "./StillOnBreak.scss";

type Props = {
  t: {
    still_on_break: string,
    still_on_break_subtext: string,
    still_on_break_button_label: string,
  },
  onClick: () => void,
  endTime: number,
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
        className="t-color-purple-80 u-padding u-margin-top--lg"
      >
        {t.still_on_break}
      </Text>
      <Text className="u-padding u-margin-bottom--2xlg">
        {interpolateWithJSX(
          {
            time: (
              <Timer
                endTime={props.endTime}
                onEnd={() => "00:00"}
                render={state => (
                  <Duration
                    duration={R.omit(["hasEnded"], state)}
                    separator=" "
                    preferShort
                    preferAbbreviated
                  />
                )}
              />
            ),
          },
          t.still_on_break_subtext
        )}
      </Text>
      <ButtonPrimary
        size="md"
        variant="primary"
        onClick={onClick}
        className="u-width--full u-margin-top--3xlg"
      >
        {t.still_on_break_button_label}
      </ButtonPrimary>
    </Flex>
  );
}
