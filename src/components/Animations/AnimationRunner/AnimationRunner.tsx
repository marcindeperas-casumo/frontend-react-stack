import React from "react";
import type {
  AnimationClipProps,
  AvailableAnimationClipsProps,
} from "../constants";
import { AnimationStep } from "./AnimationStep";

import "./AnimationRunner.scss";

type TProps = {
  animation: Array<AnimationClipProps<AvailableAnimationClipsProps>>;
  onNextStep?: (step: number) => void;
  onAnimationDone?: () => void;
  start?: boolean;
};

const VisibilityControler = function (currentlyVisibleSteps): void {
  const newState = {};

  this.add = idx => {
    // eslint-disable-next-line fp/no-mutation
    newState[idx] = true;
  };
  this.remove = idx => {
    // eslint-disable-next-line fp/no-mutation
    newState[idx] = false;
  };
  this.dispatch = dispatcher => {
    dispatcher({ ...currentlyVisibleSteps, ...newState });
  };
};

const animationStepsVisibilityMapper = animation =>
  animation.reduce((acc, cur, idx) => {
    return {
      ...acc,
      [idx]: false,
    };
  }, {});

export const AnimationRunner = ({
  animation,
  onNextStep = () => {},
  onAnimationDone = () => {},
  start = true,
}: TProps) => {
  const [visibleSteps, setVisibleSteps] = React.useState(
    animationStepsVisibilityMapper(animation)
  );

  React.useEffect(() => {
    if (start) {
      setVisibleSteps({
        ...visibleSteps,
        0: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  const haveNextStep = (idx: number): boolean => animation.length > idx + 1;

  const showNext = (idx: number) => {
    const controler = new VisibilityControler(visibleSteps);
    const current = animation[idx];
    const next = animation[idx + 1];

    if (haveNextStep(idx)) {
      controler.add(idx + 1);
      if (!next.isTransition || current.isTransition) {
        controler.remove(idx);
      }
    } else {
      onAnimationDone();
    }

    if (current.isTransition) {
      controler.remove(idx - 1);
    }

    controler.dispatch(setVisibleSteps);
  };

  const makeTransition = (idx: number) => {
    const controler = new VisibilityControler(visibleSteps);
    controler.remove(idx - 1);
    controler.add(idx + 1);

    controler.dispatch(setVisibleSteps);
  };

  return (
    <>
      {start &&
        animation.map((step, idx) =>
          visibleSteps[idx] ? (
            <AnimationStep
              key={idx}
              config={step}
              onShowNext={() => showNext(idx)}
              onTransition={() => makeTransition(idx)}
            />
          ) : null
        )}
    </>
  );
};
