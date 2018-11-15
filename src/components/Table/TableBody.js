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

const TableCells = ({ column, padding, row, rest }: TableCellsProps) => {
  const renderProp = rest[column];
  const value = row[column];
  if (renderProp) {
    return <td className={padding}>{renderProp(value)}</td>;
  }
  return <td className={padding}>{value}</td>;
};

const TableBody = ({
  columns,
  rows,
  cellPadding = "default",
  ...rest
}: TableBodyProps) => {
  const padding: string | Array<string> = createModifierClasses(
    "u-padding",
    cellPadding
  );

  return (
    <tbody>
      {rows.map((row: Object, i: number) => (
        <tr className="t-border-bottom" key={`${row[columns[0]]}-${i}`}>
          {columns.map((column: string) => (
            <TableCells
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
