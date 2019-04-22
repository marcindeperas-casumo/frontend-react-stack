// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { TickIcon } from "@casumo/cmp-icons";
import TrackClick from "Components/TrackClick";

type Props = {
  /** The function that fetches the translation page if not fetched yet */
  fetchPage: () => void,
  active: {
    /** The label of the active button state */
    label: string,
    /** The event name of the active button state */
    eventName: string,
    /** The event data of the active button state */
    data: {},
    /** (optional) The onClick callback of the active button state */
    buttonCallback?: () => void,
  },
  disabled: {
    /** The label of the disabled button state */
    label: string,
    /** The event name of the disabled button state */
    eventName: string,
    /** The event data of the disabled button state */
    data: {},
  },
  /** (optional) The className to be used added to the button */
  className?: string,
  /** The initial state of the button */
  isOptedIn: boolean,
};

class OptInButton extends PureComponent<Props> {
  static defaultProps = {
    fetchPage: () => {},
  };

  componentDidMount() {
    this.props.fetchPage();
  }

  render() {
    const { active, disabled } = this.props;
    const onClickHandler = active.buttonCallback
      ? active.buttonCallback
      : () => {};

    if (this.props.isOptedIn) {
      return (
        <TrackClick eventName={disabled.eventName} data={disabled.data}>
          <Button
            variant="variant-1"
            className="u-padding-vert--md u-padding-horiz--xlg"
            disabled
          >
            <TickIcon className={this.props.className} />
            <Text tag="span" className="u-margin-left">
              {disabled.label}
            </Text>
          </Button>
        </TrackClick>
      );
    }

    return (
      <TrackClick eventName={active.eventName} data={active.data}>
        <Button
          variant="variant-1"
          className="u-padding-vert--md u-padding-horiz--xlg"
          onClick={onClickHandler}
        >
          <Text tag="span">{active.label}</Text>
        </Button>
      </TrackClick>
    );
  }
}

export default OptInButton;
