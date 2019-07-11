// @flow
import { connect } from "react-redux";
import { getPage, fetchPageBySlug } from "Models/cms";
import { ISO8601Duration } from "./ISO8601Duration";

const slug = "i18n.durations";
export const ISO8601DurationContainer = connect(
  (state, ownProps) => ({
    t: getPage(slug)(state).fields,
  }),
  dispatch => ({
    fetchTranslations: () => {
      dispatch(fetchPageBySlug(slug));
    },
  })
)(ISO8601Duration);
