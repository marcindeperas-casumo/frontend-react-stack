import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { CheckIcon } from "@casumo/cmp-icons";
import React, { PureComponent } from "react";
import TrackClick from "Components/TrackClick";
import { noop } from "Utils";

type OwnProps = {
  /** The function that fetches the translation page if not fetched yet */
  fetchPage: () => void;
  active: {
    /** The label of the active button state */
    label: string;
    /** The event name of the active button state */
    eventName: string;
    /** The event data of the active button state */
    data: {};
    /** The onClick callback of the active button state */
    onClick?: () => void;
  };
  disabled: {
    /** The label of the disabled button state */
    label: string;
    /** The event name of the disabled button state */
    eventName: string;
    /** The event data of the disabled button state */
    data: {};
  };
  /** The className to be used added to the button */
  className?: string;
  /** The initial state of the button */
  isOptedIn: boolean;
};

type Props = OwnProps & typeof OptInButton.defaultProps;

class OptInButton extends PureComponent<Props> {
  static defaultProps = {
    fetchPage: () => {},
  };

  componentDidMount() {
    this.props.fetchPage();
  }

  render() {
    const { active, disabled } = this.props;

    if (this.props.isOptedIn) {
      return (
        <TrackClick eventName={disabled.eventName} data={disabled.data}>
          <ButtonPrimary size="md" isDisabled>
            <CheckIcon size="sm" className={this.props.className} />
            <Text tag="span" className="u-margin-left">
              {disabled.label}
            </Text>
          </ButtonPrimary>
        </TrackClick>
      );
    }

    return (
      <TrackClick eventName={active.eventName} data={active.data}>
        <ButtonPrimary size="md" onClick={active.onClick || noop}>
          <Text tag="span">{active.label}</Text>
        </ButtonPrimary>
      </TrackClick>
    );
  }
}

export default OptInButton;
