import {
  KambiBetOffer,
  KambiBetOfferOutcome,
  KambiEvent,
  SportsHomeEvent,
  SportsHomeOutcome,
} from "./types";

class SportsHomeAdapters {
  convertToSportsHomeOfferings(
    events: KambiEvent[],
    betOffers: KambiBetOffer[]
  ): SportsHomeEvent[] {
    return events.map<SportsHomeEvent>(event => {
      const betOffer = betOffers.find(x => x.eventId === event.id);
      return {
        id: event.id,
        betOfferId: betOffer.id,
        betOfferType: betOffer.betOfferType.id,
        name: event.name,
        sport: event.sport,
        group: event.group,
        startTime: event.start,
        score: "",
        outcomes: this.convertToSportsHomeOutcomes(betOffer.outcomes),
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
      } as SportsHomeOutcome;
    });
  }
}

export default new SportsHomeAdapters();
