// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ValuablesCardDefaultIcon } from "Components/ValuableThumbnail/icons";

type Props = {
  text: string,
};

export const ValuableRowShell = ({ text }: Props) => (
  <Flex data-test="valuable-row" className="u-padding--sm">
    <Flex.Item className="c-valuable-row-thumbnail o-flex__item--no-shrink">
      <ValuablesCardDefaultIcon />
    </Flex.Item>
    <Flex align="center" justify="center" className="u-margin-left--md">
      <Text className="u-font-weight-bold" size="sm" tag="span">
        {text}
      </Text>
    </Flex>
  </Flex>
);
