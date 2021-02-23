import { ENVIRONMENTS, LANGUAGES, DEVICES } from "Src/constants";

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
export type AppLanguage = $Values<typeof LANGUAGES>;
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
export type AppEnvironment = $Values<typeof ENVIRONMENTS>;
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
export type AppDevice = $Values<typeof DEVICES>;
