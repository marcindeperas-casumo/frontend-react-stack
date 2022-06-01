export type TEvent = {
  channel: string;
  data: {
    [eventName: string]: {};
  };
};
