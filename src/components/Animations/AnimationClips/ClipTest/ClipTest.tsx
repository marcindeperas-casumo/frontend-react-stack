import React from "react";
import type { AnimationClipProps } from "../../constants";

export type TClipTestSettings = {
  name: string;
  value: number;
};

type TProps = {
  config: AnimationClipProps<TClipTestSettings>;
  onShowNext: () => void;
};

/**
 * This is an example of an animation clip which can later be composed into full
 * animation, it takes params specific for the clip and performs an animation.
 * time - total allowed time for the animation
 * settings - specific animation clip data
 */

export const ClipTest = ({ config, onShowNext }: TProps) => {
  return (
    <div>
      <div>
        Value: {config.settings.value} {config.settings.name}
      </div>
    </div>
  );
};
