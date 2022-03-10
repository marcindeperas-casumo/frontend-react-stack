export type LaunchableKambiClientData = {
  bootstrapUrl: string;
  providerPlayerId: string;
  ticket: string;
};

export type LaunchableKambiClientResponse = {
  data: LaunchableKambiClientData;
};
