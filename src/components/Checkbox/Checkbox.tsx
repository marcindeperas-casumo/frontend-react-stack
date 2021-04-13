import Flex from "@casumo/cmp-flex";
import { CheckIcon } from "@casumo/cmp-icons";
import * as React from "react";
import "./Checkbox.scss";

type Props = {
  checked?: boolean;
  onChange: (active: boolean) => void;
  renderChecked?: () => React.ReactNode;
  renderUnchecked?: () => React.ReactNode;
};

const CheckboxUnchecked = () => (
  <div className="c-checkbox u-cursor-pointer u-padding--md t-border-r--circle t-border-current o-ratio t-color-grey-20 t-background-grey-0" />
);

const CheckboxChecked = () => (
  <div className="c-checkbox u-cursor-pointer u-padding--md t-border-r--circle t-border-current o-ratio t-color-purple-60 t-background-purple-60">
    <Flex
      align="center"
      justify="center"
      className="o-ratio__content u-padding--sm"
    >
      <CheckIcon className="t-color-white" />
    </Flex>
  </div>
);

export class Checkbox extends React.PureComponent<Props> {
  static defaultProps = {
    checked: false,
    renderChecked: CheckboxChecked,
    renderUnchecked: CheckboxUnchecked,
  };

  render() {
    const { renderChecked, renderUnchecked, checked, onChange } = this.props;

    return (
      <div
        className="u-display--inline-block"
        onClick={() => onChange(!checked)}
      >
        {checked ? renderChecked() : renderUnchecked()}
      </div>
    );
  }
}