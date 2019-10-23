// @flow
import http from "Lib/http";
import type { ActiveSessionType } from "Models/slotControlSystem";

// see http://es-slot-sessions.at.casumotest.local:8080/swagger-ui.html
const BASE = "/casino-player/es-slot-sessions/api/sessions";

export function getActiveSession(): Promise<ActiveSessionType | null> {
  return http.get(BASE);
}

export function createSession(): Promise<ActiveSessionType> {
  return http.post(BASE);
}
