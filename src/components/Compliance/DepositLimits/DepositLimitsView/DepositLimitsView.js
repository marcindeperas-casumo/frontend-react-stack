// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import { sendResponsibleGamblingTest } from "Api/api.depositLimits";
import { DepositLimitsSuspendAccountContainer } from "Components/Compliance/DepositLimits/DepositLimitsSuspendAccount";
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
  DepositLimitsAdjustement,
} from "Models/playOkay/depositLimits";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_OLD_PLAY_OKAY_CLOSED } from "Src/constants";
import { hasRule } from "Models/playOkay/depositLimits";
import { ResponsibleGamblingTestContainer } from "../ResponsibleGamblingTest";
import { GoBack } from "./GoBack";
import { adjustLimitsAndNavigate } from "./adjustLimitsAndNavigate";
import "./styles.scss";

type Props = {
  limits: AllLimits,
  preadjust: DepositLimitPreadjust,
  responsibleGamblingTest: ResponsibleGamblingTest,
  lock: ?LimitLock,
  undoable: ?boolean,
  remaining: AllLimitsOnlyValues,
  pendingLimitChanges?: DepositLimitsAdjustement,

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
    pending_change_known_deadline: string,
    remove_all: string,
    remove_selected: string,
    summary_title: string,
    save_limits_button_conditions: string,
    save_limits_button: string,
    remaining_limit: string,
    daily_removed: string,
    weekly_removed: string,
    monthly_removed: string,
    cancel: string,
  },
  init: () => void,
  fetchTranslations: () => void,
  limitAdjust: AllLimits => void,
  limitCancel: DepositKinds => void,
};

type DepositLimitsRoute =
  | "overview"
  | "form"
  | "summary"
  | "responsibleGamblingTest"
  | "confirmations"
  | "suspendAccount";

// eslint-disable-next-line sonarjs/cognitive-complexity
export function DepositLimitsView(props: Props) {
  React.useEffect(() => {
    props.init();
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

  if (!props.t || !props.limits || !props.remaining || !props.preadjust) {
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
      <DepositLimitsOverview
        t={props.t}
        locale={props.locale}
        limits={props.limits}
        pendingLimitChanges={props.pendingLimitChanges}
        remainingLimitValue={props.remaining}
        limitCancel={props.limitCancel}
        edit={x => navigate({ route: "form", depositKind: x })}
        add={() => navigate({ route: "form" })}
        removeAll={() => {
          if (props.lock) {
            return; // can't remove limits during lock
          }
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
        confirmLimitsAdjust={() =>
          adjustLimitsAndNavigate({
            limitsDiff,
            decreases,
            rules: props.preadjust.rules,
            navigate,
            newLimits,
            limitAdjust: props.limitAdjust,
          })
        }
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
  };

  if (route === "suspendAccount") {
    // it uses view from old codebase
    return null;
  }

  return (
    <Flex direction="vertical" spacing="none" className="u-margin-bottom--3xlg">
      {route !== "overview" && (
        <GoBack t={props.t} goBack={() => navigate({ route: "overview" })} />
      )}
      {routes[route]}
      {route === "overview" && (
        <DepositLimitsSuspendAccountContainer
          showOldSuspendAccountView={() =>
            navigate({ route: "suspendAccount" })
          }
        />
      )}
    </Flex>
  );
}

export type Navigate = ({
  route: DepositLimitsRoute,
  depositKind?: DepositKinds,
  limitChanges?: AllLimitsOnlyValues,
  pages?: ConfirmationPage[],
}) => void;
export function useRouting(initialRoute: DepositLimitsRoute = "overview") {
  const [routeI, setRoute] = React.useState<DepositLimitsRoute>(initialRoute);
  const [depositKindI, setDepositKind] = React.useState<DepositKinds>("daily");
  const [limitChangesI, setChanges] = React.useState();
  const [pagesI, setPages] = React.useState<ConfirmationPage[]>([]);

  const navigate: Navigate = ({
    route,
    depositKind = "daily",
    limitChanges,
    pages,
  }) => {
    setRoute(route);
    setDepositKind(depositKind);
    limitChanges && setChanges(limitChanges);
    pages && setPages(pages);
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
