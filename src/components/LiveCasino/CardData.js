/* @flow */
import React from "react";

import Heading from "@casumo/cmp-heading";

import "./CardData.scss";

type Props = {
  // Additional css classes
  className?: string,
  // Jackpot shown
  results: string[],
  max: number,
};

const numbers = {
    red: [
        "1", "3", "5", "7", "9", "12", "14", "16", "18",
        "19", "21", "23", "25", "27", "30", "32", "34", "36"
    ],
    black: [
        "2", "4", "6", "8", "10", "11", "13", "15", "17",
        "20", "22", "24", "26", "28", "29", "31", "33", "35"
    ],
    green: ["0", "00"],
};

const getColor = (n) => {
    let color;
    Object.entries(numbers).some(([k, v]) => {
        let exists = v.includes(n);
        color = exists ? k : "green";  // default green
        return exists;
    });
    return color;
}

console.log(getColor("1"));

const CardData = ({ className, results, max = 5, ...props }: Props) => {
  return (
    <div className="c-card-data" {...props}>
      {results.length && (
        <div className="c-card-data__results u-padding">
          <div className="c-card-data__results-numbers">
            {results.slice(0, max).map((n, i) => (
              <div
                className={`c-card-data__results-number --${getColor(n)} u-padding u-margin-horiz--micro`}
                key={i}
              >
                {n}
              </div>
            ))}
          </div>
          <Heading
            className="c-card-data__results-title u-margin-bottom--small u-margin-top--micro"
            text="recent numbers"
            size="milli"
            rank="4"
          />
        </div>
      )}
    </div>
  );
};

export default CardData;
