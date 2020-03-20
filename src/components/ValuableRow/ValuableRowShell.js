// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ValuablesCardDefaultIcon } from "Components/ValuableThumbnail/icons";
import DangerousHtml from "Components/DangerousHtml";
import { addPointerEventStylesToLinkElements } from "Utils";
import "./ValuableRow.scss";

type Props = {
  text: string,
};

export const ValuableRowShell = ({ text }: Props) => (
  <Flex
    data-test="valuable-row-shell"
    className="u-padding-y--md t-background-white u-padding-x--md"
  >
    <Flex.Item className="c-valuable-row__thumbnail o-flex__item--no-shrink">
      <ValuablesCardDefaultIcon />
    </Flex.Item>
    <Flex align="center" className="u-margin-left">
      <Text className="u-font-weight-bold" size="sm" tag="span">
        <DangerousHtml
          data-test="valuable-row-title"
          html={addPointerEventStylesToLinkElements(text)}
        />
      </Text>
    </Flex>
  </Flex>
);
