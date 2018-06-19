import React from "react";
import IntersectingObserverRender from "./IntersectingObserverRender";
import DummyImage from "./DummyImage";

export default class LazyImage extends React.Component {
  renderIntersecting({ src, alt, ...rest }) {
    return <img src={src} alt={alt} {...rest} />;
  }

  renderNotIntersecting(...args) {
    // For some reason when calling this in JSX <DummyImage /> webpack will
    // enter a strange state where it keep fetching the same chunk over and over
    // again. Therefore as a workaround we will be calling the stateless
    // component as a function.
    return DummyImage(...args);
  }

  render() {
    return (
      <IntersectingObserverRender
        doRender={({ isIntersecting }) => {
          return isIntersecting
            ? this.renderIntersecting(this.props)
            : this.renderNotIntersecting(this.props);
        }}
      />
    );
  }
}
