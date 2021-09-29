import io from "socket.io-client";
import {
  SportsHomeEvent,
  SportsHomeType,
} from "Features/sports/components/SportsHome/types";

const socketAddress =
  process.env.NODE_ENV === "production"
    ? `wss://push.aws.kambicdn.com`
    : `wss://ctn-push.kambi.com`;

export const socket = io(socketAddress, {
  transports: ["websocket"],
  upgrade: false,
  autoConnect: false,
  path: "/socket.io",
});

// eslint-disable-next-line fp/no-let
export let vars = {
  lang: "",
  offering: "",
  subscribedEventsArray: [],
};

export const setVars = (key, value) => {
  // eslint-disable-next-line fp/no-mutation
  vars[key] = value;
};

export const getVars = key => vars[key];

export const subscribeEvent = (eventId: number) => {
  if (
    vars.lang &&
    vars.offering &&
    vars.subscribedEventsArray.indexOf(eventId) === -1
  ) {
    socket.emit("subscribe", {
      topic: `v2018.${vars.offering}.${vars.lang}.ev.${eventId}.json`,
    });
    socket.emit("subscribe", {
      topic: `v2018.${vars.offering}.ev.${eventId}.json`,
    });
    setVars("subscribedEventsArray", [...vars.subscribedEventsArray, eventId]);
  }
};

export const unsubscribeEvent = (eventId: number) => {
  if (
    vars.lang &&
    vars.offering &&
    vars.subscribedEventsArray.indexOf(eventId) > -1
  ) {
    socket.emit("unsubscribe", {
      topic: `v2018.${vars.offering}.${vars.lang}.ev.${eventId}.json`,
    });
    socket.emit("unsubscribe", {
      topic: `v2018.${vars.offering}.ev.${eventId}.json`,
    });
    setVars(
      "subscribedEventsArray",
      vars.subscribedEventsArray.filter(event => event.id !== eventId)
    );
  }
};

export const unsubscribeAllEvents = () => {
  if (vars.lang && vars.offering && vars.subscribedEventsArray.length > 0) {
    vars.subscribedEventsArray.map(eventId => unsubscribeEvent(eventId));
  }
};

const findEventInData = (data: SportsHomeType, eventId: number) => {
  return data?.events?.find(event => event.id === eventId) || null;
};

const findEventOutcome = (event: SportsHomeEvent, outcomeId: number) => {
  return event?.outcomes?.find(outcome => outcome.id === outcomeId) || null;
};

/* eslint-disable fp/no-let, fp/no-mutation */
export const messageEvent = (
  msgArray: Array<any>,
  setData: (data: SportsHomeType) => void,
  data: SportsHomeType
) => {
  let changeNeeded: boolean = false;

  msgArray.forEach(msg => {
    // score change
    if (msg.mt === 16) {
      const event = findEventInData(data, msg.score.eventId);
      if (event && event.sport === "FOOTBALL") {
        changeNeeded = true;
        event.score = `(${msg.score.score.home} : ${msg.score.score.away}) `;
      }
    }

    // outcomes change
    if (msg.mt === 11) {
      const event = findEventInData(data, msg.boou.eventId);
      if (event) {
        msg.boou.outcomes.forEach(outcome => {
          const eventOutcome = findEventOutcome(event, outcome.id);
          eventOutcome.odds = outcome.odds;
          eventOutcome.fractional = outcome.oddsFractional;
        });
        changeNeeded = true;
      }
    }
  });

  if (changeNeeded) {
    setData(data);
  }
};
/* eslint-enable fp/no-let, fp/no-mutation */
