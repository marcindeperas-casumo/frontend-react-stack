/**
 * We are not storing those snapshots in our repo because we have visual
 * snapshot on chromatic. This serves two purposes:
 *   - failing tests if any story cannot be rendered
 *   - collecting coverage for components that have visual snapshots
 */
import { existsSync } from "fs";
import { resolve } from "path";
import requireContext from "require-context.macro";
import ReactDOM from "react-dom";
import initStoryshots, { renderOnly } from "@storybook/addon-storyshots";

/**
 * This part here is to mimic storybook auto-mocking behaviour in jest env.
 * Without that during development storybook will use mocks but storyshots
 * will resolve to real file.
 */
const relativeSrcPath = "../src";
requireContext(relativeSrcPath, true, /__mocks__\/.*/)
  .keys()
  .map(mockFilePath => mockFilePath.replace("__mocks__/", ""))
  .map(filePath => resolve(__dirname, relativeSrcPath, filePath))
  .filter(existsSync)
  .forEach(absoluteFilePath => jest.mock(absoluteFilePath));

ReactDOM.createPortal = node => node;

jest.mock("./isNotChromatic", () => ({
  __esModule: true,
  isChromatic: true,
  default: false,
}));

initStoryshots({ test: renderOnly });
