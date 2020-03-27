// @flow
import { connect } from "react-redux";
import { getPage, fetchPageBySlug } from "Models/cms";
import { Duration } from "./Duration";

const slug = "i18n.durations";
export const DurationContainer = connect(
  (state, ownProps) => {
    const { fields } = getPage(slug)(state);

    return {
      t: fields
        ? {
            ...fields,
            ...ownProps.t,
          }
        : null,
    };
  },
  dispatch => ({
    fetchTranslations: () => {
      dispatch(fetchPageBySlug(slug));
    },
  })
)(Duration);
