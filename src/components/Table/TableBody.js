// @flow
import * as React from "react";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";

type TableCellsProps = {
  column: string,
  padding: string | Array<string>,
  row: Object,
  rest: Object,
};

type TableBodyProps = {
  columns: Array<string>,
  rows: Array<Object>,
  cellPadding: spacerSizes,
};

const TableCell = ({ column, padding, row, rest }: TableCellsProps) => {
  const renderProp = rest[column];
  const value = row[column];

  if (value) {
    if (renderProp) {
      return <td className={padding}>{renderProp(value)}</td>;
    }

    return <td className={padding}>{value}</td>;
  }

  return <td />;
};

const TableBody = ({
  columns,
  rows,
  cellPadding = "default",
  ...rest
}: TableBodyProps) => {
  // TODO: make createModifierClasses to support horz and vert
  const padding: string | Array<string> =
    cellPadding.startsWith("vert") || cellPadding.startsWith("horiz")
      ? `u-padding-${cellPadding}`
      : createModifierClasses("u-padding", cellPadding);

  return (
    <tbody>
      {rows.map((row: Object, i: number) => (
        <tr className="t-border-bottom" key={`${row[columns[0]]}-${i}`}>
          {columns.map((column: string) => (
            <TableCell
              key={column}
              column={column}
              padding={padding}
              row={row}
              rest={rest}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
