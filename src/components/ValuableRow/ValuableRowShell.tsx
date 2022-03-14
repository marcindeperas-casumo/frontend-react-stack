import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import React from "react";
import { noop } from "Utils";
import { ValuablesCardDefaultIcon } from "Components/ValuableThumbnail/icons";
import DangerousHtml from "Components/DangerousHtml";
import "./ValuableRow.scss";

type TProps = {
  text: string | undefined;
  onClick?: () => void;
};

export const ValuableRowShell = ({ text, onClick }: TProps) => (
  <Flex
    data-test="valuable-row-shell"
    className="u-padding-y--md bg-white u-padding-x--md cursor-pointer"
    onClick={onClick || noop}
  >
    <Flex.Item className="c-valuable-row__thumbnail o-flex__item--no-shrink">
      <ValuablesCardDefaultIcon />
    </Flex.Item>
    <Flex align="center" className="u-margin-left">
      <Text className="u-font-weight-bold" size="sm" tag="span">
        <DangerousHtml data-test="valuable-row-title" html={text || ""} />
      </Text>
    </Flex>
  </Flex>
);
