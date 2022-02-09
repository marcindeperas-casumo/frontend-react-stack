import axios from "axios";
import config from "Src/config";
import {
  KambiOfferingResponse,
  KambiEventServerResponse,
  KambiLiveEventServerResponse,
  KambiLiveEventResponse,
  KambiLandingEventsServerResponse,
  KambiLandingEventsResponse,
} from "./types";

class SportsHomeService {
  async getEvents(
    kambiOffering: string,
    eventIds: string,
    kambiLocale: string,
    kambiMarket: string
  ): Promise<KambiEventServerResponse> {
    return await axios.get<KambiOfferingResponse>(
      `${config.kambiOfferingApi}${kambiOffering}/betoffer/event/${eventIds}?type=2&lang=${kambiLocale}&includeParticipants=false&onlyMain=true&market=${kambiMarket}`
    );
  }

  async getLiveEvents(
    kambiOffering: string,
    eventIds: string,
    kambiLocale: string
  ): Promise<KambiLiveEventServerResponse> {
    return await axios.get<KambiLiveEventResponse>(
      `${config.kambiOfferingApi}${kambiOffering}/event/livedata/${eventIds}?lang=${kambiLocale}`
    );
  }

  async getNextOffEvent(
    kambiOffering: string,
    kambiMarket: string,
    kambiLocale: string
  ): Promise<KambiLandingEventsServerResponse> {
    return await axios.get<KambiLandingEventsResponse>(
      `${config.kambiOfferingApi}${kambiOffering}/betoffer/landing?lang=${kambiLocale}&market=${kambiMarket}&includeParticipants=false`
    );
  }
}

export default new SportsHomeService();
