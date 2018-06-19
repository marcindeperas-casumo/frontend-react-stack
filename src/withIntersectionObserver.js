import React, { Component } from "react";
import Observer from "@researchgate/react-intersection-observer";
// Add intersection observer polyfill since this feature is experimental and
// some browsers might not have implemented it yet
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import "intersection-observer";

export default threshold => BaseComponent => {
  const displayName =
    BaseComponent.displayName || BaseComponent.name || "Component";

  return class WithIntersectionObserver extends Component {
    static displayName = `withIntersectionObserver(${displayName})`;

    state = {
      isIntersecting: false
    };

    handleChange = ({ isIntersecting, intersectionRatio }, unobserve) => {
      if (isIntersecting) {
        unobserve();
      }
      this.setState({
        isIntersecting: isIntersecting && intersectionRatio >= threshold
      });
    };

    render() {
      return (
        <Observer onChange={this.handleChange} threshold={threshold}>
          <BaseComponent
            {...this.props}
            isVisible={this.state.isIntersecting}
          />
        </Observer>
      );
    }
  };
};
