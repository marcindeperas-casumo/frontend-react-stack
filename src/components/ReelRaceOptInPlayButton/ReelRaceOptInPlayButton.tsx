import * as React from "react";
import Text from "@casumo/cmp-text";
import { PlayIcon, CheckIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import { useTranslatedUrl } from "Utils/hooks";
import * as A from "Types/apollo";
import { noop, isIosNative, isAndroidNative } from "Utils";
import { EVENTS, ROUTE_IDS } from "Src/constants";
import { BUTTON_STATE } from "Models/reelRaces";
import TrackClick from "Components/TrackClick";
import { launchGame } from "Services/LaunchGameService";
import "./ReelRaceOptInPlayButton.scss";

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

  const gameDetailsPath = useTranslatedUrl(ROUTE_IDS.PLAY, {
    slug: reelRace.game.slug,
  });

  const playCallback =
    isIosNative() || isAndroidNative()
      ? () => launchGame({ slug: reelRace.game.slug })
      : // eslint-disable-next-line fp/no-mutation
        () => (window.location.pathname = gameDetailsPath);

  const OptInButton = () => (
    <TrackClick
      eventName={EVENTS.MIXPANEL_REEL_RACE_SCHEDULE_CARD_OPT_IN_CLICKED}
      data={{ state: BUTTON_STATE.OPT_IN }}
    >
      <ButtonVariant
        size="sm"
        onClick={optIn || noop}
        className="u-width--full"
      >
        <Text tag="span">{reelRace.translations.optIn || ""}</Text>
      </ButtonVariant>
    </TrackClick>
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
        className="u-margin-bottom--sm text-white u-margin-bottom--sm icon-scale-third"
      />
      <Text tag="span">{reelRace.translations.optedIn}</Text>
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
          className="u-margin-bottom--sm u-margin-right icon-scale-third"
        />
        <Text tag="span" className="u-margin-left">
          {reelRace.translations.optedInCtaSingleGameShort}
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
