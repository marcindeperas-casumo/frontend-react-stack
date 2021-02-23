// @flow
import * as React from "react";
import { ModalHeader } from "./RSModalHeader";
import { ModalContentLoading } from "./RSModalContent";

export function ModalLoadingState() {
  return (
    <>
      <ModalHeader showCloseButton={false} showBackButton={false} />
      <ModalContentLoading />
    </>
  );
}
