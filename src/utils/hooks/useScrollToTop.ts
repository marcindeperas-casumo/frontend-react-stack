import { useEffect } from "react";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";

type TScrollToTopParams = {
  triggerScrollProp: any;
  scrollElementId?: string;
};

export const useScrollToTop = ({
  triggerScrollProp,
  scrollElementId = ROOT_SCROLL_ELEMENT_ID,
}: TScrollToTopParams) => {
  useEffect(() => {
    const scrollElement = document.getElementById(scrollElementId);

    if (scrollElement) {
      try {
        scrollElement.scroll({ top: 0 });
      } catch (error) {
        // eslint-disable-next-line fp/no-mutation
        scrollElement.scrollTop = 0;
      }
    }
  }, [scrollElementId, triggerScrollProp]);
};
