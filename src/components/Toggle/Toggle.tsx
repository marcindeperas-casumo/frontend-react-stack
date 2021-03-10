import Text from "@casumo/cmp-text";
import React from "react";
import cx from "classnames";
import { Checkbox } from "Components/Checkbox/Checkbox";
import "./Toggle.scss";

type Props = {
  labelOn?: string;
  labelOff?: string;
  checked?: boolean;
  onChange: (active: boolean) => void;
};

type InnerToggleProps = {
  labelOn?: string;
  labelOff?: string;
  checked?: boolean;
};

const ToggleInner = ({ labelOn, labelOff, checked }: InnerToggleProps) => (
  <div
    className={cx(
      "c-toggle o-position--relative t-border--md u-font-weight-bold u-cursor--pointer t-border-r--pill u-overflow--hidden",
      {
        "t-background-purple-60 t-color-white t-border-white": checked,
        "t-background-white t-color-grey-5 t-border-grey-5": !checked,
      }
    )}
  >
    <div
      className={cx("o-position--absolute o-inset-top--none", {
        "c-toggle__circle--active ": checked,
        "c-toggle__circle--inactive t-color-grey-9": !checked,
        "t-color-grey-5": !checked,
      })}
    >
      <svg width="28" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="11" fill="currentColor" />
      </svg>
    </div>
    <Text
      className={cx(
        "c-toggle__label u-text-nowrap u-overflow--hidden u-text-overflow--ellipsis",
        {
          "t-color-grey-90": !checked,
        }
      )}
      size="xs"
    >
      {checked ? labelOn : labelOff}
    </Text>
  </div>
);

export function Toggle(props: Props) {
  const { labelOn, labelOff, checked } = props;
  const current = (
    <ToggleInner labelOn={labelOn} labelOff={labelOff} checked={checked} />
  );

  return (
    <Checkbox
      {...props}
      renderChecked={() => current}
      renderUnchecked={() => current}
    />
  );
}
