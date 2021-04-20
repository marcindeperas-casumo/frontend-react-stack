const promotionHeaderImageOptions = [
  {
    mediaQuery: `(max-width: 460px)`,
    imgixOpts: {
      w: 460,
      q: 95,
      "fp-x": 0.5,
      "fp-y": 0.6,
      "fp-z": 1.2,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(max-width: 800px)`,
    imgixOpts: {
      w: 800,
      q: 95,
      "fp-y": 0.625,
      "fp-z": 1.3,
      fit: "crop",
      crop: "focalpoint",
    },
  },
  {
    mediaQuery: `(min-width: 801px)`,
    imgixOpts: {
      w: 1200,
      q: 95,
    },
  },
];

export const promotionsHeaderImageSet = (src: string): Array<Object> =>
  promotionHeaderImageOptions.map(option => ({
    ...option,
    src,
  }));
