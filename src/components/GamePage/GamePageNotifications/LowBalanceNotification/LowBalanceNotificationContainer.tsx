import * as React from "react";
import { useSelector } from "react-redux";
import { ButtonPrimary } from "@casumo/cmp-button";
import { CHANNELS } from "Models/cometd/cometd.constants";
import { playerIdSelector } from "Models/handshake";
import { TCurrencyCode } from "Src/constants";
import { useDepositMethods } from "Utils/hooks/useDepositMethods";
import { playerCurrencySelector } from "Models/player";
import cometd from "Models/cometd/cometd.service";
import { useTranslationsGql } from "Utils/hooks";
import { LowBalanceNotification } from "./LowBalanceNotification";
import { LOW_BALANCES_THRESHOLDS } from "./lowBalance.constants";

type TBalance = {
  amount: number;
  iso4217CurrencyCode: TCurrencyCode;
};

type TBalanceUpdatedMessage = {
  data: {
    walletBalanceUpdated?: {
      updatedBalance: {
        id: string;
        transationId: string;
        totalBalance: TBalance;
        realBalance: TBalance;
        bonusBalance: TBalance;
      };
    };
  };
};

export const LowBalanceNotificationContainer = () => {
  const playerId = useSelector(playerIdSelector);
  const currency = useSelector(playerCurrencySelector);
  const channel = `${CHANNELS.PLAYER}/${playerId}`;
  const [showing, setShowing] = React.useState(false);

  const onData = React.useCallback(
    (event: TBalanceUpdatedMessage) => {
      // show notification once per session
      if (showing) {
        return;
      }

      const isWalletUpdate = event.data.walletBalanceUpdated;
      const { totalBalance } = isWalletUpdate.updatedBalance;

      if (
        isWalletUpdate &&
        totalBalance.amount < LOW_BALANCES_THRESHOLDS[currency]
      ) {
        setShowing(true);
      }
    },
    [currency, showing]
  );

  const cleanup = React.useCallback(
    function cleanup() {
      cometd.unsubscribe(channel, onData);
    },
    [channel, onData]
  );

  React.useEffect(() => {
    cometd.subscribe(channel, onData);

    return cleanup;
  }, [channel, onData, cleanup]);

  const {
    hasQuickDepositMethods,
    navigateToCashier,
    launchQuickDeposit,
  } = useDepositMethods();

  const showDepositHandler = hasQuickDepositMethods
    ? launchQuickDeposit
    : navigateToCashier;

  const ctaSlug = "root:low-balance-notification-content:fields.cta";
  const { t, loading } = useTranslationsGql({ cta: ctaSlug });

  const cta = (
    <>
      {!loading && (
        <ButtonPrimary size="xs" onClick={showDepositHandler}>
          {t && t?.cta}
        </ButtonPrimary>
      )}
    </>
  );

  return showing ? (
    <LowBalanceNotification
      Cta={cta}
      currency={currency}
      showDepositHandler={showDepositHandler}
    />
  ) : null;
};
