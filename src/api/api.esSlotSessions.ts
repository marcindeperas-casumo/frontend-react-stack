// @flow
import http from "Lib/http";
import type {
  NewSessionRequestType,
  SessionStateResponseType,
} from "Models/slotControlSystem";

// see http://es-slot-sessions.at.casumotest.local:8080/swagger-ui.html
const BASE = "/casino-player/es-slot-sessions/api/sessions";

export function getSessionState(): Promise<SessionStateResponseType> {
  return http.get(BASE);
}

export function createSession(
  payload: NewSessionRequestType
): Promise<SessionStateResponseType> {
  return http.post(BASE, payload);
}
