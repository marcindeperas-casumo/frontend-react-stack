// @flow
import React from "react";

export type Props = {
  valuable: any,
};

export const DummyPlayerValuableTile = ({
  valuable: {
    id,
    valuableType,
    title,
    expirationTime,
    state,
    caveat,
    content,
    ...rest
  },
}: Props) => (
  <div>
    id: {id}
    <br />
    valuableType: {valuableType}
    <br />
    title: {title}
    <br />
    content: {content}
    <br />
    state: {state}
    <br />
    caveat: {caveat}
    <br />
    expirationTime: {expirationTime}
    <br />
    {JSON.stringify(rest)}
  </div>
);
