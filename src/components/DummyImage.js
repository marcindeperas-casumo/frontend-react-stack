import React from "react";

export default ({ src, alt, ...rest }) => (
  <img
    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    alt={alt}
    {...rest}
  />
);
