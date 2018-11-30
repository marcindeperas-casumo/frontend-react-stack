// @flow
import * as React from "react";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";

type HeaderProps = {
  columns: Array<string>,
  columnHeadings: Array<string>,
  cellPadding: spacerSizes,
};

const TableHeader = ({
  columns,
  columnHeadings,
  cellPadding = "default",
}: HeaderProps) => {
  // TODO: make createModifierClasses to support horz and vert
  const padding: string | Array<string> =
    cellPadding.startsWith("vert") || cellPadding.startsWith("horiz")
      ? `u-padding-${cellPadding}`
      : createModifierClasses("u-padding", cellPadding);

  return (
    <thead>
      <tr className="t-border-bottom">
        {columns.map((column: string, i: number) => (
          <th key={column} className={padding}>
            {columnHeadings[i]}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
