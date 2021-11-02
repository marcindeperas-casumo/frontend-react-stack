import Flex from "@casumo/cmp-flex";
import DangerousHtml from "Components/DangerousHtml";
import * as React from "react";

type Props = {
  firstLine: string;
  secondLine: string;
};

export const GameRowCustomHeaderContent = (props: Props) => {
  const { firstLine, secondLine } = props;

  return (
    <Flex className="text-grey-70" direction="vertical" spacing="sm">
      <Flex.Item>
        <b className="t-color-purple-60">{firstLine}</b>
        <p className="text-grey-50">
          <DangerousHtml html={secondLine} />
        </p>
      </Flex.Item>
    </Flex>
  );
};
