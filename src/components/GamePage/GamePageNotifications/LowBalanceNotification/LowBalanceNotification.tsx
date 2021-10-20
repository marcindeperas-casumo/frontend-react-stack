import * as React from "react";
import { CurrencyIcon } from "Components/CurrencyIcon/CurrencyIcon";
import { TCurrencyCode } from "Src/constants";
import { GenericNotification } from "../GenericInGameNotifications/GenericNotification";
import "./lowBalanceNotification.scss";

type TProps = {
  Cta: React.ReactElement;
  currency: TCurrencyCode;
  showDepositHandler: () => void;
};

export const LowBalanceNotification = ({
  Cta,
  currency,
  showDepositHandler,
}: TProps) => {
  const depositIcon = (
    <div className="u-cursor--pointer" onClick={showDepositHandler}>
      <CurrencyIcon
        selected={true}
        currency={currency || "EUR"}
        classList="c-low-balance-icon u-display--block t-border-r--circle text-purple-60"
      />
    </div>
  );

  return (
    <GenericNotification
      Cta={Cta}
      translationSlug="root:low-balance-notification-content:fields.content"
      onClick={showDepositHandler}
      Icon={depositIcon}
    />
  );
};
