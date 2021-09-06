import { objToURLParams } from "Utils";

// TODO: ported from KO stack, needs improvements
const imageDomainMappings = {
  "cms.casumo.com/wp-content/uploads": "images.casumo.com",
};

function ImageOptimizer(extraDomainSourceMappings = {}) {
  const domainSourceMappings = {
    ...imageDomainMappings,
    ...extraDomainSourceMappings,
  };
  // eslint-disable-next-line fp/no-let
  let dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;

  if (dpr % 1 !== 0) {
    const [, reminder] = `${dpr}`.split(".");

    // eslint-disable-next-line fp/no-mutation
    dpr =
      reminder.length > 1 && reminder.slice(1, 2) !== "0"
        ? dpr.toFixed(2)
        : dpr.toFixed(1);
  }

  const defaultOptions = {
    dpr,
    format: "auto",
  };

  this.getOptimizedUrl = (imagePath, imageOptions, ignoreDefaults = false) => {
    // eslint-disable-next-line fp/no-let
    let optimizedImagePath = imagePath;

    Object.entries(domainSourceMappings).forEach(([key, value]) => {
      // eslint-disable-next-line fp/no-mutation
      optimizedImagePath = optimizedImagePath.replace(key, value);
    });

    const processedImageOptions = ignoreDefaults
      ? imageOptions
      : { ...defaultOptions, ...imageOptions };
    const filteredParams = objToURLParams(processedImageOptions);

    return `${optimizedImagePath}?${filteredParams}`;
  };
}

const imageOptimizer = new ImageOptimizer();

export { imageOptimizer };
