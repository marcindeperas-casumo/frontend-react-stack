// @flow
import React from "react";
import { DateTime } from "luxon";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";
import {
  type ValuableType,
  type ValuableState,
  type Game,
  type ConsumeValuableType,
  VALUABLE_STATES,
} from "Models/valuables";
import "./ValuableDetails.scss";
import { ErrorMessage } from "Components/ErrorMessage";
import { isFreeSpinsValuable } from "Components/ValuableCard/ValuableCard.utils";
import { ValuableDetailsHeaderBackground } from "./ValuableDetailsHeaderBackground";
import { ValuableDetailsCard } from "./ValuableDetailsCard";
import { ValuableDetailsBody } from "./ValuableDetailsBody";
import { ValuableDetailsActionButton as ActionButton } from "./ValuableDetailsActionButton";
import { ValuableDetailsModal } from "./ValuableDetailsModal";

type Props = {
  /** Should this view be displayed? */
  isOpen: boolean,
  /** Close button callback */
  onClose: () => void,
  /** Unique id of the valuable */
  id: string,
  /** Title of the valuable */
  title: string,
  /** Valuable type of the valuable */
  valuableType: ValuableType,
  /** currency of the player */
  currency: string,
  /** The coin value of each spin. Applies when valuable is type spins */
  coinValue?: number,
  /** The game on which the spins can be used on. Applies when valuable is type spins */
  game?: Game,
  /** Market of the player */
  market: string,
  /** Background image to be displayed in the Card header */
  backgroundImage: string,
  /** Valuable caveats to be displayed */
  caveat: string,
  /** The state of the valuable */
  valuableState: ValuableState,
  /** The date on which the valuable will expiry */
  expirationTime: DateTime,
  /** Mutation function that consumes valuable  */
  onConsumeValuable: ConsumeValuableType,
  /** Host container for modal (used in stories) */
  parentSelector?: () => void,
  /** Close modal delay  (used in stories)*/
  closeTimeoutMS?: number,
  /** Translated labels */
  labels: ValuableDetailsLabelsQuery,
  /** Are labels loading? */
  loading: boolean,
  /** Error message when labels query fails */
  error?: string,
  /** Refetch labels function */
  refetch: () => void,
};

export const ValuableDetails = ({
  isOpen,
  onClose,
  id,
  backgroundImage,
  valuableType,
  valuableState,
  expirationTime,
  title,
  caveat,
  game,
  onConsumeValuable,
  parentSelector,
  closeTimeoutMS,
  labels,
  loading,
  error,
  refetch,
}: Props) => {
  const isValuableLocked = valuableState === VALUABLE_STATES.LOCKED;
  const defaultBlurAmount = 3;
  const hasLoadedWithError = !loading && error;

  const modalProps = { isOpen, onClose, parentSelector, closeTimeoutMS };

  if (loading || hasLoadedWithError) {
    return (
      <ValuableDetailsModal {...modalProps}>
        {loading && <ParagraphSkeleton size="default" />}
        {hasLoadedWithError && <ErrorMessage retry={refetch} />}
      </ValuableDetailsModal>
    );
  }

  return (
    <ValuableDetailsModal
      {...modalProps}
      renderButton={() => (
        <ActionButton
          locked={isValuableLocked}
          valuableType={valuableType}
          game={game}
          onConsumeValuable={onConsumeValuable}
          labels={labels}
        />
      )}
    >
      <ValuableDetailsHeaderBackground
        id={id}
        imageUrl={backgroundImage}
        blur={isFreeSpinsValuable(valuableType) ? defaultBlurAmount : 0}
      />
      <ValuableDetailsCard />
      <ValuableDetailsBody
        title={title}
        expirationTime={expirationTime}
        caveat={caveat}
        termsTitle={labels.termsAndConditionsTitle}
        termsContent={labels.termsAndConditionsContent}
      />
    </ValuableDetailsModal>
  );
};
