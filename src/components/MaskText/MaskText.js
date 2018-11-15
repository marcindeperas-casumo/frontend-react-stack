import React from "react";
import { matchingGroups } from "Utils/index";
import Matcher from "Components/Matcher";

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
