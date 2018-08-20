import React from "react";
import { matchingGroups } from "../utils";
import Matcher from "./Matcher";

const MaskText = ({ text, search, matchRender, unmatchedRender }) => {
  return (
    <React.Fragment>
      {matchingGroups(text, search).map(group => (
        <Matcher
          getKey={({ type }) => type}
          matchers={{
            matched: ({ value }) => matchRender(value),
            unmatched: ({ value }) => unmatchedRender(value),
            default: ({ value }) => value,
          }}
          {...group}
        />
      ))}
    </React.Fragment>
  );
};

export default MaskText;
