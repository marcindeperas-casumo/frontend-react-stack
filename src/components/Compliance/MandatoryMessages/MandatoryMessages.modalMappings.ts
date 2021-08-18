import { OutOfHoursModalContainer } from "./Modal/UKGC/OutOfHoursModal/OutOfHoursModalContainer";
import { cmsSlugs } from "./MandatoryMessages.constants";

export const mappings = {
  [cmsSlugs.outOfHoursUK]: {
    slug: cmsSlugs.outOfHoursUK,
    Content: OutOfHoursModalContainer,
  },
};
