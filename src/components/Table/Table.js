import React, { PureComponent } from "react";

const TableHeader = ({ columns }) => (
  <thead>
    <tr className="t-border-bottom">
      {columns.map(column => (
        <th className="u-padding">{column}</th>
      ))}
    </tr>
  </thead>
);

const TableRows = ({ columns, rows, cellPadding, ...rest }) => {
  return rows.map(row => (
    <tr className="t-border-bottom">
      {columns.map(column => {
        if (rest[column]) {
          return <td className={cellPadding}>{rest[column](row[column])}</td>;
        }
        return <td className={cellPadding}>{row[column]}</td>;
      })}
    </tr>
  ));
};

export class Table extends PureComponent {
  render() {
    const {
      rows,
      columns = Object.keys(rows[0]),
      displayHeader = false,
      className,
      cellPadding = "u-padding",
      ...rest
    } = this.props;

    return (
      <table width="100%" className={className}>
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
