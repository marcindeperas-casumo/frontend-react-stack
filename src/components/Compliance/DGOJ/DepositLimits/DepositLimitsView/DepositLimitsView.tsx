import Flex from "@casumo/cmp-flex";
import * as React from "react";
import * as R from "ramda";
import { sendResponsibleGamblingTest } from "Api/api.depositLimits";
import { diffLimits, getSpecificKinds } from "Models/playOkay/depositLimits";
import type {
  AllLimits,
  AllLimitsOnlyValues,
  DepositKinds,
  DepositLimitPreadjust,
  LimitLock,
  DepositLimitsAdjustment,
} from "Models/playOkay/depositLimits";
import bridge from "Src/DurandalReactBridge";
import {
  REACT_APP_EVENT_OLD_PLAY_OKAY_CLOSED,
  TCurrencyCode,
} from "Src/constants";
import { DepositLimitsSummaryContainer } from "../DepositLimitsSummary";
import { DepositLimitsOverviewContainer } from "../DepositLimitsOverview";
import { DepositLimitsCancelAdjustment } from "../DepositLimitsCancelAdjustment";
import { DepositLimitsFormContainer } from "../DepositLimitsForm";
import { DepositLimitsConfirmationsContainer } from "../DepositLimitsConfirmations";
import type { ConfirmationPage } from "../DepositLimitsConfirmations";
import { ResponsibleGamblingTestContainer } from "../ResponsibleGamblingTest";
import { GoBack } from "./GoBack";
import { adjustLimitsAndNavigate } from "./adjustLimitsAndNavigate";
import "./styles.scss";

type Props = {
  limits: AllLimits;
  preadjust: DepositLimitPreadjust;
  lock: LimitLock | null;
  undoable: boolean | null;
  remaining: AllLimitsOnlyValues;
  pendingLimitChanges?: DepositLimitsAdjustment;
  currency: TCurrencyCode;
  locale: string;
  t: {
    button_no: string;
    button_yes: string;
    cancel_adjustment_content: string;
    cancel_adjustment_title: string;
    cancel_pending_increases: string;
    cancel_pending_remove_all: string;
    daily_removed: string;
    daily_short: string;
    daily: string;
    deposit_limits: string;
    monthly_removed: string;
    monthly_short: string;
    monthly: string;
    pending_increase: string;
    pending_remove_all: string;
    remaining_limit: string;
    remove_all: string;
    add: string;
    remove_selected: string;
    save_limits_button_conditions: string;
    save_limits_button: string;
    summary_title: string;
    weekly_removed: string;
    weekly_short: string;
    weekly: string;
    suspend_account: string;
  };
  init: () => void;
  fetchTranslations: () => void;
  limitAdjust: (allLimits: AllLimits) => void;
  limitCancel: () => void;
};

type DepositLimitsRoute =
  | "overview"
  | "form"
  | "summary"
  | "responsibleGamblingTest"
  | "confirmations"
  | "cancelAdjustment"
  | "suspendAccount";

// eslint-disable-next-line sonarjs/cognitive-complexity
export function DepositLimitsView(props: Props) {
  React.useEffect(() => {
    props.fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    // it handles suspendAccount view. On site there's old view for that
    // when it's shown we are rendering null from this component, and
    // when event comes we are showing back overview
    const goBackToOverview = () => navigate({ route: "overview" });

    bridge.on(REACT_APP_EVENT_OLD_PLAY_OKAY_CLOSED, goBackToOverview);

    return function cleanup() {
      bridge.off(REACT_APP_EVENT_OLD_PLAY_OKAY_CLOSED, goBackToOverview);
    };
  });
  const [{ route, depositKind, limitChanges, pages }, navigate] = useRouting();
  React.useEffect(() => {
    if (route === "overview") {
      props.init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  if (!props.t || !props.limits || !props.preadjust) {
    return "loading";
  }
  const newLimits = { ...props.limits, ...limitChanges };
  const limitsDiff = diffLimits({
    before: props.limits,
    after: newLimits,
  });
  const decreases = getSpecificKinds("decrease", limitsDiff);

  const routes = {
    overview: (
      <DepositLimitsOverviewContainer
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ button_no: string; button_yes: string; can... Remove this comment to see the full error message
        t={props.t}
        limitCancel={() => navigate({ route: "cancelAdjustment" })}
        edit={x => navigate({ route: "form", depositKind: x })}
        add={() => navigate({ route: "form" })}
        removeAll={() =>
          navigate({
            route: "summary",
            limitChanges: { daily: null, weekly: null, monthly: null },
          })
        }
        showOldSuspendAccountView={() => navigate({ route: "suspendAccount" })}
      />
    ),
    form: (
      <DepositLimitsFormContainer
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ button_no: string; button_yes: string; can... Remove this comment to see the full error message
        t={props.t}
        lock={props.lock}
        pendingLimitChanges={props.pendingLimitChanges}
        currency={props.currency}
        locale={props.locale}
        responsibleGamblingTestCanBeTaken={
          props.preadjust.responsibleGamblingTestCanBeTaken
        }
        increasesOrRevocationsBlocked={
          props.preadjust.increasesOrRevocationsBlocked
        }
        limitChanges={limitChanges}
        limits={props.limits}
        initiallyVisible={depositKind}
        applyLimitsChanges={changes => {
          navigate({ route: "summary", limitChanges: changes });
        }}
      />
    ),
    summary: (
      <DepositLimitsSummaryContainer
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ t: { button_no: string; button_yes: string... Remove this comment to see the full error message
        t={props.t}
        currency={props.currency}
        locale={props.locale}
        preadjust={props.preadjust}
        currentLimits={props.limits}
        newLimits={newLimits}
        edit={x => navigate({ route: "form", depositKind: x })}
        confirmLimitsAdjust={() =>
          adjustLimitsAndNavigate({
            limitsDiff,
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string[]' is not assignable to type 'Deposit... Remove this comment to see the full error message
            decreases,
            rules: props.preadjust.rules,
            navigate,
            newLimits,
            limitAdjust: (x: AllLimits) => {
              if (R.has("currency", x)) {
                props.limitAdjust(x);
              } else {
                props.limitAdjust({
                  currency: props.currency,
                  // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
                  ...x,
                });
              }
            },
          })
        }
      />
    ),
    confirmations: (
      <DepositLimitsConfirmationsContainer
        pages={pages}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ pages: ConfirmationPage[]; decreases: Pick... Remove this comment to see the full error message
        decreases={R.pick(decreases, newLimits)}
        lastButtonCaption={
          R.last(pages) === "RG_REQUIRED"
            ? "button_answer_questions"
            : "button_back_to_limits"
        }
        lastButtonAction={() => {
          if (R.last(pages) === "RG_REQUIRED") {
            navigate({ route: "responsibleGamblingTest" });
          } else {
            navigate({ route: "overview" });
          }
        }}
      />
    ),
    responsibleGamblingTest: (
      <ResponsibleGamblingTestContainer
        sendRGTestResult={passed => {
          sendResponsibleGamblingTest(passed).then(() => {
            if (passed) {
              props.limitAdjust({ ...props.limits, ...limitChanges });
            } else {
              props.limitAdjust({
                ...props.limits,
                ...R.pick(decreases, newLimits),
              });
            }
            navigate({
              route: "confirmations",
              pages: [passed ? "RG_SUCCESS" : "RG_FAIL"],
            });
          });
        }}
      />
    ),
    cancelAdjustment: (
      <DepositLimitsCancelAdjustment
        t={props.t}
        handleButtonYes={() => {
          props.limitCancel();
          navigate({ route: "overview" });
        }}
        handleButtonNo={() => navigate({ route: "overview" })}
      />
    ),
  };

  if (route === "suspendAccount") {
    // it uses view from old codebase
    return null;
  }

  return (
    <Flex direction="vertical" spacing="none">
      {route !== "overview" && (
        <GoBack t={props.t} goBack={() => navigate({ route: "overview" })} />
      )}
      {routes[route]}
    </Flex>
  );
}

export type Navigate = (o: {
  route: DepositLimitsRoute;
  depositKind?: DepositKinds;
  limitChanges?: AllLimitsOnlyValues;
  pages?: ConfirmationPage[];
}) => void;
export function useRouting(initialRoute: DepositLimitsRoute = "overview"): [
  {
    route: DepositLimitsRoute;
    depositKind: DepositKinds;
    limitChanges: AllLimitsOnlyValues | undefined;
    pages: ConfirmationPage[];
  },
  Navigate
] {
  const [routeI, setRoute] = React.useState<DepositLimitsRoute>(initialRoute);
  const [depositKindI, setDepositKind] = React.useState<DepositKinds>("daily");
  const [limitChangesI, setChanges] = React.useState<
    AllLimitsOnlyValues | undefined
  >();
  const [pagesI, setPages] = React.useState<ConfirmationPage[]>([]);

  const navigate: Navigate = ({
    route,
    depositKind = "daily",
    limitChanges,
    pages,
  }) => {
    setRoute(route);
    setDepositKind(depositKind);
    if (limitChanges) {
      setChanges(limitChanges);
    }
    if (pages) {
      setPages(pages);
    }
  };

  return [
    {
      route: routeI,
      depositKind: depositKindI,
      limitChanges: limitChangesI,
      pages: pagesI,
    },
    navigate,
  ];
}
