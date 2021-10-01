import axios from "axios";
import config from "Src/config";
import { KambiOfferingResponse, KambiOfferingServerResponse } from "./types";

class SportsHomeService {
  async getOfferings(
    kambiOffering: string,
    eventIds: string,
    kambiLocale: string,
    kambiMarket: string
  ): Promise<KambiOfferingServerResponse> {
    return await axios.get<KambiOfferingResponse>(
      `${config.kambiOfferingApi}${kambiOffering}/betoffer/event/${eventIds}?type=1%2C2&lang=${kambiLocale}&includeParticipants=false&onlyMain=true&market=${kambiMarket}`
    );
  }
}

export default new SportsHomeService();
