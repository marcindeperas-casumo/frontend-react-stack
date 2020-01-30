// @flow
import { connect } from "react-redux";
import { fetchPageBySlug } from "Models/cms";
import {
  configurationFormContentSelector,
  CMS_SLUGS,
} from "Models/slotControlSystem";
import { StillOnBreak } from "./StillOnBreak";

export const StillOnBreakContainer = connect(
  state => ({
    t: configurationFormContentSelector(state),
  }),
  dispatch => ({
    fetchContent: () => {
      dispatch(fetchPageBySlug(CMS_SLUGS.UNITS));
    },
  })
)(StillOnBreak);
