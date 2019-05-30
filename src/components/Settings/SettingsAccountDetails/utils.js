import { repeat } from "ramda";

export const PASSWORD_PLACEHOLDER_VALUE = repeat(String.fromCharCode(8226), 8);
