// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { Panel } from "Components/Panel";
import Icon from "./icon.svg";

type Props = {
  balance: number,
  bonus: number,
  currency: string,
  firstDeposit: boolean,
  translations: any,
};

const WalletCard = React.memo<Props>((props: Props) => {
  const { translations, currency, firstDeposit, balance, bonus } = props;

  return (
    <Panel roundedTop roundedBottom>
      <Icon className="u-width--3xlg u-margin-y--md u-margin-x" />
      {firstDeposit ? (
        <>
          <Text
            className="t-color-grey-90 u-font-weight-bold u-margin-bottom--none"
            size="xlg"
          >
            {translations.firstDeposit || "Make your first deposit"}
          </Text>
          <Text className="t-color-grey-50 u-font-weight-bold u-margin-top">
            {translations.firstDepositDesc ||
              "Once you make your first deposit you'll be able to claim your welcome bonus."}
          </Text>
        </>
      ) : (
        <>
          <Text className="t-color-grey-50 u-font-weight-bold u-margin-bottom">
            {translations.balance || "Your balance"}
          </Text>
          <Text
            className="t-color-grey-90 u-font-weight-bold u-margin-bottom--none"
            size="xlg"
          >
            {currency || "€"}
            {balance || "0,00"}
          </Text>
          <Text className="t-color-grey-50 u-font-weight-bold u-margin-top">
            + {currency || "€"}
            {bonus || "0,00"}
          </Text>
        </>
      )}

      <ButtonPrimary size="md" className="u-padding-x--3xlg u-margin-right">
        {translations.deposit || "Deposit"}
      </ButtonPrimary>

      {!firstDeposit && (
        <ButtonPrimary
          size="md"
          className="u-padding-x--3xlg"
          isDisabled={!balance}
        >
          {translations.withdraw || "Withdraw"}
        </ButtonPrimary>
      )}
    </Panel>
  );
});

export default WalletCard;
