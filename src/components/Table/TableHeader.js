// @flow
import * as React from "react";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";

export const camelCaseToSentenceCase = (string: string): string =>
  string
    .replace(/([A-Z])/g, match => ` ${match.toLowerCase()}`)
    .replace(/^./, match => match.toUpperCase());

type HeaderProps = {
  columns: Array<string>,
  cellPadding: spacerSizes,
};

const TableHeader = ({ columns, cellPadding = "default" }: HeaderProps) => {
  const padding: string | Array<string> = createModifierClasses(
    "u-padding",
    cellPadding
  );

  return (
    <thead>
      <tr className="t-border-bottom">
        {columns.map((column: string) => (
          <th key={column} className={padding}>
            {camelCaseToSentenceCase(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
