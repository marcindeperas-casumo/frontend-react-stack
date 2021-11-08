import io from "socket.io-client";
import {
  SportsHomeEvent,
  SportsHomeType,
} from "Features/sports/components/SportsHome/types";
import config from "Src/config";
import SportsHomeAdapters from "./SportsHome.adapters";
import SportsHomeUtilities from "./SportsHome.Utilities";
import {
  EVENT_STATE_STARTED,
  SPORT_FOOTBALL,
  SPORT_TENNIS,
} from "./SportsHome.constants";

const socketAddress = config.kambiSocketUrl;

export const socket = io(socketAddress, {
  transports: ["websocket"],
  upgrade: false,
  autoConnect: false,
  path: "/socket.io",
});

const BET_OFFER_ADDED = 6;
const BET_OFFER_REMOVED = 7;
const BET_OFFER_STATUS_UPDATED = 8;
const BET_OFFER_ODDS_UPDATED = 11;
const MATCH_CLOCK_REMOVED = 12;
const MATCH_CLOCK_UPDATED = 15;
const EVENT_SCORE_UPDATED = 16;
const EVENT_REMOVED = 18;
const EVENT_STATS_UPDATED = 17;
const BET_OFFER_ODDS_ADDED = 22;
const BET_OFFER_ODDS_REMOVED = 23;
const EVENT_STATE_UPDATED = 34;

// eslint-disable-next-line fp/no-let
let vars = {
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

const checkForEventValidity = (
  data: SportsHomeType,
  event: SportsHomeEvent,
  numberOfEventsToShow: number,
  refetch: () => void
) => {
  if (event && !SportsHomeUtilities.isValidEventOutcome(event)) {
    event.show = false;
    if (countEventsShowed(data) < numberOfEventsToShow) {
      refetch();
    }
  }
};

export const messageEvent = (
  message: any[],
  setData: (data: SportsHomeType) => void,
  dataReact: SportsHomeType,
  refetch: () => void,
  numberOfEventsToShow: number,
  getOneEvent: (eventId: number) => void
) => {
  const data = Object.assign({}, dataReact);
  let updateNeeded = false;

  message.forEach((msg: any) => {
    // adding betoffer just for type 2
    if (msg.mt === BET_OFFER_ADDED) {
      const event = findEventInData(data, msg.boa.betOffer.eventId);
      if (event && msg.boa.betOffer.betOfferType === 2) {
        event.betOfferId = msg.boa.betOffer.eventId;
        event.betOfferType = msg.boa.betOffer.betOfferType;
        event.outcomes = SportsHomeAdapters.convertToSportsHomeOutcomes(
          msg.boa.betOffer.outcomes
        );
        updateNeeded = true;

        // check if event is still valid
        checkForEventValidity(data, event, numberOfEventsToShow, refetch);
      }
    }

    // removing betoffer - change all outcomes for betoffer to disabled
    if (msg.mt === BET_OFFER_REMOVED) {
      const event = findEventByBetofferInData(data, msg.bor.betOfferId);
      if (event) {
        event.outcomes.forEach(outcome => {
          outcome.isDisabled = true;
        });
        updateNeeded = true;
      }
    }

    // making betoffer visible or not - change all outcomes for betoffer to disabled
    if (msg.mt === BET_OFFER_STATUS_UPDATED) {
      const event = findEventInData(data, msg.bosu.eventId);
      if (event && event.betOfferId === msg.bosu.betOfferId) {
        event.outcomes.forEach(outcome => {
          outcome.isDisabled = msg.bosu.suspended;
        });
        updateNeeded = true;
      }
    }

    // outcomes change - replacing odds
    if (msg.mt === BET_OFFER_ODDS_UPDATED) {
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

        // check if event is still valid
        checkForEventValidity(data, event, numberOfEventsToShow, refetch);
      }
    }

    // removed clock mt=12
    if (msg.mt === MATCH_CLOCK_REMOVED) {
      const event = findEventInData(data, msg.mcr.eventId);
      if (event) {
        event.timer.disabled = true;
        updateNeeded = true;
      }
    }

    // update clock mt=15
    if (msg.mt === MATCH_CLOCK_UPDATED) {
      const event = findEventInData(data, msg.mcu.eventId);
      if (event) {
        event.timer = {
          disabled: false,
          seconds: msg.mcu.matchClock.second,
          minutes: msg.mcu.matchClock.minute,
        };
        updateNeeded = true;
      }
    }

    // score change - for football and tennis only atm
    if (msg.mt === EVENT_SCORE_UPDATED) {
      const event = findEventInData(data, msg.score.eventId);
      if (
        event &&
        (event.sport === SPORT_FOOTBALL || event.sport === SPORT_TENNIS)
      ) {
        event.scoreHome = msg.score.score.home;
        event.scoreAway = msg.score.score.away;
        updateNeeded = true;
      }
    }

    // stat updated - for tennis only atm
    if (msg.mt === EVENT_STATS_UPDATED) {
      const event = findEventInData(data, msg.stats.eventId);
      if (event && event.sport === SPORT_TENNIS) {
        event.statistics = SportsHomeAdapters.convertToSportsHomeLiveEventStatistics(
          msg.stats.statistics
        );
        updateNeeded = true;
      }
    }

    // removing event - hiding event, refetch if needed
    if (msg.mt === EVENT_REMOVED) {
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
    if (msg.mt === BET_OFFER_ODDS_ADDED) {
      const event = findEventInData(data, msg.booa.eventId);
      if (event) {
        const outcomes = msg.booa.outcomes.filter(
          outcome => outcome.betOfferId === event.betOfferId
        );
        event.outcomes = SportsHomeAdapters.convertToSportsHomeOutcomes(
          outcomes
        );
        updateNeeded = true;

        // check if event is still valid
        checkForEventValidity(data, event, numberOfEventsToShow, refetch);
      }
    }

    // removing outcomes for bettoffer
    if (msg.mt === BET_OFFER_ODDS_REMOVED) {
      const event = findEventInData(data, msg.boor.eventId);
      if (event && event.betOfferId === msg.boor.betOfferId) {
        event.outcomes = [];
        updateNeeded = true;
      }
    }

    // removing outcomes for bettoffer
    if (msg.mt === EVENT_STATE_UPDATED) {
      const event = findEventInData(data, msg.esu.id);
      if (event) {
        event.live = msg.esu.state === EVENT_STATE_STARTED;
        if (event.show === false && event.name === "") {
          getOneEvent(event.id);
        }
        updateNeeded = true;
      }
    }
  });

  if (updateNeeded) {
    setData(data);
  }
};
/* eslint-enable fp/no-loops,fp/no-let,fp/no-mutation,sonarjs/cognitive-complexity */
