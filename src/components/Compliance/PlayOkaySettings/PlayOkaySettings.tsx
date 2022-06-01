import * as React from "react";
import Text from "@casumo/cmp-text";

type TProps = {
  isError: boolean;
  children: React.ReactNode;
};

export function PlayOkaySettings({ isError, children }: TProps) {
  if (isError) {
    return (
      <Text>
        There's been error loading some data, please reload the page. If the
        error persists, contact our support.
      </Text>
    );
  }

  return <div className="flex flex-col gap-lg">{children}</div>;
}
