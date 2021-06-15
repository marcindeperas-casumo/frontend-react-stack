import breakpoints from "../../styles/_settings.breakpoints.scss";

const promotionHeaderImageOptions = [
  {
    mediaQuery: `(max-width: ${breakpoints.phablet})`,
    imgixOpts: {
      w: 460,
      h: 280,
      q: 95,
      "fp-x": 0.5,
      "fp-y": 0.5,
      "fp-z": 1.0,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(max-width: ${parseInt(breakpoints.tablet) - 1}px)`,
    imgixOpts: {
      w: 768,
      h: 380,
      q: 100,
      "fp-y": 0.625,
      "fp-z": 1.0,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(min-width: ${breakpoints.tablet})`,
    imgixOpts: {
      w: 1200,
      q: 100,
    },
  },
];

export const promotionsHeaderImageSet = (src: string): Array<Object> =>
  promotionHeaderImageOptions.map(option => ({
    ...option,
    src,
  }));
