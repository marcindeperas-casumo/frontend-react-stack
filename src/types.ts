// @flow
import { ENVIRONMENTS, LANGUAGES, DEVICES } from "Src/constants";

export type AppLanguage = $Values<typeof LANGUAGES>;
export type AppEnvironment = $Values<typeof ENVIRONMENTS>;
export type AppDevice = $Values<typeof DEVICES>;
