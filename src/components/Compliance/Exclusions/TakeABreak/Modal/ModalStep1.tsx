import * as React from "react";
import Text from "@casumo/cmp-text";
import { TContentProps } from "./Modal.types";

export function ModalStep1({ t }: TContentProps) {
  return <Text>{t?.marketing_closure_description}</Text>;
}
