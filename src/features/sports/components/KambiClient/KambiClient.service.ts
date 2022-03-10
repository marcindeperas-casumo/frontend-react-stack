import axios from "axios";
import {
  LaunchableKambiClientData,
  LaunchableKambiClientResponse,
} from "./types";

class KambiClientService {
  getKambiClientLaunchSports(
    deviceType: string
  ): Promise<LaunchableKambiClientResponse> {
    return axios.post<LaunchableKambiClientData>(
      `/casino-player/sportsbook-kambi-wallet-runner/api/launchSports`,
      {
        playForFun: false,
        deviceType,
      }
    );
  }
}

export default new KambiClientService();
