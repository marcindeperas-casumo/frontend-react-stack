import React from "react";

export default class DummyImage extends React.Component {
  render() {
    const { src, alt, ...rest } = this.props;
    return (
      <img
        src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        alt={alt}
        {...rest}
      />
    );
  }
}
