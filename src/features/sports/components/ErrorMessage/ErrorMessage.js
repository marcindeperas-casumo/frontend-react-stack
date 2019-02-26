// @flow
import React from "react";

type Direction = "horizontal" | "vertical";

type Props = {
  direction: Direction,
  retry: () => boolean,
};

export default ({ direction, retry }: Props) => (
  <div>
    <h1>ERRORED AF.</h1>
    <pre>{JSON.stringify({ direction, retry })}</pre>
  </div>
);
