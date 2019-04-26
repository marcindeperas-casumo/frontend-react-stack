// @flow
import React from "react";

export type Props = {
  valuable: any,
};

const PlayerValuableTile = ({
  valuable: { id, title, expirationTime, state, ...rest },
}: Props) => (
  <div>
    {id}
    <br />
    {title}
    <br />
    {state}
    <br />
    {expirationTime}
    <br />
    {JSON.stringify(rest)}
  </div>
);

export default PlayerValuableTile;
