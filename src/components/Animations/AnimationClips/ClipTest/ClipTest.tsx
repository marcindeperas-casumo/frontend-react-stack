import React from "react";

export type TClipTestSettings = {
  name: string;
  value: number;
};

type TProps = {
  time: number;
  settings: TClipTestSettings;
};

/**
 * This is an example of an animation clip which can later be composed into full
 * animation, it takes params specific for the clip and performs an animation.
 * time - total allowed time for the animation
 * settings - specific animation clip data
 */

export const ClipTest = ({ time, settings }: TProps) => {
  return (
    <div>
      <div>This is a test "animation clip" which does nothing</div>
      <div>Name: {settings.name}</div>
      <div>Value: {settings.value}</div>
    </div>
  );
};
