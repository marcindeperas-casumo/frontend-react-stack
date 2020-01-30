// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import "./textInput.scss";

type Props = {
  currencySign: string,
  value: ?(string | number),
  onChange: any => void,
  className?: string,
  inputClassName?: string,
};

export function TextInput(props: Props) {
  return (
    <Flex
      align="end"
      className={classNames(
        "u-margin-y u-font-3xlg u-font-weight-black u-line-height t-color-grey-dark-3 t-border-bottom t-border--current-color",
        props.className
      )}
    >
      {props.currencySign}
      <input
        type="text"
        pattern="[0-9]*"
        inputMode="numeric"
        className={classNames(
          "c-compliance-input u-padding-left--sm  u-font-3xlg u-font-weight-black u-line-height t-color-grey-dark-3 u-margin--none u-padding--none",
          props.inputClassName
        )}
        value={props.value || ""} // hides lonely 0 as well
        onChange={props.onChange}
      />
    </Flex>
  );
}
