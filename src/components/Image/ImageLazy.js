// @flow
import React from "react";
import Observer from "@researchgate/react-intersection-observer";
import type { Pictures } from "@casumo/cudl-react-prop-types";
import ImageAdaptive from "Components/Image/ImageAdaptive";
import ImageResponsive from "Components/Image/ImageResponsive";

// Add intersection observer polyfill since this feature is experimental and
// some browsers might not have implemented it yet
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import "intersection-observer";

type Props = {
  alt?: string,
  className?: string,
  src?: string,
  mark?: string,
  images?: Pictures,
  imgixOpts?: Object,
  width?: number,
  height?: number,
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

  handleChange = (
    { intersectionRatio, isIntersecting }: State,
    unobserve: Function
  ) => {
    if (isIntersecting) {
      unobserve();
    }
    this.setState({ intersectionRatio, isIntersecting });
  };

  render() {
    const { isIntersecting } = this.state;

    return (
      <Observer onChange={this.handleChange}>
        {this.props.images ? (
          <ImageAdaptive {...this.props} isIntersecting={isIntersecting} />
        ) : (
          <ImageResponsive {...this.props} isIntersecting={isIntersecting} />
        )}
      </Observer>
    );
  }
}
