import React from "react";
import { connect } from "react-redux";
import { fetchPageBySlug, getField } from "Models/cms";
import OptInButton from "./OptInButton";

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

const OptInButtonConnected = connect(
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'slug' does not exist on type '{}'.
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
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'slug' does not exist on type '{}'.
  (dispatch, { slug }) => ({
    fetchPage: () => dispatch(fetchPageBySlug(slug)),
  })
)(OptInButton);

const OptInButtonContainer = (props: Props) => (
  // @ts-expect-error ts-migrate(2741) FIXME: Property 'isOptedIn' is missing in type '{ slug: s... Remove this comment to see the full error message
  <OptInButtonConnected {...props} />
);

export default OptInButtonContainer;
