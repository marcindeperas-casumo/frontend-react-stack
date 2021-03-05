import { useInView } from "react-intersection-observer";
import type { Pictures } from "@casumo/cudl-react-prop-types";
import React from "react";
import ImageAdaptive from "Components/Image/ImageAdaptive";
import ImageResponsive from "Components/Image/ImageResponsive";

// Add intersection observer polyfill since this feature is experimental and
// some browsers might not have implemented it yet
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import "intersection-observer";

type Props = {
  alt?: string;
  className?: string;
  src?: string;
  mark?: string;
  images?: Pictures;
  imgixOpts?: Object;
  width?: number;
  height?: number;
};

const ImageLazy = ({ images, ...props }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <React.Fragment>
      {images ? (
        <ImageAdaptive
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(node?: Element) => void' is not assignable ... Remove this comment to see the full error message
          ref={ref}
          images={images}
          isIntersecting={inView}
          {...props}
        />
      ) : (
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(node?: Element) => void' is not assignable ... Remove this comment to see the full error message
        <ImageResponsive ref={ref} {...props} isIntersecting={inView} />
      )}
    </React.Fragment>
  );
};

export default ImageLazy;
