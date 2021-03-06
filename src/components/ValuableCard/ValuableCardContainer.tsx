import React from "react";
import { useDispatch } from "react-redux";
import { useJurisdiction, usePlayerWarmUpDetails } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";
import { showModal } from "Models/modal";
import { ValuableCard } from "./ValuableCard";
import type { Props as ValuableProps } from "./ValuableCard";

export const ValuableCardContainer = (props: ValuableProps) => {
  return withWarmupPopup<ValuableProps>(ValuableCard, props, "onCardClick");
};

export function withWarmupPopup<TProps>(
  Component: typeof React.Component,
  props: TProps,
  onClickProp: string,
  onMoreInfoProp?: string
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isDGOJ } = useJurisdiction();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { loading, details, fetchDetails } = usePlayerWarmUpDetails();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (isDGOJ) {
      fetchDetails();
    }
  }, [fetchDetails, isDGOJ]);

  if (!isDGOJ) {
    return <Component {...props} />;
  }

  if (loading) {
    return null;
  }

  const showWarmUpModal = () =>
    dispatch(
      showModal(REACT_APP_MODAL.ID.ACCOUNT_WARM_UP, {
        input: {
          inWarmupPhase: details.inWarmupPhase,
          verified: details.verified,
          warmupTimeEnd: details.warmupTimeEnd,
        },
      })
    );

  const shouldShowWarmUpPopup = details.inWarmupPhase || !details.verified;

  const onCardClick = shouldShowWarmUpPopup
    ? showWarmUpModal
    : props[onClickProp];

  const onMoreInfoClick = shouldShowWarmUpPopup
    ? showWarmUpModal
    : props[onMoreInfoProp];

  const onMoreInfoClickHandler =
    typeof onMoreInfoProp !== "undefined"
      ? { [onMoreInfoProp]: onMoreInfoClick }
      : {};

  return (
    <Component
      {...{
        ...props,
        ...onMoreInfoClickHandler,
        [onClickProp]: onCardClick,
      }}
    />
  );
}
