import * as React from "react";
import { ModalContentComponent } from "Components/RSModal";
import { useLocale, useJurisdiction } from "Utils/hooks";
import { useGetSummaryQuery as useGetLoginSessionSummaryQuery } from "Models/loginSession";
import { BeforeLoggingOut, TContentType } from "./BeforeLoggingOut";

export function BeforeLoggingOutContainer(
  props: ModalContentComponent<TContentType>
) {
  const { data, isFetching } = useGetLoginSessionSummaryQuery();
  const { jurisdiction } = useJurisdiction();
  const locale = useLocale();

  return (
    <BeforeLoggingOut
      t={props.t}
      locale={locale}
      summary={data}
      jurisdiction={jurisdiction}
      isFetching={isFetching}
      acceptModal={props.acceptModal}
      dismissModal={props.dismissModal}
      closeModal={props.closeModal}
    />
  );
}
