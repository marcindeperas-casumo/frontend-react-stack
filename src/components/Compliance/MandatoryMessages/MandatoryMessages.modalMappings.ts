import { OutOfHoursContainer } from "./Modal/UKGC/OutOfHours/OutOfHoursContainer";
import { cmsSlugs } from "./MandatoryMessages.constants";

export const mappings = {
  [cmsSlugs.outOfHoursUK]: {
    slug: cmsSlugs.outOfHoursUK,
    Content: OutOfHoursContainer,
  },
};
