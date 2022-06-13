export type TGetPageBySlugArg = {
  slug: string;
  withChildren?: boolean;
  language?: string;
};

export type TCmsPage = {
  id: string;
  content: string;
  slug: string;
  title: string;
  fields: {
    [k: string]: any;
  };
  custom_fields: {
    [k: string]: any;
  };
  children: Array<TCmsPage>;
};

export type TGetPageBySlugResponse = TCmsPage;
