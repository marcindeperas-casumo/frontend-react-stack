//@flow
import React from "react";
import Button from "@casumo/cmp-button";

type Props = {
  text: string,
  redirectionUrl: string,
  className: string,
};

export const ValuableDetailsActionButton = ({
  text,
  redirectionUrl,
  className,
}: Props) => {
  return (
    <Button href={redirectionUrl} className={className}>
      {text}
    </Button>
  );
};
