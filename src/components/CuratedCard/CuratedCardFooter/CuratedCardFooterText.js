// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import { stringToHTML } from "Utils";

export type CuratedCardFooterTextProps = {
  text: string,
};

export const CuratedCardFooterText = ({ text }: CuratedCardFooterTextProps) => {
  return (
    <div className="o-wrapper">
      <Text
        className="t-color-white u-margin-bottom u-opacity-75"
        size="xs"
        tag="div"
        dangerouslySetInnerHTML={stringToHTML(text)}
      />
    </div>
  );
};
