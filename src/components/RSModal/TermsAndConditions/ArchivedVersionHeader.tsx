import Text from "@casumo/cmp-text";
import * as React from "react";

type Props = {
  title: string;
  onClick: () => void;
};

export function ArchivedVersionHeader(props: Props) {
  // only part of text should be clickable, we are matching 3 parts
  // before, clickable and after where before and after are regular text
  // and clickable should handle change to current version
  const [, before, clickable, after] =
    props.title.match(/(.*)<#>(.*)<\/#>(.*)/) || []; // to silence flow

  return (
    <div className="u-padding--md bg-blue-50 text-white">
      <Text tag="span" size="sm">
        {before}
        <Text
          tag="span"
          size="sm"
          className="u-font-weight-bold u-cursor--pointer"
          onClick={props.onClick}
        >
          {clickable}
        </Text>
        {after}
      </Text>
    </div>
  );
}
