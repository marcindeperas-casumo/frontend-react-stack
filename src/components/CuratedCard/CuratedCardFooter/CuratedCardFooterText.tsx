import Text from "@casumo/cmp-text";
import React from "react";
import { stringToHTML, addPointerEventStylesToLinkElements } from "Utils";

export type CuratedCardFooterTextProps = {
  text: string;
};

export const CuratedCardFooterText = ({ text }: CuratedCardFooterTextProps) => {
  return (
    <div className="o-wrapper">
      <Text
        className="text-white u-margin-bottom t-opacity--75 c-curated-card-footer-tc-link"
        size="xs"
        tag="div"
        dangerouslySetInnerHTML={stringToHTML(
          addPointerEventStylesToLinkElements(text)
        )}
      />
    </div>
  );
};
