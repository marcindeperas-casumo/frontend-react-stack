// @flow
import * as React from "react";
import * as R from "ramda";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import "./textInput.scss";

type Props = {
  currencySign: string,
  value: ?(string | number),
  onChange: any => void,
  className?: string,
  inputClassName?: string,
  fontClassName?: string,
  colorClassName?: string,
  placeholder?: string,
  type?: "text" | "number",
  min?: number,
  max?: number,
};

export function TextInput(props: Props) {
  return (
    <Flex
      align="end"
      className={classNames(
        "u-margin-y u-font-3xlg u-font-weight-black u-line-height t-color-grey-90 t-border-bottom t-border-current",
        props.className
      )}
    >
      {props.currencySign}
      <input
        type={props.type || "text"}
        pattern="[0-9]*"
        inputMode="numeric"
        placeholder={props.placeholder || ""}
        {...R.pick(["min", "max"], props)}
        className={classNames(
          "c-compliance-input u-padding-left--sm u-font-weight-black u-line-height u-margin--none u-padding--none",
          props.fontClassName || "u-font-3xlg",
          props.colorClassName || "t-color-grey-90",
          props.inputClassName
        )}
        value={props.value || ""} // hides lonely 0 as well
        onChange={props.onChange}
      />
    </Flex>
  );
}
