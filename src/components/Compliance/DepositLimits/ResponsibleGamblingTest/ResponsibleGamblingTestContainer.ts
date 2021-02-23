// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { ResponsibleGamblingTest } from "./ResponsibleGamblingTest";

const cmsKey = "shared.playokay.dgoj.responsible-gambling-test";
export const ResponsibleGamblingTestContainer = connect(
  (state, ownProps) => ({
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    t: R.prop("fields", getPage(cmsKey)(state)),
  }),
  {
    fetchQuestions: () => fetchPageBySlug(cmsKey),
  }
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '({ t, numberOfQuestions, ...prop... Remove this comment to see the full error message
)(ResponsibleGamblingTest);
