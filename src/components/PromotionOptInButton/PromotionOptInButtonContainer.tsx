// @flow
import React from "react";
import { connect } from "react-redux";
import { getField } from "Models/cms";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { playerIdSelector } from "Models/handshake";
import {
  setPromotionOptIn,
  isPromotionOptedInSelector,
  routeSlugSelector,
} from "Models/promotions";
import OptInButton from "../OptInButton";

type Props = {
  /** The slug of the page in the CMS which contains opt-in/opt-out fields */
  slug: string,
  /** The opt-in field name on the CMS page - more flexibility when there is no standard */
  optInField: string,
  /** The opt-out field name on the CMS page - more flexibility when there is no standard */
  optOutField: string,
};

const defaultOptInValue = "Opt-In";
const defaultOptOutValue = "Opted-In";

const PromotionOptInButtonConnected = connect(
  (state, { slug, optInField, optOutField }) => ({
    active: {
      label: getField({
        slug,
        field: optInField,
        defaultValue: defaultOptInValue,
      })(state),
      eventName: EVENTS.MIXPANEL_PROMOTION_OPTED_IN,
      data: {
        [EVENT_PROPS.OPTED_IN]: true,
        playerId: playerIdSelector(state),
        slug: routeSlugSelector(state),
      },
    },
    disabled: {
      label: getField({
        slug,
        field: optOutField,
        defaultValue: defaultOptOutValue,
      })(state),
      eventName: EVENTS.MIXPANEL_PROMOTION_OPTED_IN,
      data: {
        [EVENT_PROPS.OPTED_IN]: false,
        playerId: playerIdSelector(state),
        slug: routeSlugSelector(state),
      },
    },
    isOptedIn: isPromotionOptedInSelector(slug)(state),
  }),
  (dispatch, { slug }) => ({
    active: {
      onClick: () => dispatch(setPromotionOptIn(slug, true)),
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...ownProps,
    active: {
      ...stateProps.active,
      ...dispatchProps.active,
    },
  })
)(OptInButton);

const PromotionOptInButtonContainer = (props: Props) => (
  <div className="u-padding-x--lg u-margin-bottom--lg u-text-align-center">
    <PromotionOptInButtonConnected {...props} />
  </div>
);

export default PromotionOptInButtonContainer;
