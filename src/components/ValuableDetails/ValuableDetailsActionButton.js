//@flow
import React from "react";
import Button from "@casumo/cmp-button";

type Props = {
  text: string,
  redirectionUrl: string,
  action: () => void,
  className: string,
};

export const ValuableDetailsActionButton = ({
  text,
  redirectionUrl,
  action,
  className,
}: Props) => {
  return (
    <Button onClick={() => action} href={redirectionUrl} className={className}>
      {text}
    </Button>
  );
};
