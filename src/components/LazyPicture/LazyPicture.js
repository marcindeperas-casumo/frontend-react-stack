// @flow
import React, { PureComponent } from "react";
import Picture from "@casumo/cmp-picture";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import Observer from "@researchgate/react-intersection-observer";
// Add intersection observer polyfill since this feature is experimental and
// some browsers might not have implemented it yet
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import "intersection-observer";

export type Images = {|
  small_image: string,
  medium_image: string,
  large_image: string,
|};

type Props = {|
  className?: string,
  images: Images,
  breakpoints?: Array<string>,
  isIntersecting: boolean,
|};

export class StatefulPicture extends PureComponent<Props> {
  render() {
    const {
      className,
      images,
      breakpoints = [
        "(max-width: 479px)",
        "(max-width: 767px)",
        "(min-width: 768px)",
      ],
      isIntersecting,
    } = this.props;

    const imgSrcs = [
      images.small_image,
      images.medium_image,
      images.large_image,
    ].map((image, i) => ({
      mediaQuery: breakpoints[i],
      src: image,
    }));

    return isIntersecting ? (
      <Picture className={className} images={imgSrcs} dpr={3} />
    ) : (
      <ResponsiveImage
        className={className}
        src={images.small_image}
        dpr={1}
        imgixOpts={{
          w: 5,
          blur: 2000,
        }}
      />
    );
  }
}

type State = {
  intersectionRatio: number,
  isIntersecting: boolean,
};

export default class LazyPicture extends React.Component<any, State> {
  state = {
    intersectionRatio: 0,
    isIntersecting: false,
  };
  // $FlowFixMe
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
        <StatefulPicture {...{ ...this.props, isIntersecting }} />
      </Observer>
    );
  }
}
