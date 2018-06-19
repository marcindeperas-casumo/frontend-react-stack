import React, { Component } from "react";
import Observer from "@researchgate/react-intersection-observer";
// Add intersection observer polyfill since this feature is experimental and
// some browsers might not have implemented it yet
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import "intersection-observer";

export default class IntersectingObserverRender extends Component {
  state = {
    intersectionRatio: 0,
    isIntersecting: false
  };
  handleChange = ({ intersectionRatio, isIntersecting }, unobserve) => {
    if (isIntersecting) {
      unobserve();
    }
    this.setState({ intersectionRatio, isIntersecting });
  };

  render() {
    return (
      <Observer onChange={this.handleChange}>
        {this.props.doRender(this.state)}
      </Observer>
    );
  }
}
