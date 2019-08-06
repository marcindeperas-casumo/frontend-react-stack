//@flow
import React from "react";
import Button from "@casumo/cmp-button";

type Props = {
  text: string,
  redirectionUrl: string,
  action: () => void,
};

export const ValuableDetailsActionButton = ({
  text,
  redirectionUrl,
  action,
}: Props) => {
  return (
    <Button
      className="u-width--1/1"
      onClick={() => action}
      href={redirectionUrl}
    >
      {text}
    </Button>
  );
};
