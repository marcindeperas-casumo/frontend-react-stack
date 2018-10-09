// @flow
import React from "react";
import type { Images } from "Components/Image/ImageAdaptive";
import ImageAdaptive from "Components/Image/ImageAdaptive";
import ImageResponsive from "Components/Image/ImageResponsive";
import Observer from "@researchgate/react-intersection-observer";
// Add intersection observer polyfill since this feature is experimental and
// some browsers might not have implemented it yet
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import "intersection-observer";

type Props = {
  images?: Images,
};

type State = {
  intersectionRatio: number,
  isIntersecting: boolean,
};

export default class ImageLazy extends React.Component<Props, State> {
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
    const { images } = this.props;

    return (
      <Observer onChange={this.handleChange}>
        {images ? (
          <ImageAdaptive {...{ ...this.props, isIntersecting }} />
        ) : (
          <ImageResponsive {...{ ...this.props, isIntersecting }} />
        )}
      </Observer>
    );
  }
}
