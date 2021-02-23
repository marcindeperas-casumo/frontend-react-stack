// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import "./PillSelector.scss";

export type PillSelectorOption = {
  label: string,
  labelHeader?: string,
  value: any,
};

type Props = {
  className?: string,
  disabled?: boolean,
  onChange: (value: any) => void,
  options: PillSelectorOption[],
  value?: any,
};

const noop = () => {};

export class PillSelector extends PureComponent<Props> {
  onChange: Function;

  static defaultProps = {
    className: "",
    disabled: false,
    options: [],
    onChange: noop,
    value: null,
  };

  getPillClassModifier(option: PillSelectorOption) {
    if (this.props.disabled) {
      return "t-background-grey-0 t-color-grey-20";
    }

    if (option.value === this.props.value) {
      return "t-background-purple-60 t-color-white";
    }

    return "t-background-grey-0 t-color-grey-90";
  }

  onChange(value: any) {
    if (this.props.disabled) {
      return false;
    }
    this.props.onChange(value);
  }

  render() {
    return (
      <div
        className={classNames("c-input-pill-selector", this.props.className)}
      >
        {this.props.options.map(option => (
          <Flex
            align="center"
            direction="vertical"
            className={classNames(
              `c-input-pill u-cursor-pointer t-border-r--pill u-font-weight-bold`,
              this.getPillClassModifier(option)
            )}
            justify="center"
            key={option.value}
            onClick={() => this.onChange(option.value)}
          >
            {option.labelHeader ? (
              <Text
                tag="div"
                className="u-text-transform-uppercase u-margin-top--none"
                size="2xs"
              >
                {option.labelHeader}
              </Text>
            ) : (
              ""
            )}
            <Text tag="div" className="u-margin-top--none">
              {option.label}
            </Text>
          </Flex>
        ))}
      </div>
    );
  }
}
