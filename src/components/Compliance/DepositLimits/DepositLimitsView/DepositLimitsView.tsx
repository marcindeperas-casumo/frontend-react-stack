import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import { sendResponsibleGamblingTest } from "Api/api.depositLimits";
import { diffLimits, getSpecificKinds } from "Models/playOkay/depositLimits";
import { DepositLimitsSummaryContainer } from "Components/Compliance/DepositLimits/DepositLimitsSummary";
import { DepositLimitsOverviewContainer } from "Components/Compliance/DepositLimits/DepositLimitsOverview";
import { DepositLimitsCancelAdjustment } from "Components/Compliance/DepositLimits/DepositLimitsCancelAdjustment";
import { DepositLimitsFormContainer } from "Components/Compliance/DepositLimits/DepositLimitsForm";
import { DepositLimitsConfirmationsContainer } from "Components/Compliance/DepositLimits/DepositLimitsConfirmations";
import type { ConfirmationPage } from "Components/Compliance/DepositLimits/DepositLimitsConfirmations";
import type {
  AllLimits,
  AllLimitsOnlyValues,
  DepositKinds,
  DepositLimitPreadjust,
  LimitLock,
  DepositLimitsAdjustment,
} from "Models/playOkay/depositLimits";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_OLD_PLAY_OKAY_CLOSED } from "Src/constants";
import { ResponsibleGamblingTestContainer } from "../ResponsibleGamblingTest";
import { GoBack } from "./GoBack";
import { adjustLimitsAndNavigate } from "./adjustLimitsAndNavigate";
import "./styles.scss";

type Props = {
  limits: AllLimits,
  preadjust: DepositLimitPreadjust,
  lock: ?LimitLock,
  undoable: ?boolean,
  remaining: AllLimitsOnlyValues,
  pendingLimitChanges?: DepositLimitsAdjustment,

  currency: string,
  locale: string,
  t: {
    button_no: string,
    button_yes: string,
    cancel_adjustment_content: string,
    cancel_adjustment_title: string,
    cancel_pending_increases: string,
    cancel_pending_remove_all: string,
    daily_removed: string,
    daily_short: string,
    daily: string,
    deposit_limits: string,
    monthly_removed: string,
    monthly_short: string,
    monthly: string,
    pending_increase: string,
    pending_remove_all: string,
    remaining_limit: string,
    remove_all: string,
    add: string,
    remove_selected: string,
    save_limits_button_conditions: string,
    save_limits_button: string,
    summary_title: string,
    weekly_removed: string,
    weekly_short: string,
    weekly: string,
    suspend_account: string,
  },
  init: () => void,
  fetchTranslations: () => void,
  limitAdjust: AllLimits => void,
  limitCancel: () => void,
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
    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
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
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        limitCancel={() => navigate({ route: "cancelAdjustment" })}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(x: any) => any' is not assignable to type '... Remove this comment to see the full error message
        edit={x => navigate({ route: "form", depositKind: x })}
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        add={() => navigate({ route: "form" })}
        removeAll={() =>
          // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
          navigate({
            route: "summary",
            limitChanges: { daily: null, weekly: null, monthly: null },
          })
        }
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        showOldSuspendAccountView={() => navigate({ route: "suspendAccount" })}
      />
    ),
    form: (
      <DepositLimitsFormContainer
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ button_no: string; button_yes: string; can... Remove this comment to see the full error message
        t={props.t}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'LimitLock' is not assignable to type 'never'... Remove this comment to see the full error message
        lock={props.lock}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'DepositLimitsAdjustment' is not assignable t... Remove this comment to see the full error message
        pendingLimitChanges={props.pendingLimitChanges}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
        currency={props.currency}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
        locale={props.locale}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
        responsibleGamblingTestCanBeTaken={
          props.preadjust.responsibleGamblingTestCanBeTaken
        }
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
        increasesOrRevocationsBlocked={
          props.preadjust.increasesOrRevocationsBlocked
        }
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'AllLimitsOnlyValues' is not assignable to ty... Remove this comment to see the full error message
        limitChanges={limitChanges}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'AllLimits' is not assignable to type 'never'... Remove this comment to see the full error message
        limits={props.limits}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
        initiallyVisible={depositKind}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(changes: any) => void' is not assignable to... Remove this comment to see the full error message
        applyLimitsChanges={changes => {
          // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
          navigate({ route: "summary", limitChanges: changes });
        }}
      />
    ),
    summary: (
      <DepositLimitsSummaryContainer
        t={props.t}
        currency={props.currency}
        locale={props.locale}
        preadjust={props.preadjust}
        currentLimits={props.limits}
        newLimits={newLimits}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(x: any) => any' is not assignable to type '... Remove this comment to see the full error message
        edit={x => navigate({ route: "form", depositKind: x })}
        confirmLimitsAdjust={() =>
          // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
          adjustLimitsAndNavigate({
            limitsDiff,
            decreases,
            rules: props.preadjust.rules,
            navigate,
            newLimits,
            limitAdjust: (x: AllLimits) => {
              if (R.has("currency", x)) {
                // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
                props.limitAdjust(x);
              } else {
                // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
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
          R.last(pages) === ("RG_REQUIRED": ConfirmationPage)
            ? "button_answer_questions"
            : "button_back_to_limits"
        }
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'lastButtonAction'.
        lastButtonAction={() => {
          // @ts-expect-error ts-migrate(2693) FIXME: 'ConfirmationPage' only refers to a type, but is b... Remove this comment to see the full error message
          if (R.last(pages) === ("RG_REQUIRED": ConfirmationPage)) {
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            navigate({ route: "responsibleGamblingTest" });
          } else {
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            navigate({ route: "overview" });
          }
        }}
      />
    ),
    // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
    responsibleGamblingTest: (
      <ResponsibleGamblingTestContainer
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(passed: any) => void' is not assignable to ... Remove this comment to see the full error message
        sendRGTestResult={passed => {
          sendResponsibleGamblingTest(passed).then(() => {
            if (passed) {
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'props'.
              props.limitAdjust({ ...props.limits, ...limitChanges });
            } else {
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'props'.
              props.limitAdjust({
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'props'.
                ...props.limits,
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'decreases'.
                ...R.pick(decreases, newLimits),
              });
            }
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'navigate'.
            navigate({
              route: "confirmations",
              pages: [passed ? "RG_SUCCESS" : "RG_FAIL"],
            });
          });
        }}
      />
    ),
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'cancelAdjustment'.
    cancelAdjustment: (
      <DepositLimitsCancelAdjustment
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'props'.
        t={props.t}
        handleButtonYes={() => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'props'.
          props.limitCancel();
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'navigate'.
          navigate({ route: "overview" });
        }}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'navigate'.
        handleButtonNo={() => navigate({ route: "overview" })}
      />
    ),
  };

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'route'.
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

  // @ts-expect-error ts-migrate(2741) FIXME: Property 'route' is missing in type '({ route, dep... Remove this comment to see the full error message
  const navigate: Navigate = ({
    route,
    depositKind = "daily",
    limitChanges,
    pages,
  }) => {
    setRoute(route);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
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
