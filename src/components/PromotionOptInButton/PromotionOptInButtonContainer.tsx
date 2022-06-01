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
  slug: string;
  /** The opt-in field name on the CMS page - more flexibility when there is no standard */
  optInField: string;
  /** The opt-out field name on the CMS page - more flexibility when there is no standard */
  optOutField: string;
};

const defaultOptInValue = "Opt-In";
const defaultOptOutValue = "Opted-In";

const PromotionOptInButtonConnected = connect(
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'slug' does not exist on type '{}'.
  (state, { slug, optInField, optOutField }) => ({
    active: {
      label: getField({
        slug,
        field: optInField,
        defaultValue: defaultOptInValue,
        // @ts-expect-error: apply fix if you know the context
      })(state),
      eventName: EVENTS.MIXPANEL_PROMOTION_OPTED_IN,
      data: {
        [EVENT_PROPS.OPTED_IN]: true,
        playerId: playerIdSelector(state),
        // @ts-expect-error: apply fix if you know the context
        slug: routeSlugSelector(state),
      },
    },
    disabled: {
      label: getField({
        slug,
        field: optOutField,
        defaultValue: defaultOptOutValue,
        // @ts-expect-error: apply fix if you know the context
      })(state),
      eventName: EVENTS.MIXPANEL_PROMOTION_OPTED_IN,
      data: {
        [EVENT_PROPS.OPTED_IN]: false,
        playerId: playerIdSelector(state),
        // @ts-expect-error: apply fix if you know the context
        slug: routeSlugSelector(state),
      },
    },
    isOptedIn: isPromotionOptedInSelector(slug)(state),
  }),
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'slug' does not exist on type '{}'.
  (dispatch, { slug }) => ({
    active: {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(dispatch: (action: any) => void... Remove this comment to see the full error message
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
