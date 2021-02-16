import * as R from "ramda";

export function bubbleSort(queue, sortKeyPath, reverse = false) {
  queue.forEach(_ =>
    queue.forEach((__, i) => {
      // make sure there is another element to compare with
      if (
        queue[i + 1] &&
        R.pathOr(0, sortKeyPath, queue[i]) >
          R.pathOr(0, sortKeyPath, queue[i + 1])
      ) {
        // comparing adjacent elements and swap by destructure
        // eslint-disable-next-line fp/no-mutation
        [queue[i], queue[i + 1]] = [queue[i + 1], queue[i]];
      }
    })
  );

  // eslint-disable-next-line fp/no-mutating-methods
  return reverse ? queue.reverse() : queue;
}
