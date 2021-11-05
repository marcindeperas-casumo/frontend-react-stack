import Flex from "@casumo/cmp-flex";
import * as React from "react";
import DangerousHtml from "Components/DangerousHtml";

type Props = {
  primaryText: string;
  secondaryText: string;
};

export const GameRowCustomHeaderContent = ({ primaryText, secondaryText }: Props) => (
  <Flex className="text-grey-70" direction="vertical" spacing="sm">
    <Flex.Item>
      <p className="t-color-purple-60 u-font-weight-bold">{primaryText}</p>
      <p className="text-grey-50">
        <DangerousHtml html={secondaryText} />
      </p>
    </Flex.Item>
  </Flex>
);
