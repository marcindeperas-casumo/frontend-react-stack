import { stringify } from "qs";

const imageDomainMappings = {
  "cms.casumo.com/wp-content/uploads": "images.casumo.com",
};

function ImageOptimizer(extraDomainSourceMappings = {}) {
  const domainSourceMappings = {
    ...imageDomainMappings,
    ...extraDomainSourceMappings,
  };

  const defaultOptions = {
    dpr: window.devicePixelRatio || 1,
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

    const filteredParams = stringify(processedImageOptions, {
      skipNulls: true,
    });

    return `${optimizedImagePath}?${filteredParams}`;
  };
}

const imageOptimizer = new ImageOptimizer();

export { imageOptimizer };
