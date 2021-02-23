// @flow
import React from "react";
import { matchingGroups } from "Utils";
import Matcher from "Components/Matcher";

type Props = {
  text: string,
  search: string,
  matchRender: Function,
  unmatchedRender: Function,
};
const MaskText = ({ text, search, matchRender, unmatchedRender }: Props) => {
  return (
    <React.Fragment>
      {matchingGroups(text, search).map((group, i) => (
        <Matcher
          key={i}
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
