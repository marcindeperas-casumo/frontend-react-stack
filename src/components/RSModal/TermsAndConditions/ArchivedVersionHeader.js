// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";

type Props = {
  t: {
    note_version_old: string,
  },
  onClick: () => void,
};

export function ArchivedVersionHeader({ t, ...props }: Props) {
  // only part of text should be clickable, we are matching 3 parts
  // before, clickable and after where before and after are regular text
  // and clickable should handle change to current version
  const [, before, clickable, after] =
    t.note_version_old.match(/(.*)<#>(.*)<\/#>(.*)/) || []; // to silence flow

  return (
    <div className="u-padding--md t-background-info t-color-white">
      <Text tag="span">
        {before}
        <Text
          tag="span"
          className="u-font-weight-bold u-cursor-pointer"
          onClick={props.onClick}
        >
          {clickable}
        </Text>
        {after}
      </Text>
    </div>
  );
}
