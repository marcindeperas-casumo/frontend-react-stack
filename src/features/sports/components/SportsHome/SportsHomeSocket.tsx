import io from "socket.io-client";

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

export const subscribeEvent = (id: number) => {
  if (
    vars.lang &&
    vars.offering &&
    vars.subscribedEventsArray.indexOf(id) === -1
  ) {
    socket.emit("subscribe", {
      topic: `v2018.${vars.offering}.${vars.lang}.ev.${id}.json`,
    });
    socket.emit("subscribe", {
      topic: `v2018.${vars.offering}.ev.${id}.json`,
    });
    setVars("subscribedEventsArray", [...vars.subscribedEventsArray, id]);
  }
};

export const unsubscribeEvent = (id: number) => {
  if (
    vars.lang &&
    vars.offering &&
    vars.subscribedEventsArray.indexOf(id) !== -1
  ) {
    socket.emit("unsubscribe", {
      topic: `v2018.${vars.offering}.${vars.lang}.ev.${id}.json`,
    });
    socket.emit("unsubscribe", {
      topic: `v2018.${vars.offering}.ev.${id}.json`,
    });
    setVars(
      "subscribedEventsArray",
      vars.subscribedEventsArray.map(el => el !== id)
    );
  }
};

export const unsubscribeAllEvents = () => {
  if (vars.lang && vars.offering && vars.subscribedEventsArray.length > 0) {
    vars.subscribedEventsArray.forEach(eventId => unsubscribeEvent(eventId));
  }
};

socket.on("connect", () => {
  console.log("Socket connected");
});

socket.on("disconnect", reason => {
  console.log("Socket disconnected: " + reason);
});

socket.on("reconnect", attemptNumber => {
  console.log("Socket reconnected");
});

socket.on("error", error => {
  console.log("Socket error: " + error);
});

socket.on("reconnect_attempt", attemptNumber => {
  console.log("Socket reconnect attempt " + attemptNumber);
});

socket.on("message", data => {
  const msg = JSON.parse(data);
  console.log("On message", msg);
});
