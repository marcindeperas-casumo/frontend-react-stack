import {
  KambiBetOffer,
  KambiBetOfferOutcome,
  KambiEvent,
  SportsHomeConfigurationTranslations,
  SportsHomeEvent,
  SportsHomeOutcome,
  SportsHomePopularBetsConfigurations,
  SportsHomeTranslations,
  SportsHomeTranslationsDictionary,
} from "./types";

class SportsHomeAdapters {
  convertToSportsHomeOfferings(
    eventIds: number[],
    events: KambiEvent[],
    betOffers: KambiBetOffer[]
  ): SportsHomeEvent[] {
    const mappedEvents = eventIds.map<SportsHomeEvent>(eventId => {
      const event = events.find(x => x.id === eventId);
      if (!event) {
        return;
      }
      const betOffer = betOffers.find(x => x.eventId === event.id);

      return {
        id: event.id,
        betOfferId: betOffer?.id,
        betOfferType: betOffer?.betOfferType.id,
        name: event.name,
        sport: event.sport,
        group: event.group,
        startTime: event.start,
        live: event.state === "STARTED",
        score: "",
        show: true,
        outcomes: betOffer?.outcomes
          ? this.convertToSportsHomeOutcomes(betOffer.outcomes)
          : [],
      } as SportsHomeEvent;
    });

    return mappedEvents.filter(event => event);
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

  convertToSportsHomePopularBetsConfiguration(
    data: SportsHomeConfigurationTranslations,
    defaultNumberOfEventsToShow: number,
    defaultSports: string
  ): SportsHomePopularBetsConfigurations {
    return {
      availableSports: data?.available_sports ?? defaultSports,
      orderNo: parseInt(data?.order_no) || 0,
      isEnabled: data?.status === "Enabled" ?? false,
      numberOfEventsMobile:
        parseInt(data?.mobile.number_of_events_mobile) ||
        defaultNumberOfEventsToShow,
      numberOfEventsDesktop:
        parseInt(data?.desktop.number_of_events_desktop) ||
        defaultNumberOfEventsToShow,
      numberOfEventsTablet:
        parseInt(data?.tablet.number_of_events_tablet) ||
        defaultNumberOfEventsToShow,
    } as SportsHomePopularBetsConfigurations;
  }
}

export default new SportsHomeAdapters();
