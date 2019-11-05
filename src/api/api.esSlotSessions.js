// @flow
import http from "Lib/http";
import type {
  ActiveSessionType,
  NewSessionRequestType,
} from "Models/slotControlSystem";

// see http://es-slot-sessions.at.casumotest.local:8080/swagger-ui.html
const BASE = "/casino-player/es-slot-sessions/api/sessions";

export function getActiveSession(): Promise<ActiveSessionType | null> {
  return http.get(BASE).catch(e => null);
}

export function createSession(
  payload: NewSessionRequestType
): Promise<ActiveSessionType> {
  return http.post(BASE, payload);
}
