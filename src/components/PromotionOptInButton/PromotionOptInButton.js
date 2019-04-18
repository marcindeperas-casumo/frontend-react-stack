// @flow
import React, { PureComponent } from "react";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import OptInButton from "Components/OptInButton";

type Props = {
  /** The slug of the page in the CMS which contains opt-in/opt-out fields */
  slug: string,
  /** The opt-in field name on the CMS page - more flexibility when there is no standard */
  optInField: string,
  /** The opt-out field name on the CMS page - more flexibility when there is no standard */
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
