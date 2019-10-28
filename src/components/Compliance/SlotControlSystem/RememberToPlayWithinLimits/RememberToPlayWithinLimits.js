// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlanetIcon } from "@casumo/cmp-icons";

type Props = {
  onClickYes: () => void,
  onClickAbout: () => void,
};

export function RememberToPlayWithinLimits(props: Props) {
  return (
    <Flex direction="vertical" align="center">
      <PlanetIcon size="xlg" />
      <Text
        size="2xlg"
        tag="h3"
        className="t-color-plum-dark-1 u-padding u-margin-y--lg u-text-align-center"
      >
        Remember to play within limits
      </Text>
      <Text className="u-padding-x--md u-margin-bottom--2xlg u-margin-top u-text-align-center">
        Are you sure you'd like to play some more today?
      </Text>
      <Button
        size="md"
        variant="primary"
        onClick={props.onClickYes}
        className="u-width--full u-margin-top--xlg"
      >
        Yes, continue playing
      </Button>
      <Button
        size="md"
        variant="secondary"
        onClick={props.onClickAbout}
        className="u-width--full u-margin-top--md"
      >
        About responsible gaming
      </Button>
    </Flex>
  );
}
