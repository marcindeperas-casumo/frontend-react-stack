//@flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import classNames from "classnames";

export const RtpTableRow = ({
  columns = [],
  textProps = {},
}: {
  columns: Array<?string>,
  textProps?: {},
}) => (
  <>
    {columns.map((column, idx) => (
      <Flex
        key={idx}
        className={classNames(
          "t-border-right t-border-grey-5 o-flex__block",
          `u-width--${idx === 0 ? 5 - (columns.length - 1) : 1}/5`
        )}
        align="center"
      >
        <Text size="sm" {...textProps}>
          {column}
        </Text>
      </Flex>
    ))}
  </>
);
