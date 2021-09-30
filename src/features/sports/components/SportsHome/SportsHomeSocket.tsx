import io from "socket.io-client";
import {
  SportsHomeEvent,
  SportsHomeType,
} from "Features/sports/components/SportsHome/types";
import config from "Src/config";

const socketAddress = config.kambiSocketUrl;

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
  subscribed: false,
};

export const setVars = (key, value) => {
  // eslint-disable-next-line fp/no-mutation
  vars[key] = value;
};

export const getVars = key => vars[key];

export const subscribe = () => {
  if (vars.lang && vars.offering && !vars.subscribed) {
    socket.emit("subscribe", {
      topic: `v2018.${vars.offering}.${vars.lang}.ev.json`,
    });
    socket.emit("subscribe", {
      topic: `v2018.${vars.offering}.ev.json`,
    });
    setVars("subscribed", true);
  }
};

export const unsubscribe = () => {
  if (vars.lang && vars.offering && vars.subscribed) {
    socket.emit("unsubscribe", {
      topic: `v2018.${vars.offering}.${vars.lang}.ev.json`,
    });
    socket.emit("unsubscribe", {
      topic: `v2018.${vars.offering}.ev.json`,
    });
    setVars("subscribed", false);
  }
};

/* eslint-disable fp/no-loops,fp/no-let,fp/no-mutation */
// using "for" loop to speedup searching thats why disabling some lint rules
// https://nikitahl.com/how-to-find-an-item-in-a-javascript-array/
const findEventInData = (data: SportsHomeType, eventId: number) => {
  for (let i = 0; i < data.events.length; i++) {
    if (data.events[i].id === eventId) {
      return data.events[i];
    }
  }
  return null;
};

const findEventOutcome = (event: SportsHomeEvent, outcomeId: number) => {
  for (let i = 0; i < event.outcomes.length; i++) {
    if (event.outcomes[i].id === outcomeId) {
      return event.outcomes[i];
    }
  }
  return null;
};

export const messageEvent = (
  msg: any,
  setData: (data: SportsHomeType) => void,
  data: SportsHomeType
) => {
  // score change
  if (msg.mt === 16) {
    const event = findEventInData(data, msg.score.eventId);
    if (event && event.sport === "FOOTBALL") {
      event.score = `(${msg.score.score.home} : ${msg.score.score.away}) `;
      setData(data);
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
      setData(data);
    }
  }
};
/* eslint-enable fp/no-loops,fp/no-let,fp/no-mutation */
