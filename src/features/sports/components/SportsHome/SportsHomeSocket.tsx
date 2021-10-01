import io from "socket.io-client";
import {
  SportsHomeEvent,
  SportsHomeType,
} from "Features/sports/components/SportsHome/types";
import SportsHomeAdapters from "./SportsHome.adapters";

const socketAddress = `wss://push.aws.kambicdn.com`;

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

/* eslint-disable fp/no-loops,fp/no-let,fp/no-mutation,sonarjs/cognitive-complexity */
// using "for" loop to speedup searching thats why disabling some lint rules
// https://nikitahl.com/how-to-find-an-item-in-a-javascript-array/
const findEventInData = (data: SportsHomeType, eventId: number) => {
  for (let i = 0; i < data.events?.length; i++) {
    if (data.events[i].id === eventId) {
      return data.events[i];
    }
  }
  return null;
};

const findEventByBetofferInData = (
  data: SportsHomeType,
  betOfferId: number
) => {
  for (let i = 0; i < data.events?.length; i++) {
    if (data.events[i].betOfferId === betOfferId) {
      return data.events[i];
    }
  }
  return null;
};

const findEventOutcome = (event: SportsHomeEvent, outcomeId: number) => {
  for (let i = 0; i < event.outcomes?.length; i++) {
    if (event.outcomes[i].id === outcomeId) {
      return event.outcomes[i];
    }
  }
  return null;
};

const countEventsShowed = (data: SportsHomeType) => {
  return data.events.filter(event => event.show === true).length;
};

export const messageEvent = (
  message: any[],
  setData: (data: SportsHomeType) => void,
  dataReact: SportsHomeType,
  refetch: () => void,
  numberOfEventsToShow: number
) => {
  const data = Object.assign({}, dataReact);
  let updateNeeded = false;

  message.forEach((msg: any) => {
    // adding betoffer
    if (msg.mt === 6) {
      const event = findEventInData(data, msg.boa.betOffer.eventId);
      if (
        event &&
        (msg.boa.betOffer.betOfferType === 2 ||
          msg.boa.betOffer.betOfferType === 1)
      ) {
        event.betOfferId = msg.boa.betOffer.eventId;
        event.betOfferType = msg.boa.betOffer.betOfferType;
        event.outcomes = SportsHomeAdapters.convertToSportsHomeOutcomes(
          msg.boa.betOffer.outcomes
        );
        updateNeeded = true;
      }
    }

    // removing betoffer - change all outcomes for betoffer to disabled
    if (msg.mt === 7) {
      const event = findEventByBetofferInData(data, msg.bor.betOfferId);
      if (event) {
        event.outcomes.forEach(outcome => {
          outcome.isDisabled = true;
        });
        updateNeeded = true;
      }
    }

    // making betoffer visible or not - change all outcomes for betoffer to disabled
    if (msg.mt === 8) {
      const event = findEventInData(data, msg.bosu.eventId);
      if (event && event.betOfferId === msg.bosu.betOfferId) {
        event.outcomes.forEach(outcome => {
          outcome.isDisabled = msg.bosu.suspended;
        });
        updateNeeded = true;
      }
    }

    // outcomes change - replacing odds
    if (msg.mt === 11) {
      const event = findEventInData(data, msg.boou.eventId);
      if (event) {
        msg.boou.outcomes.forEach(outcome => {
          const eventOutcome = findEventOutcome(event, outcome.id);
          if (eventOutcome) {
            eventOutcome.odds = outcome.odds;
            eventOutcome.fractional = outcome.oddsFractional;
          }
        });
        updateNeeded = true;
      }
    }

    // score change - for football only atm
    if (msg.mt === 16) {
      const event = findEventInData(data, msg.score.eventId);
      if (event && event.sport === "FOOTBALL") {
        event.score = `(${msg.score.score.home} : ${msg.score.score.away}) `;
        updateNeeded = true;
      }
    }

    // removing event - hiding event, refetch if needed
    if (msg.mt === 18) {
      const event = findEventInData(data, msg.er.eventId);
      if (event) {
        event.show = false;
        if (countEventsShowed(data) < numberOfEventsToShow) {
          refetch();
        }
        updateNeeded = true;
      }
    }

    // adding odds to events
    if (msg.mt === 22) {
      const event = findEventInData(data, msg.booa.eventId);
      if (event) {
        const outcomes = msg.booa.outcomes.filter(
          outcome => outcome.betOfferId === event.betOfferId
        );
        event.outcomes = SportsHomeAdapters.convertToSportsHomeOutcomes(outcomes);
        updateNeeded = true;
      }
    }

    // removing outcomes for bettoffer
    if (msg.mt === 23) {
      const event = findEventInData(data, msg.boor.eventId);
      if (event && event.betOfferId === msg.boor.betOfferId) {
        event.outcomes = [];
        updateNeeded = true;
      }
    }

    // removing outcomes for bettoffer
    if (msg.mt === 34) {
      const event = findEventInData(data, msg.esu.id);
      if (event) {
        event.live = msg.esu.state === "STARTED";
        updateNeeded = true;
      }
    }
  });

  if (updateNeeded) {
    setData(data);
  }
};
/* eslint-enable fp/no-loops,fp/no-let,fp/no-mutation,sonarjs/cognitive-complexity */
