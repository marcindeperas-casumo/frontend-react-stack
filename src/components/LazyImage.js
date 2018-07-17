import React from "react";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import Observer from "@researchgate/react-intersection-observer";
// Add intersection observer polyfill since this feature is experimental and
// some browsers might not have implemented it yet
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import "intersection-observer";

class StatefulResponsiveImage extends React.Component {
  render() {
    const { isIntersecting, ...rest } = this.props;

    return isIntersecting ? (
      <ResponsiveImage {...rest} />
    ) : (
      <ResponsiveImage
        {...rest}
        mark={null}
        dpr={1}
        imgixOpts={{
          w: 19,
          blur: 2000,
        }}
      />
    );
  }
}

export default class LazyImage extends React.Component {
  state = {
    intersectionRatio: 0,
    isIntersecting: false,
  };

  handleChange = ({ intersectionRatio, isIntersecting }, unobserve) => {
    if (isIntersecting) {
      unobserve();
    }
    this.setState({ intersectionRatio, isIntersecting });
  };

  render() {
    const { isIntersecting } = this.state;

    return (
      <Observer onChange={this.handleChange}>
        <StatefulResponsiveImage {...{ ...this.props, isIntersecting }} />
      </Observer>
    );
  }
}
