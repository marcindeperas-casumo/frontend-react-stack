import React from "react";

type Props = {
  netValue?: number;
};

export const NetFinancialPosition = ({ netValue }: Props) => {
  return <p>Winnings {netValue}</p>;
};
