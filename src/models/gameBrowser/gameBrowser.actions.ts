// @flow
export type Action =
  | {
      type: "SET_SCROLL_POSITION",
      scroll: number,
    }
  | {
      type: "SET_DATA",
      page: string,
      data: {},
    };

export const setScroll = (scroll: number): Action => ({
  type: "SET_SCROLL_POSITION",
  scroll,
});

export const setData = ({ page, ...data }: { page: string }): Action => ({
  type: "SET_DATA",
  page,
  data,
});
