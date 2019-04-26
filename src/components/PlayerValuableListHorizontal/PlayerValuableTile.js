// @flow
import React from "react";

export type Props = {
  id: string,
  valuable: any,
};

const PlayerValuableTile = ({ id, valuable }: Props) => (
  <div>
    {id}
    <br />
    {valuable.expirationTime}
    <br />
    {JSON.stringify(valuable)}
  </div>
);

export default PlayerValuableTile;
