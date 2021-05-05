export type Action =
  | {
      type: "SET_SCROLL_POSITION";
      path: string;
      scroll: number;
    }
  | {
      type: "SET_DATA";
      path: string;
      page: string;
      data: {};
    };

export const setScroll = (path: string) => (scroll: number): Action => ({
  type: "SET_SCROLL_POSITION",
  path,
  scroll,
});

export const setData = (path: string) => ({
  page,
  ...data
}: {
  page: string;
  filters?: { [s: string]: boolean | any };
}): Action => ({
  type: "SET_DATA",
  path,
  page,
  data,
});
