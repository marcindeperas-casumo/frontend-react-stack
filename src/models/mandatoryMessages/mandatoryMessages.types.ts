export type TMandatoryMessage = {
  id: string;
  /** timestamp */
  createdTime: number;
  /** corresponds to CMS page slug */
  reason: string;
  parameters: { [name: string]: any };
};
