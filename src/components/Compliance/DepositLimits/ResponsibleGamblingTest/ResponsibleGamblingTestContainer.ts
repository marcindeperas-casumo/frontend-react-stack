// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { ResponsibleGamblingTest } from "./ResponsibleGamblingTest";

const cmsKey = "shared.playokay.dgoj.responsible-gambling-test";
export const ResponsibleGamblingTestContainer = connect(
  (state, ownProps) => ({
    t: R.prop("fields", getPage(cmsKey)(state)),
  }),
  {
    fetchQuestions: () => fetchPageBySlug(cmsKey),
  }
)(ResponsibleGamblingTest);
