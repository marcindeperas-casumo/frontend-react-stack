// @flow
import React, { PureComponent } from "react";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import OptInButton from "Components/OptInButton";

type Props = {
  /** A descriptive comment about the 'msg' prop. Note that this will appear in storybook info addon props table. */
  slug: string,
  optInField: string,
  optOutField: string,
};

class PromotionOptInButton extends PureComponent<Props> {
  render() {
    const active = {
      eventName: EVENTS.PROMOTION_OPTED_IN,
      data: {
        [EVENT_PROPS.OPTED_IN]: true,
      },
    };
    const disabled = {
      eventName: EVENTS.PROMOTION_OPTED_IN,
      data: {
        [EVENT_PROPS.OPTED_IN]: false,
      },
    };

    return <OptInButton {...this.props} active={active} disabled={disabled} />;
  }
}

export default PromotionOptInButton;
