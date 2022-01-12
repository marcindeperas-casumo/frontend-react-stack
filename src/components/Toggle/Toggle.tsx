import Text from "@casumo/cmp-text";
import React from "react";
import cx from "classnames";
import { Checkbox } from "Components/Checkbox/Checkbox";
import { useTranslations } from "Utils/hooks";
import "./Toggle.scss";

type Props = {
  labelOn?: string;
  labelOff?: string;
  checked?: boolean;
  disabled?: boolean;
  translate?: boolean;
  onChange: (active: boolean) => void;
};

type InnerToggleProps = {
  labelOn?: string;
  labelOff?: string;
  checked?: boolean;
  disabled?: boolean;
};

const ToggleInner = ({
  labelOn,
  labelOff,
  checked,
  disabled,
}: InnerToggleProps) => (
  <div
    className={cx(
      "c-toggle o-position--relative t-border--md u-font-weight-bold u-cursor--pointer t-border-r--pill u-overflow--hidden",
      {
        "bg-purple-60 text-white t-border-purple-60": !disabled && checked,
        "bg-white text-grey-5 border-grey-5": !disabled && !checked,
        "bg-grey-5 text-white t-border-grey-5": disabled,
        "pointer-events-none": disabled,
      }
    )}
  >
    <div
      className={cx("o-position--absolute o-inset-top--none", {
        "c-toggle__circle--active ": checked,
        "c-toggle__circle--inactive text-grey-9": !checked,
        "text-grey-5": !checked,
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
          "text-grey-90": !checked,
        }
      )}
      size="xs"
    >
      {checked ? labelOn : labelOff}
    </Text>
  </div>
);

export function Toggle({ checked, disabled, translate, ...props }: Props) {
  const t = useTranslations<{ on: string; off: string }>("toggle");
  const labelOn = translate ? t?.on : props.labelOn;
  const labelOff = translate ? t?.off : props.labelOff;

  const current = (
    <ToggleInner
      labelOn={labelOn}
      labelOff={labelOff}
      checked={checked}
      disabled={disabled}
    />
  );

  return (
    <Checkbox
      {...props}
      renderChecked={() => current}
      renderUnchecked={() => current}
    />
  );
}
