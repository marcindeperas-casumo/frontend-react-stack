//@flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

export const RtpTableRow = ({
  columns = [],
  textProps = {},
}: {
  columns: Array<?string>,
  textProps?: {},
}) => (
  <>
    <Flex
      className="t-border-right t-border-grey-5 o-flex__block u-width--2/5"
      align="center"
    >
      <Text size="sm" {...textProps}>
        {columns[0]}
      </Text>
    </Flex>
    <Flex
      className="t-border-right t-border-grey-5 u-width--1/5"
      justify="center"
      align="center"
    >
      <Text size="sm" {...textProps}>
        {columns[1]}
      </Text>
    </Flex>
    <Flex
      className="t-border-right t-border-grey-5 u-width--1/5"
      justify="center"
      align="center"
    >
      <Text size="sm" {...textProps}>
        {columns[2]}
      </Text>
    </Flex>
    <Flex
      className="t-border-right t-border-grey-5 u-width--1/5"
      justify="center"
      align="center"
    >
      <Text size="sm" {...textProps}>
        {columns[3]}
      </Text>
    </Flex>
  </>
);
