import * as React from "react";
import * as A from "Types/apollo";
import Text from "@casumo/cmp-text";
import { PlayIcon } from "@casumo/cmp-icons";
import { ButtonPrimary } from "@casumo/cmp-button";
import { noop } from "Utils";
import { launchGame } from "Services/LaunchGameService";
import { EVENTS } from "Src/constants";
import { BUTTON_STATE } from "Models/reelRaces";
import TrackClick from "Components/TrackClick";

type Props = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  optIn: () => void;
};

export function ReelRaceOptInPlayButton({
  reelRace,
  optIn,
}: Props) {
  const active = {
    label: reelRace.translations.optIn || "",
    eventName: EVENTS.MIXPANEL_REEL_RACE_SCHEDULE_CARD_OPT_IN_CLICKED,
    data: { state: BUTTON_STATE.OPT_IN },
    onClick: optIn,
  };

  const disabled = {
    label: "Play",
    eventName: EVENTS.MIXPANEL_REEL_RACE_SCHEDULE_CARD_OPT_IN_CLICKED,
    data: { state: BUTTON_STATE.PLAY },
    onClick: (slug: string) => launchGame({ slug }),
  };

  return (
    <div className="u-width--full u-padding-left--md">
      {reelRace.optedIn ? (
        <TrackClick
          eventName={disabled.eventName}
          data={disabled.data}
        >
          <ButtonPrimary
            size="md"
            onClick={() =>
              disabled.onClick
                ? disabled.onClick(reelRace.game.slug)
                : noop()
            }
            className="u-width--full"
          >
            <PlayIcon size="sm" />
            <Text tag="span" className="u-margin-left">
              {disabled.label}
            </Text>
          </ButtonPrimary>
        </TrackClick>
      ) : (
        <TrackClick eventName={active.eventName} data={active.data}>
          <ButtonPrimary
            size="md"
            onClick={active.onClick || noop}
            className="u-width--full"
          >
            <Text tag="span">{active.label}</Text>
          </ButtonPrimary>
        </TrackClick>
      )}
    </div>
  );
}
