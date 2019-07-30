// @flow
import * as React from "react";
import * as R from "ramda";
import {
  diffLimits,
  getSpecificKinds,
} from "Components/Compliance/DepositLimits/DepositLimitsSummary/utils";
import { DepositLimitsSummaryContainer } from "Components/Compliance/DepositLimits/DepositLimitsSummary";
import { DepositLimitsOverview } from "Components/Compliance/DepositLimits/DepositLimitsOverview";
import { DepositLimitsFormContainer } from "Components/Compliance/DepositLimits/DepositLimitsForm";
import {
  DepositLimitsConfirmationsContainer,
  type ConfirmationPage,
} from "Components/Compliance/DepositLimits/DepositLimitsConfirmations";
import type {
  AllLimits,
  AllLimitsOnlyValues,
  DepositKinds,
  DepositLimitPreadjust,
  LimitLock,
  ResponsibleGamblingTest,
} from "Models/playOkay/depositLimits";
import { hasRule } from "Models/playOkay/depositLimits";
import { ResponsibleGamblingTestContainer } from "../ResponsibleGamblingTest";
import "./styles.scss";

type LimitChange = {
  date: number,
  value: number,
};
type Props = {
  limits: AllLimits,
  preadjust: DepositLimitPreadjust,
  responsibleGamblingTest: ResponsibleGamblingTest,
  lock: ?LimitLock,
  undoable: ?boolean,
  remaining: AllLimitsOnlyValues,

  locale: string,
  t: {
    daily_short: string,
    daily: string,
    weekly_short: string,
    weekly: string,
    monthly_short: string,
    monthly: string,
    deposit_limits: string,
    pending_change: string,
    remove_all: string,
    remove_selected: string,
    summary_title: string,
    save_limits_button_conditions: string,
    save_limits_button: string,
    remaining_limit: string,
    daily_removed: string,
    weekly_removed: string,
    monthly_removed: string,
  },
  pendingLimitChanges: {
    daily?: LimitChange,
    weekly?: LimitChange,
    monthly?: LimitChange,
  },
  init: () => void,
  fetchTranslations: () => void,
  limitAdjust: AllLimits => void,
  sendResponsibleGamblingTest: boolean => Promise<any>,
};

type DepositLimitsRoute =
  | "overview"
  | "form"
  | "summary"
  | "responsibleGamblingTest"
  | "confirmations";

// eslint-disable-next-line sonarjs/cognitive-complexity
export function DepositLimitsView(props: Props) {
  React.useEffect(() => {
    props.init();
    props.fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [{ route, depositKind, limitChanges, pages }, navigate] = useRouting();

  if (!props.t || !props.limits || !props.remaining) {
    return "loading";
  }
  const newLimits = { ...props.limits, ...limitChanges };
  const limitsDiff = diffLimits({
    before: props.limits,
    after: newLimits,
  });
  const decreases = getSpecificKinds("decrease", limitsDiff);

  return {
    overview: (
      <DepositLimitsOverview
        t={props.t}
        locale={props.locale}
        limits={props.limits}
        pendingLimitChanges={props.pendingLimitChanges}
        remainingLimitValue={props.remaining}
        edit={x => navigate({ route: "form", depositKind: x })}
        add={() => navigate({ route: "form" })}
        removeAll={() => {
          navigate({
            route: "summary",
            limitChanges: { daily: null, weekly: null, monthly: null },
          });
        }}
      />
    ),
    form: (
      <DepositLimitsFormContainer
        t={props.t}
        lock={props.lock}
        locale={props.locale}
        responsibleGamblingTestRequired={hasRule(
          "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
          props.preadjust.rules
        )}
        responsibleGamblingTest={props.responsibleGamblingTest}
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
        t={props.t}
        locale={props.locale}
        responsibleGamblingTest={props.responsibleGamblingTest}
        preadjust={props.preadjust}
        currentLimits={props.limits}
        newLimits={newLimits}
        edit={x => navigate({ route: "form", depositKind: x })}
        confirmLimitsAdjust={() => {
          if (
            hasRule("RESPONSIBLE_GAMBLING_TEST_REQUIRED", props.preadjust.rules)
          ) {
            if (!R.isEmpty(decreases)) {
              // we are required to make all decreases instantly
              props.limitAdjust({
                ...props.limits,
                ...R.pick(decreases, newLimits),
              });
              navigate({
                route: "confirmations",
                pages: ["SAVED_RIGHT_AWAY", "RG_REQUIRED"],
              });
            } else {
              navigate({
                route: "confirmations",
                pages: ["RG_REQUIRED"],
              });
            }
          } else {
            props.limitAdjust({
              ...props.limits,
              ...limitChanges,
            });
            navigate({
              route: "confirmations",
              pages: R.isEmpty(decreases)
                ? ["BEING_REVIEWED"]
                : ["SAVED_RIGHT_AWAY", "BEING_REVIEWED"],
            });
          }
        }}
      />
    ),
    confirmations: (
      <DepositLimitsConfirmationsContainer
        pages={pages}
        decreases={R.pick(decreases, newLimits)}
        lastButtonCaption={
          R.last(pages) === ("RG_REQUIRED": ConfirmationPage)
            ? "button_answer_questions"
            : "button_back_to_limits"
        }
        lastButtonAction={() => {
          if (R.last(pages) === ("RG_REQUIRED": ConfirmationPage)) {
            navigate({ route: "responsibleGamblingTest" });
          } else {
            navigate({ route: "overview" });
          }
        }}
      />
    ),
    responsibleGamblingTest: (
      <ResponsibleGamblingTestContainer
        sendRGTestResult={async passed => {
          await props.sendResponsibleGamblingTest(passed);
          if (passed) {
            await props.limitAdjust({ ...props.limits, ...limitChanges });
          }
          navigate({
            route: "confirmations",
            pages: [passed ? "RG_SUCCESS" : "RG_FAIL"],
          });
        }}
      />
    ),
  }[route];
}

export function useRouting(initialRoute: DepositLimitsRoute = "overview") {
  const [routeI, setRoute] = React.useState<DepositLimitsRoute>(initialRoute);
  const [depositKindI, setDepositKind] = React.useState<DepositKinds>("daily");
  const [limitChangesI, setChanges] = React.useState();
  const [pagesI, setPages] = React.useState<ConfirmationPage[]>([]);

  function navigate({
    route,
    depositKind = "daily",
    limitChanges,
    pages,
  }: {
    route: DepositLimitsRoute,
    depositKind?: DepositKinds,
    limitChanges?: AllLimitsOnlyValues,
    pages?: ConfirmationPage[],
  }) {
    setRoute(route);
    setDepositKind(depositKind);
    limitChanges && setChanges(limitChanges);
    pages && setPages(pages);
  }

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