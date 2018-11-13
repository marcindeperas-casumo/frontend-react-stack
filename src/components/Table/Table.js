// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";

const camelCaseToTitleCase = (string: string): string =>
  string
    .replace(/([A-Z])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase());

type HeaderProps = {
  columns: Array<string>,
};

const TableHeader = ({ columns }: HeaderProps) => (
  <thead>
    <tr className="t-border-bottom">
      {columns.map((column: string) => (
        <th key={column} className="u-padding">
          {camelCaseToTitleCase(column)}
        </th>
      ))}
    </tr>
  </thead>
);

type RowProps = {
  columns: Array<string>,
  rows: Array<Object>,
  cellPadding: string,
};

const TableRows = ({ columns, rows, cellPadding, ...rest }: RowProps) => {
  const whatever = createModifierClasses("u-padding", cellPadding);
  return rows.map((row: Object) => (
    <tr className="t-border-bottom">
      {columns.map((column: string) => {
        if (rest[column]) {
          return (
            <td key={column} className={whatever}>
              {rest[column](row[column])}
            </td>
          );
        }
        return (
          <td key={column} className={whatever}>
            {row[column]}
          </td>
        );
      })}
    </tr>
  ));
};

type Props = {
  rows: Array<Object>,
  columns?: Array<string>,
  displayHeader?: boolean,
  className: string,
  cellPadding?: spacerSizes,
};
class Table extends PureComponent<Props> {
  render() {
    const {
      rows,
      columns = Object.keys(rows[0]),
      displayHeader = true,
      className,
      cellPadding = "default",
      ...rest
    } = this.props;

    const componentClasses = classNames("u-width--1/1", className);

    return (
      <table className={componentClasses}>
        {displayHeader && (
          <TableHeader cellPadding={cellPadding} columns={columns} />
        )}
        <TableRows
          columns={columns}
          cellPadding={cellPadding}
          rows={rows}
          {...rest}
        />
      </table>
    );
  }
}

export default Table;
