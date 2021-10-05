import moment from "moment";
import {
  KambiBetOffer,
  KambiBetOfferOutcome,
  KambiEvent,
  SportsHomeEvent,
  SportsHomeOutcome,
  SportsHomeTranslations,
  SportsHomeTranslationsDictionary,
} from "./types";

class SportsHomeAdapters {
  convertToSportsHomeOfferings(
    eventIds: number[],
    events: KambiEvent[],
    betOffers: KambiBetOffer[]
  ): SportsHomeEvent[] {
    return eventIds.map<SportsHomeEvent>(eventId => {
      const event = events.find(x => x.id === eventId);
      const betOffer = betOffers.find(x => x.eventId === event.id);
      const live = moment().diff(event.start, "seconds") > 0;

      return {
        id: event.id,
        betOfferId: betOffer?.id,
        betOfferType: betOffer?.betOfferType.id,
        name: event.name,
        sport: event.sport,
        group: event.group,
        startTime: event.start,
        live: live,
        score: "",
        show: true,
        outcomes: betOffer?.outcomes
          ? this.convertToSportsHomeOutcomes(betOffer.outcomes)
          : [],
      } as SportsHomeEvent;
    });
  }

  convertToSportsHomeOutcomes(
    kambiBetOfferOutcomes: KambiBetOfferOutcome[]
  ): SportsHomeOutcome[] {
    return kambiBetOfferOutcomes.map<SportsHomeOutcome>(outcome => {
      return {
        id: outcome.id,
        type: outcome.label,
        label: outcome.participant,
        odds: outcome.odds,
        fractional: outcome.oddsFractional,
        isDisabled: outcome.status !== "OPEN",
      } as SportsHomeOutcome;
    });
  }

  convertToSportsHomeTranslations(
    data: SportsHomeTranslationsDictionary
  ): SportsHomeTranslations {
    return {
      live: data.dictionary.find(x => x.key === "sports_home_live")?.value,
      draw: data.dictionary.find(x => x.key === "sports_home_draw")?.value,
      title: data.dictionary.find(x => x.key === "sports_home_title")?.value,
    } as SportsHomeTranslations;
  }
}

export default new SportsHomeAdapters();
