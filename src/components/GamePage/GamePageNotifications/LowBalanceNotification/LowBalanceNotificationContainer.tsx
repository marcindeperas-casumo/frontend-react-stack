import * as React from "react";
import { useSelector } from "react-redux";
import { ButtonPrimary } from "@casumo/cmp-button";
import { avgBetApi } from "Models/avgBet";
import { CHANNELS } from "Models/cometd/cometd.constants";
import { playerIdSelector } from "Models/handshake";
import { playerCurrencySelector } from "Models/player";
import { TCurrencyCode, EVENTS } from "Src/constants";
import { useDepositMethods } from "Utils/hooks/useDepositMethods";
import cometd from "Models/cometd/cometd.service";
import { useTranslationsGql } from "Utils/hooks";
import tracker from "Services/tracker";
import { CheckboxSquare } from "Components/Checkbox/CheckboxSquare";
import { LowBalanceNotification } from "./LowBalanceNotification";
import {
  LOCAL_STORAGE_KEY,
  SPIN_AMOUNT_THRESHOLDS,
} from "./lowBalance.constants";

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

function disableNotification() {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, "1");
}

function isNotificationBlocked() {
  return Boolean(window.localStorage.getItem(LOCAL_STORAGE_KEY));
}

const CTA = ({ loading, t, showDepositHandler }) => {
  return (
    <>
      {!loading && (
        <ButtonPrimary size="md" onClick={showDepositHandler}>
          {t && t?.cta}
        </ButtonPrimary>
      )}
    </>
  );
};

const Footer = ({ closeAndRemember, t }) => {
  return (
    <div className="flex items-center my-md" onClick={closeAndRemember}>
      <CheckboxSquare checked={false} onChange={() => {}} size="sm" />
      <span className="ml-sm u-font-sm text-black">
        {t.dontShowAgain || "Don't show me again"}
      </span>
    </div>
  );
};

export const LowBalanceNotificationContainer = () => {
  const playerId = useSelector(playerIdSelector);
  const currency = useSelector(playerCurrencySelector);
  const channel = `${CHANNELS.PLAYER}/${playerId}`;
  const [showing, setShowing] = React.useState(false);
  const [totalBalance, setTotalBalance] = React.useState<number>(undefined);

  const {
    data: avgBetData,
    isFetching,
    refetch,
  } = avgBetApi.useGetAverageBetQuery();

  const onData = React.useCallback(
    (event: TBalanceUpdatedMessage) => {
      // show notification once per session
      if (showing) {
        return;
      }

      const isWalletUpdate = event.data.walletBalanceUpdated;
      if (!isWalletUpdate || isFetching) {
        return;
      }

      refetch();

      const { totalBalance: tb } = isWalletUpdate.updatedBalance;
      setTotalBalance(tb.amount);
    },
    [showing, refetch, isFetching]
  );

  const cleanup = React.useCallback(
    function cleanup() {
      cometd.unsubscribe(channel, onData);
    },
    [channel, onData]
  );

  React.useEffect(() => {
    if (isNotificationBlocked()) {
      return;
    }

    const expectedBet = avgBetData?.averageBet?.amount;
    const totaBalanceFetched = typeof totalBalance !== "undefined";
    if (isFetching || !expectedBet || !totaBalanceFetched) {
      return;
    }

    if (totalBalance < expectedBet * SPIN_AMOUNT_THRESHOLDS) {
      setShowing(true);
    }
  }, [isFetching, avgBetData?.averageBet?.amount, totalBalance]);

  React.useEffect(() => {
    cometd.subscribe(channel, onData);

    return cleanup;
  }, [channel, onData, cleanup]);

  const { hasQuickDepositMethods, navigateToCashier, launchQuickDeposit } =
    useDepositMethods();

  const navigateToCashierTracked = (ev: React.SyntheticEvent) => {
    ev.stopPropagation();
    tracker.track(EVENTS.MIXPANEL_LOW_BALANCE_NOTIFICATION_CTA_DEPOSIT, {});
    tracker.track(EVENTS.MIXPANEL_EXIT_GAME_STEP_STARTED, {});
    navigateToCashier();
  };

  const launchQuickDepositTracked = (ev: React.SyntheticEvent) => {
    ev.stopPropagation();
    tracker.track(EVENTS.MIXPANEL_LOW_BALANCE_NOTIFICATION_CTA_DEPOSIT, {});
    launchQuickDeposit();
  };

  const showDepositHandler = hasQuickDepositMethods
    ? launchQuickDepositTracked
    : navigateToCashierTracked;

  const closeAndRemember = React.useCallback(
    (ev: React.SyntheticEvent) => {
      ev.stopPropagation();
      setShowing(false);
      disableNotification();
    },
    [setShowing]
  );

  const ctaSlug = "root:low-balance-notification-content:fields.cta";
  const dontShowAgainSlug =
    "root:low-balance-notification-content:fields.dont_show_again";
  const { t, loading } = useTranslationsGql({
    cta: ctaSlug,
    dontShowAgain: dontShowAgainSlug,
  });

  return showing && !loading ? (
    <LowBalanceNotification
      currency={currency}
      showDepositHandler={showDepositHandler}
      Cta={
        <CTA loading={loading} t={t} showDepositHandler={showDepositHandler} />
      }
      footer={<Footer closeAndRemember={closeAndRemember} t={t} />}
    />
  ) : null;
};
