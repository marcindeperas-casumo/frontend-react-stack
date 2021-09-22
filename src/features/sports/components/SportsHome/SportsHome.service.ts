import axios from "axios";
import config from "Src/config";
import { KambiOfferingResponse, KambiOfferingServerResponse } from "./types";

class SportsHomeService {
  async getOfferings(
    kambiOffering: string,
    eventIds: string,
    kambiLocale: string
  ) {
    return await axios.get<KambiOfferingResponse>(
      `${config.kambiOfferingApi}${kambiOffering}/betoffer/event/${eventIds}?type=1%2C2%2C3&lang=${kambiLocale}&includeParticipants=false&onlyMain=false`
    );
    //  await axios.request<KambiOfferingServerResponse>({
    //   url: `${config.kambiOfferingApi}${kambiOffering}/betoffer/event/${eventIds}?type=1%2C2%2C3&lang=${kambiLocale}&includeParticipants=false&onlyMain=false`,
    //     transformResponse: (r: KambiOfferingServerResponse) => r.data,
    //   })
    //   .then(response => {
    //     return response.data;
    // });
  }
}

export default new SportsHomeService();
