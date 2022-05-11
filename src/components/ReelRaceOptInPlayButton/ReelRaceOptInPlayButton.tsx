import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { PlayIcon, CheckIcon } from "@casumo/cmp-icons";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { EVENTS } from "Src/constants";
import { BUTTON_STATE } from "Models/reelRaces";
import TrackClick from "Components/TrackClick";
import { noop } from "Utils";

type TTranslations = {
  terms_link_text: string;
};

export type TProps = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
  variant?: "primary" | "secondary";
  showOptedIn?: boolean;
  optIn: () => void;
  playCallback: () => void;
  showExtraTAC: boolean;
  onShowTAC: () => void;
  tacTranslations: TTranslations;
};

export function ReelRaceOptInPlayButton({
  reelRace,
  variant = "primary",
  showOptedIn = false,
  optIn,
  playCallback,
  onShowTAC,
  tacTranslations,
  showExtraTAC,
}: TProps) {
  const inProgress = reelRace.startTime < Number(new Date());
  const ButtonVariant = variant === "primary" ? ButtonPrimary : ButtonSecondary;
  const translations = {
    ...tacTranslations,
    ...reelRace.translations,
  };

  const OptInButton = () => (
    <div>
      <TrackClick
        eventName={EVENTS.MIXPANEL_REEL_RACE_SCHEDULE_CARD_OPT_IN_CLICKED}
        data={{ state: BUTTON_STATE.OPT_IN }}
      >
        <ButtonVariant
          size="sm"
          onClick={optIn || noop}
          className="u-width--full"
        >
          <Text tag="span">{translations.optIn || ""}</Text>
        </ButtonVariant>
      </TrackClick>

      {showExtraTAC && (
        <div
          className="text-grey-20 text-right underline text-[10px] cursor-pointer u-margin-top--sm"
          onClick={onShowTAC}
        >
          {translations?.terms_link_text}
        </div>
      )}
    </div>
  );

  const OptedInButton = () => (
    <ButtonVariant
      size="sm"
      isDisabled
      onClick={noop}
      className="u-width--full bg-grey-80 u-padding-top--sm"
    >
      <CheckIcon
        size="md"
        className="u-margin-bottom--sm text-white u-margin-bottom--sm u-transform-scale--third"
      />
      <Text tag="span">{translations.optedIn}</Text>
    </ButtonVariant>
  );

  const PlayButton = () => (
    <TrackClick
      eventName={EVENTS.MIXPANEL_REEL_RACE_SCHEDULE_CARD_OPT_IN_CLICKED}
      data={{ state: BUTTON_STATE.PLAY }}
    >
      <ButtonVariant size="sm" onClick={playCallback} className="u-width--full">
        <PlayIcon
          size="sm"
          className="u-margin-bottom--sm u-transform-scale--third"
        />
        <Text tag="span" className="u-margin-left">
          {translations.optedInCtaSingleGameShort}
        </Text>
      </ButtonVariant>
    </TrackClick>
  );

  const getActionButton = () => {
    if (!reelRace.optedIn) {
      return <OptInButton />;
    }

    if (inProgress) {
      return <PlayButton />;
    }

    return showOptedIn ? <OptedInButton /> : <PlayButton />;
  };

  return (
    <Flex justify="end" className="u-padding-left--md">
      {getActionButton()}
    </Flex>
  );
}
