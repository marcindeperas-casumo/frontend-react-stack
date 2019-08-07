// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CrossIcon } from "@casumo/cmp-icons";
import type { AllLimits } from "Models/playOkay/depositLimits";
import DepositLimitsIcon from "./depositLimits.svg";

export function Header(props: { title: string, children?: ?React.Node }) {
  return (
    <Flex
      align="center"
      justify="space-between"
      spacing="none"
      className="u-padding--md"
    >
      <Flex
        justify="center"
        align="center"
        spacing="none"
        className="u-margin-right--md u-padding t-border-r--circle"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <DepositLimitsIcon />
      </Flex>
      <Text tag="span" className="u-font-weight-bold o-flex--1">
        {props.title}
      </Text>
      {props.children}
    </Flex>
  );
}

const isPropNumber = R.propSatisfies(R.is(Number));
const areAllLimitsSet = R.allPass([
  isPropNumber("daily"),
  isPropNumber("weekly"),
  isPropNumber("monthly"),
]);
export function HeaderButton(props: {
  limits: AllLimits,
  add: () => void,
  removeAll: () => void,
  t: {
    remove_all: string,
  },
}) {
  if (areAllLimitsSet(props.limits)) {
    return (
      <Text
        onClick={props.removeAll}
        size="sm"
        className="u-font-weight-bold t-color-turquoise"
      >
        {props.t.remove_all}
      </Text>
    );
  }

  return (
    <Flex
      className="c-deposit-limits__container u-cursor-pointer u-padding--md"
      onClick={props.add}
    >
      <CrossIcon className="t-color-grey-light-1 c-deposit-limits__x-icon" />
    </Flex>
  );
}
