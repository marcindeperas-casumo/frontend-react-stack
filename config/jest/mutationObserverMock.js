import MutationObserver from "mutation-observer";

// eslint-disable-next-line fp/no-mutating-methods
Object.defineProperty(window, "MutationObserver", { value: MutationObserver });
