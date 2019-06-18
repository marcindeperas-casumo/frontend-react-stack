/**
 * We are not storing those snapshots in our repo because we have visual
 * snapshot on chromatic. This serves two purposes:
 *   - failing tests if any story cannot be rendered
 *   - collecting coverage for components that have visual snapshots
 */
import ReactDOM from "react-dom";
import initStoryshots, { renderOnly } from "@storybook/addon-storyshots";

ReactDOM.createPortal = node => node;

jest.mock("./isNotChromatic", () => ({
  __esModule: true,
  isChromatic: true,
  default: false,
}));

initStoryshots({ test: renderOnly });
