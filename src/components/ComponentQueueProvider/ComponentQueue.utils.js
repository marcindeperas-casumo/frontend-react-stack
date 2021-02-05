// @flow
import * as R from "ramda";

export function bubbleSort(queue, sortOnPath, reverse = false) {
  queue.map(_ =>
    queue.map((__, i) => {
      // make sure there is another element to compare with
      if (
        queue[i + 1] &&
        R.pathOr(0, sortOnPath, queue[i]) >
          R.pathOr(0, sortOnPath, queue[i + 1])
      ) {
        // comparing adjacent elements and swap by destructure
        // eslint-disable-next-line fp/no-mutation
        [queue[i], queue[i + 1]] = [queue[i + 1], queue[i]];
      }
    })
  );
  return reverse ? queue.reverse : queue;
}
