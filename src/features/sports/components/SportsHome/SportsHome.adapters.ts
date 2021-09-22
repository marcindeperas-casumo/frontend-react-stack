import {
  KambiBetOffer,
  KambiBetOfferOutcome,
  KambiEvent,
  SportsHomeEvent,
  SportsHomeOutcome,
} from "./types";

class SportsHomeAdapters {
  //   convertToSportsHomeOfferings(
  //     events: KambiEvent[],
  //     betOffers: KambiBetOffer[]
  //   ): SportsHomeEvent[] {
  //     events.forEach(event => {
  //       const betOffer = betOffers.find(x => x.eventId === event.id);
  //       return null;
  //     });
  //   }
  //   mapToSportOutcome(
  //     kambiBetOfferOutcome: KambiBetOfferOutcome
  //   ): SportsHomeOutcome {
  //     const newLocal = (SportsHomeOutcome = {
  //       id: kambiBetOfferOutcome.id,
  //     });
  //     return newLocal;
  //   }
}

export default new SportsHomeAdapters();
