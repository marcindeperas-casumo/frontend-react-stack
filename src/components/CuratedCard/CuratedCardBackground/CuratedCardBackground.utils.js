// @flow
import breakpoints from "../CuratedCard.scss";

const curatedCardOptions = [
  {
    mediaQuery: `(max-width: ${breakpoints.phablet - 1}px)`,
    imgixOpts: {
      w: 343,
      h: 352,
      "fp-x": 0.625,
      "fp-y": 0.625,
      "fp-z": 1.3,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(max-width: ${breakpoints.tablet - 1}px)`,
    imgixOpts: {
      w: 496,
      h: 264,
      "fp-x": 0.53,
      "fp-y": 0.54,
      "fp-z": 1.55,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(max-width: ${breakpoints.desktop - 1}px)`,
    imgixOpts: {
      w: 768,
      h: 357,
      "fp-x": 0.5,
      "fp-y": 0.53,
      "fp-z": 1.42,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(min-width: ${breakpoints.desktop}px)`,
    imgixOpts: {
      w: 1181,
      h: 432,
      "fp-x": 0.5,
      "fp-y": 0.517,
      "fp-z": 1.2,
      fit: "crop",
      crop: "focalpoint",
    },
  },
];

export const addImageSourceToOptions = (src: string): Array<Object> =>
  curatedCardOptions.map(option => ({
    ...option,
    src,
  }));
