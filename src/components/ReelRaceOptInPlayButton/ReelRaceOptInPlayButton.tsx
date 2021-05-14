import * as React from "react";
import Text from "@casumo/cmp-text";
import { PlayIcon, CheckIcon } from "@casumo/cmp-icons";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { noop } from "Utils";
import { launchGame } from "Services/LaunchGameService";
import { EVENTS } from "Src/constants";
import { BUTTON_STATE } from "Models/reelRaces";
import TrackClick from "Components/TrackClick";

export type TProps = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
  variant?: "primary" | "secondary";
  showOptedIn?: boolean;
  optIn: () => void;
};

export function ReelRaceOptInPlayButton({
  reelRace,
  variant = "primary",
  showOptedIn = false,
  optIn,
}: TProps) {
  const inProgress = reelRace.startTime < Number(new Date());
  const ButtonVariant = variant === "primary" ? ButtonPrimary : ButtonSecondary;

  const OptInButton = () => (
    <TrackClick
      eventName={EVENTS.MIXPANEL_REEL_RACE_SCHEDULE_CARD_OPT_IN_CLICKED}
      data={{ state: BUTTON_STATE.OPT_IN }}
    >
      <ButtonVariant
        size="md"
        onClick={optIn || noop}
        className="u-width--full"
      >
        <Text tag="span">{reelRace.translations.optIn || ""}</Text>
      </ButtonVariant>
    </TrackClick>
  );

  const OptedInButton = () => (
    <ButtonVariant
      size="md"
      isDisabled
      onClick={noop}
      className="u-width--full bg-grey-80 u-padding-top--sm"
    >
      <CheckIcon size="md" className="text-white u-margin-bottom--sm" />
      <Text tag="span">{reelRace.translations.optedIn}</Text>
    </ButtonVariant>
  );

  const PlayButton = () => (
    <TrackClick
      eventName={EVENTS.MIXPANEL_REEL_RACE_SCHEDULE_CARD_OPT_IN_CLICKED}
      data={{ state: BUTTON_STATE.PLAY }}
    >
      <ButtonVariant
        size="md"
        onClick={() => launchGame({ slug: reelRace.game.slug })}
        className="u-width--full"
      >
        <PlayIcon size="sm" />
        <Text tag="span" className="u-margin-left">
          {reelRace.translations.optedInCtaSingleGameShort}
        </Text>
      </ButtonVariant>
    </TrackClick>
  );

  return (
    <div className="u-width--full u-padding-left--md">
      {reelRace.optedIn ? (
        inProgress ? <PlayButton /> : (
          showOptedIn ? <OptedInButton /> : <PlayButton />
        )
        // <PlayButton />
      ) : (
        <OptInButton />
      )}
    </div>
  );
}
