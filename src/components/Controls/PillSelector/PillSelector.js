// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
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

export default class PillSelector extends PureComponent<Props> {
  onChange: Function;

  static defaultProps = {
    className: "",
    disabled: false,
    options: [],
    onChange: noop,
    value: null,
  };

  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  getPillClassModifier(option: PillSelectorOption) {
    if (this.props.disabled) {
      return "t-background-grey-light-2 t-color-grey-light-1";
    }

    if (option.value === this.props.value) {
      return "t-background-green t-color-white";
    }

    return "t-background-grey-light-2 t-color-grey-dark-3";
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
              `c-input-pill t-border-r--pill u-font-weight-bold`,
              this.getPillClassModifier(option)
            )}
            justify="center"
            key={option.value}
            onClick={() => this.onChange(option.value)}
          >
            {option.labelHeader ? (
              <div className="u-font-xs u-text-transform-uppercase u-margin-top--none">
                {option.labelHeader}
              </div>
            ) : (
              ""
            )}
            <div className="u-margin-top--none">{option.label}</div>
          </Flex>
        ))}
      </div>
    );
  }
}
