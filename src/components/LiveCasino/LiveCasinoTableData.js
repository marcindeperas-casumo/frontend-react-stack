/* @flow */
import React from "react";

import Heading from "@casumo/cmp-heading";

import "./LiveCasinoTableData.scss";

type Props = {
  // Additional css classes
  className?: string,
  // Jackpot shown
  results: string[],
};

const LiveCasinoTableData = ({ className, results, ...props }: Props) => {
  return (
    <div className="c-casino-table-data" {...props}>
      {results.length && (
        <div className="c-casino-table-data__results u-padding">
          <div className="c-casino-table-data__results-numbers">
            {results.slice(0, 5).map((n, i) => (
              <div
                className="c-casino-table-data__results-number u-padding u-margin-horiz--micro"
                key={i}
              >
                {n}
              </div>
            ))}
          </div>
          <Heading
            className="c-casino-table-data__results-title u-margin-bottom--small u-margin-top--micro"
            text="recent numbers"
            size="milli"
            rank="4"
          />
        </div>
      )}
    </div>
  );
};

export default LiveCasinoTableData;
