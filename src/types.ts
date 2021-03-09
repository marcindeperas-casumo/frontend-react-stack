import { ENVIRONMENTS, LANGUAGES, DEVICES } from "Src/constants";

export type AppLanguage = typeof LANGUAGES[keyof typeof LANGUAGES];
export type AppEnvironment = typeof ENVIRONMENTS[keyof typeof ENVIRONMENTS];
export type AppDevice = typeof DEVICES[keyof typeof DEVICES];
