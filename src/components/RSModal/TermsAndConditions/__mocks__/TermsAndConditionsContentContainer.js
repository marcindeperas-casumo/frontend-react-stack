// @flow
import * as React from "react";
import { TermsAndConditionsContent } from "../TermsAndConditionsContent";
import cms from "./cms";

export default () =>
  <TermsAndConditionsContent
    version={16}
    content={cms.content}
    fetchVersionContent={() => {}} />
