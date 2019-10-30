// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlanetIcon } from "@casumo/cmp-icons";

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

  return (
    <Flex direction="vertical" align="center">
      <PlanetIcon size="xlg" />
      <Text
        size="2xlg"
        tag="h3"
        className="t-color-plum-dark-1 u-padding u-margin-y--lg u-text-align-center"
      >
        {t.remember_to_play_within_limits}
      </Text>
      <Text className="u-padding-x--md u-margin-bottom--2xlg u-margin-top u-text-align-center">
        {t.remember_to_play_within_limits_subtext}
      </Text>
      <Button
        size="md"
        variant="primary"
        onClick={props.onClickYes}
        className="u-width--full u-margin-top--xlg"
      >
        {t.remember_to_play_within_limits_yes_label}
      </Button>
      <Button
        size="md"
        variant="secondary"
        onClick={props.onClickAbout}
        className="u-width--full u-margin-top--md"
      >
        {t.remember_to_play_within_limits_about_label}
      </Button>
    </Flex>
  );
}
