// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlanetIcon } from "@casumo/cmp-icons";

type Props = {
  onClick: () => void,
  t: {
    message: string,
    button_label: string,
  },
};

export function NotEnoughFunds(props: Props) {
  const { t, onClick } = props;

  return (
    <Flex direction="vertical" align="center">
      <PlanetIcon size="xlg" />
      <Text
        size="2xlg"
        tag="h3"
        className="t-color-plum-dark-1 u-padding-md u-margin-y--lg u-text-align-center"
      >
        {t.message}
      </Text>
      <Button
        size="md"
        variant="primary"
        onClick={onClick}
        className="u-width--full"
      >
        {t.button_label}
      </Button>
    </Flex>
  );
}
