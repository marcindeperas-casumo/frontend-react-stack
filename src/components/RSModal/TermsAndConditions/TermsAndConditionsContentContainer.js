// @flow
import { connect } from "react-redux";
import { fetchVersionContent, getVersionContent } from "Models/tac";
import { TermsAndConditionsContent } from "./TermsAndConditionsContent";

export const TermsAndConditionsContentContainer = connect(
  (state, { version }) => {
    const { content } = getVersionContent(version)(state);

    return { content };
  },
  { fetchVersionContent }
)(TermsAndConditionsContent);
