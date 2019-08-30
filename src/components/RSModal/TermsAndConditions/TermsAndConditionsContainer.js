// @flow
import { connect } from "react-redux";
import {
  fetchTACAcknowledgements,
  getAcknowledgements,
  getTACtext,
  cmsSlugs,
} from "Models/tac";
import { INTL_LOCALES } from "Src/constants";
import { marketSelector } from "Models/handshake";
import { fetchPageBySlug } from "Models/cms";
import { TermsAndConditions } from "./TermsAndConditions";

export const TermsAndConditionsContainer = connect(
  (state, ownProps) => ({
    t: getTACtext(state),
    acks: getAcknowledgements(state),
    locale: INTL_LOCALES[marketSelector(state)],
  }),
  {
    fetchTACAcknowledgements,
    fetchTranslations: () => fetchPageBySlug(cmsSlugs.main),
  }
)(TermsAndConditions);
