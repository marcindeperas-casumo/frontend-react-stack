// @flow
import React from "react";
import { connect } from "react-redux";
import { fetchPageBySlug, getField } from "Models/cms";
import OptInButton from "./OptInButton";

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

const OptInButtonConnected = connect(
  (state, { slug, optInField, optOutField, active, disabled }) => ({
    active: {
      ...active,
      label: getField({
        slug,
        field: optInField,
        defaultValue: defaultOptInValue,
      })(state),
    },
    disabled: {
      ...disabled,
      label: getField({
        slug,
        field: optOutField,
        defaultValue: defaultOptOutValue,
      })(state),
    },
  }),
  (dispatch, { slug }) => ({
    fetchPage: () => dispatch(fetchPageBySlug(slug)),
  })
)(OptInButton);

const OptInButtonContainer = (props: Props) => (
  <OptInButtonConnected {...props} />
);

export default OptInButtonContainer;
