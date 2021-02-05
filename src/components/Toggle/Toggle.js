// @flow
import React from "react";
// import div from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { Checkbox } from "Components/Checkbox/Checkbox";
import "./Toggle.scss";

type Props = {
  labelOn?: string,
  labelOff?: string,
  checked?: boolean,
  onChange: (active: boolean) => void,
};

type UncheckedProps = {
  label?: string,
};

type CheckedProps = {
  label?: string,
};

const Unchecked = ({ label }: UncheckedProps) => (
  <div className="c-toggle u-cursor-pointer t-border-r--pill u-overflow--hidden t-background-grey-5 t-color-white">
    <div className="c-toggle-circle--inactive">
      <svg width="28" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="12" fill="currentColor" />
      </svg>
    </div>
    <Text className="c-toggle__label">{label}</Text>
  </div>
);

const Checked = ({ label }: CheckedProps) => (
  <div className="c-toggle u-cursor-pointer t-border-r--pill u-overflow--hidden t-background-purple-60 t-color-white">
    <div className="c-toggle-circle--active">
      <svg width="28" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="12" fill="currentColor" />
      </svg>
    </div>
    <Text className="c-toggle__label">{label}</Text>
  </div>
);

export function Toggle(props: Props) {
  return (
    <Checkbox
      {...props}
      renderChecked={() => <Checked label={props.labelOn} />}
      renderUnchecked={() => <Unchecked label={props.labelOff} />}
    />
  );
}
