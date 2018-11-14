// @flow
import * as React from "react";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";

type Props = {
  columns: Array<string>,
  rows: Array<Object>,
  cellPadding: spacerSizes,
};

const TableBody = ({
  columns,
  rows,
  cellPadding = "default",
  ...rest
}: Props): React.Node => {
  const padding: string | Array<string> = createModifierClasses(
    "u-padding",
    cellPadding
  );

  return (
    <tbody>
      {rows.map((row: Object, i) => (
        <tr className="t-border-bottom" key={`${row[columns[0]]}-${i}`}>
          {columns.map((column: string) => {
            if (rest[column]) {
              return (
                <td key={column} className={padding}>
                  {rest[column](row[column])}
                </td>
              );
            }
            return (
              <td key={column} className={padding}>
                {row[column]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
