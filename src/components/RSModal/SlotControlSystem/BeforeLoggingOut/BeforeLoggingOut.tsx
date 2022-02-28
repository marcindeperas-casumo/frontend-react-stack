import * as React from "react";
import { SessionDetailsForLogout } from "Components/Compliance/SlotControlSystem/SessionDetails";
import { TJurisdiction, TLocale } from "Src/constants";
import { TGetSummaryResponse } from "Models/loginSession";
import { ModalSkin } from "../ModalSkin";

export type TContentType = {
  session_details_header: string;
  balance: string;
  money_wagered: string;
  money_won: string;
  money_left: string;
  play_started: string;
  play_ended: string;
  last_status_alert: string;
  logout_button_label: string;
  logout_text: string;
  logout_modal_title: string;
};

type TProps = {
  summary: TGetSummaryResponse;
  jurisdiction: TJurisdiction;
  isFetching?: boolean;
  locale: TLocale;
  t: TContentType;
  acceptModal: () => void;
  dismissModal: () => void;
  closeModal: () => void;
};

export function BeforeLoggingOut({
  summary,
  locale,
  jurisdiction,
  isFetching = false,
  t,
  acceptModal,
  dismissModal,
}: TProps) {
  const tForModalSkin = {
    modal_title: t?.logout_modal_title || "",
  };
  const isDGOJ = jurisdiction === "DGOJ";

  React.useEffect(() => {
    if (!isDGOJ) {
      acceptModal();
    }
  }, [isDGOJ]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isDGOJ || isFetching) {
    return null;
  }

  return (
    <ModalSkin
      t={tForModalSkin}
      closeAction={acceptModal}
      dismissModal={dismissModal}
    >
      <SessionDetailsForLogout
        t={t}
        locale={locale}
        onClickButton={acceptModal}
        currency={summary.currency}
        loginSessionSummary={
          "loginSessionSummary" in summary ? summary.loginSessionSummary : null
        }
        slotSessionSummary={
          "slotSessionSummary" in summary ? summary.slotSessionSummary : null
        }
      />
    </ModalSkin>
  );
}
