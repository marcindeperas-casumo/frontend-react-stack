// @flow
import http from "Lib/http";

// see http://es-slot-sessions.at.casumotest.local:8080/swagger-ui.html
const BASE = "/";
const state = {
  sessionCreated: false,
};

export function getActiveSession(): Promise<{ id: string } | boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!state.sessionCreated) {
        return resolve(false);
      }

      resolve({
        id: "1111",
      });
    }, 1000);
  });
}

export function createSession(): Promise<{ id: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      state.sessionCreated = true; // eslint-disable-line fp/no-mutation
      resolve({
        id: "1111",
      });
    }, 2000);
  });
}
