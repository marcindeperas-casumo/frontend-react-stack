// @flow
import React from "react";
import { connect } from "react-redux";
import { getField } from "Models/cms";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import {
  setPromotionOptIn,
  isPromotionOptedInSelector,
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
      eventName: EVENTS.PROMOTION_OPTED_IN,
      data: {
        [EVENT_PROPS.OPTED_IN]: true,
      },
    },
    disabled: {
      label: getField({
        slug,
        field: optOutField,
        defaultValue: defaultOptOutValue,
      })(state),
      eventName: EVENTS.PROMOTION_OPTED_IN,
      data: {
        [EVENT_PROPS.OPTED_IN]: false,
      },
    },
    isOptedIn: isPromotionOptedInSelector(slug)(state),
  }),
  (dispatch, { slug, active }) => ({
    active: {
      ...active,
      onClick: () => dispatch(setPromotionOptIn(slug, true)),
    },
  })
)(OptInButton);

const PromotionOptInButtonContainer = (props: Props) => (
  <PromotionOptInButtonConnected {...props} />
);

export default PromotionOptInButtonContainer;
