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
  subscribed: false,
};

export const setVars = (key, value) => {
  // eslint-disable-next-line fp/no-mutation
  vars[key] = value;
};

export const getVars = key => vars[key];

export const subscribeEvents = () => {
  if (vars.lang && vars.offering && !vars.subscribed) {
    socket.emit("subscribe", {
      topic: `v2018.${vars.offering}.${vars.lang}.ev.json`,
    });
    socket.emit("subscribe", {
      topic: `v2018.${vars.offering}.ev.json`,
    });
    setVars("subscribedEventsArray", true);
  }
};

export const unsubscribeEvents = () => {
  if (vars.lang && vars.offering && vars.subscribed) {
    socket.emit("unsubscribe", {
      topic: `v2018.${vars.offering}.${vars.lang}.ev.json`,
    });
    socket.emit("unsubscribe", {
      topic: `v2018.${vars.offering}.ev.json`,
    });
    setVars("subscribedEventsArray", false);
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
