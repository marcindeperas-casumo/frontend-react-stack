// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { navigateById } from "Services/NavigationService";

type Props = {
  t: {
    remember_to_play_within_limits: string,
    remember_to_play_within_limits_subtext: string,
    remember_to_play_within_limits_yes_label: string,
    remember_to_play_within_limits_about_label: string,
  },
  onClickYes: () => void,
  onClickAbout: () => void,
};

export function RememberToPlayWithinLimits(props: Props) {
  const { t } = props;
  const onClickAbout = () => {
    props.onClickAbout();
    navigateById({ routeId: "play-okay" });
  };

  return (
    <Flex direction="vertical" align="center">
      <Text
        size="2xlg"
        tag="h3"
        className="t-color-purple-80 u-padding u-margin-y--lg u-text-align-center"
      >
        {t.remember_to_play_within_limits}
      </Text>
      <Text className="u-padding-x--md u-margin-bottom--2xlg u-margin-top u-text-align-center">
        {t.remember_to_play_within_limits_subtext}
      </Text>
      <ButtonPrimary
        size="md"
        onClick={props.onClickYes}
        className="u-width--full u-margin-top--xlg"
      >
        {t.remember_to_play_within_limits_yes_label}
      </ButtonPrimary>
      <ButtonSecondary
        size="md"
        onClick={onClickAbout}
        className="u-width--full u-margin-top--md"
      >
        {t.remember_to_play_within_limits_about_label}
      </ButtonSecondary>
    </Flex>
  );
}
