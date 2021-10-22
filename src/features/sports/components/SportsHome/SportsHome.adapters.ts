import {
  KambiBetOffer,
  KambiBetOfferOutcome,
  KambiEvent,
  KambiEventPath,
  KambiLiveEvent,
  KambiLiveEventStatistics,
  SportsHomeConfigurationTranslations,
  SportsHomeEvent,
  SportsHomeEventPath,
  SportsHomeLiveEventStatistics,
  SportsHomeOutcome,
  SportsHomePopularBetsConfigurations,
  SportsHomeTranslations,
  SportsHomeTranslationsDictionary,
} from "./types";
class SportsHomeAdapters {
  convertToSportsHomeOfferings(
    eventIds: number[],
    events: KambiEvent[],
    betOffers: KambiBetOffer[],
    liveEvents: KambiLiveEvent[]
  ): SportsHomeEvent[] {
    const mappedEvents = eventIds.map<SportsHomeEvent>(eventId => {
      const event = events.find(x => x.id === eventId);
      if (!event) {
        return {
          id: eventId,
          betOfferId: 0,
          betOfferType: 0,
          name: "",
          sport: "",
          group: "",
          startTime: "",
          live: false,
          scoreAway: "",
          scoreHome: "",
          statistics: null,
          show: false,
          homeName: "",
          awayName: "",
          outcomes: [],
          path: [],
        } as SportsHomeEvent;
      }
      const betOffer = betOffers.find(x => x.eventId === event.id);
      const liveEvent = liveEvents.find(x => x.eventId === event.id);

      return {
        id: event.id,
        betOfferId: betOffer?.id,
        betOfferType: betOffer?.betOfferType.id,
        name: event.name,
        sport: event.sport,
        group: event.group,
        startTime: event.start,
        live: event.state === "STARTED",
        scoreHome: liveEvent?.score?.home,
        scoreAway: liveEvent?.score?.away,
        statistics: this.convertToSportsHomeLiveEventStatistics(
          liveEvent?.statistics
        ),
        show: true,
        homeName: event.homeName,
        awayName: event.awayName,
        outcomes: betOffer?.outcomes
          ? this.convertToSportsHomeOutcomes(betOffer.outcomes)
          : [],
        path: event?.path ? this.convertToSportsHomeEventPath(event.path) : [],
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
        type: outcome.type,
        label: outcome.participant,
        odds: outcome.odds,
        fractional: outcome.oddsFractional,
        american: outcome.oddsAmerican,
        isDisabled: outcome.status !== "OPEN",
      } as SportsHomeOutcome;
    });
  }

  convertToSportsHomeEventPath(
    kambiEventPath: KambiEventPath[]
  ): SportsHomeEventPath[] {
    return kambiEventPath.map<SportsHomeEventPath>(
      eventPath =>
        ({
          id: eventPath.id,
          englishName: eventPath.name,
          name: eventPath.name,
          termKey: eventPath.termKey,
        } as SportsHomeEventPath)
    );
  }

  convertToSportsHomeTranslations(
    data: SportsHomeTranslationsDictionary
  ): SportsHomeTranslations {
    return {
      live: data.dictionary.find(x => x.key === "sports_home_live")?.value,
      draw: data.dictionary.find(x => x.key === "sports_home_draw")?.value,
      title: data.dictionary.find(x => x.key === "sports_home_title")?.value,
      home: data.dictionary.find(x => x.key === "sports_home_home")?.value,
      away: data.dictionary.find(x => x.key === "sports_home_away")?.value,
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

  convertToSportsHomeLiveEventStatistics(
    data: KambiLiveEventStatistics
  ): SportsHomeLiveEventStatistics {
    const homeStatistics = data?.sets?.home.filter(x => x >= 0);
    const awayStatistics = data?.sets?.away.filter(x => x >= 0);

    return {
      homeStatistics: homeStatistics?.map(String),
      awayStatistics: awayStatistics?.map(String),
    } as SportsHomeLiveEventStatistics;
  }
}

export default new SportsHomeAdapters();
