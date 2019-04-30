// @flow
import React from "react";

export type Props = {
  valuable: any,
};

const PlayerValuableTile = ({
  valuable: { id, title, expirationTime, state, caveat, content, ...rest },
}: Props) => (
  <div>
    {id}
    <br />
    {title}
    <br />
    {content}
    <br />
    {state}
    <br />
    {caveat}
    <br />
    {expirationTime}
    <br />
    {JSON.stringify(rest)}
  </div>
);

export default PlayerValuableTile;
