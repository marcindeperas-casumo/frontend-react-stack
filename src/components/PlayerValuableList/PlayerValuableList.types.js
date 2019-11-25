// // @flow
// import * as A from "Types/apollo";
// import { type ValuableThumbnailTranslations } from "Models/valuables";

// type Translations = ValuableThumbnailTranslations & {
//   listTitleLabel: string,
//   availableListTitleLabel: string,
//   lockedListTitleLabel: string,
//   seeAllLabel: string,
//   noValuablesLabel: string,
// };

// export type PlayerValuableListProps = {
//   className?: string,
//   /** Error message to be log in case of error*/
//   error?: string,
//   /** Indicates whether the data has loaded or still being retrieved */
//   loading: boolean,
//   /** Text as header */
//   title?: string,
//   /** Refetch valuables function */
//   refetch?: () => void,
//   /** The list of valuables to be displayed as cards */
//   valuables: Array<A.PlayerValuableList_PlayerValuable>,
//   /** The function to be called to consume the valuable which will be triggered by each card click */
//   onConsumeValuable: string => Promise<void>,
//   /** An array of translated labels */
//   translations: Translations,
// };
