import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";
import { TLoginSessionSummary, TSlotSessionSummary } from "Models/loginSession";
import { TCurrencyCode } from "Src/constants";
import { SessionDetailsBody } from "./SessionDetailsBody";
import { LoginSessionDetailsSection } from "./LoginSessionDetailsSection";

type Props = {
  t:
    | {
        session_details_header: string;
        money_wagered: string;
        money_won: string;
        money_left: string;
        play_started: string;
        play_ended: string;
        logout_button_label: string;
        logout_text: string;
      }
    | undefined;
  onClickButton: () => void;
  loginSessionSummary: TLoginSessionSummary | null;
  slotSessionSummary: TSlotSessionSummary | null;
  locale: string;
  currency: TCurrencyCode;
};

export function SessionDetailsForLogout({
  t,
  onClickButton,
  slotSessionSummary,
  loginSessionSummary,
  locale,
  currency,
}: Props) {
  return (
    <Flex direction="vertical">
      <div className="u-padding--sm bg-grey-0" />
      {loginSessionSummary && (
        <LoginSessionDetailsSection loginSessionSummary={loginSessionSummary} />
      )}
      {slotSessionSummary && (
        <>
          <div className="u-padding--sm u-margin-top--lg bg-grey-0" />
          <Text className="text-grey-50 u-padding--md u-padding-bottom--lg">
            {t?.logout_text}
          </Text>
          <SessionDetailsBody
            t={t}
            locale={locale}
            currency={currency}
            playStartedTime={slotSessionSummary.startedTime}
            playEndedTime={slotSessionSummary.endedTime}
            moneyWon={slotSessionSummary.totalWins}
            moneyLeft={slotSessionSummary.remainingBalance}
            moneyWagered={slotSessionSummary.totalBets}
          />
        </>
      )}

      <ButtonPrimary
        size="sm"
        variant="primary"
        className="u-margin--md"
        onClick={onClickButton}
      >
        {t?.logout_button_label || null}
      </ButtonPrimary>
    </Flex>
  );
}
