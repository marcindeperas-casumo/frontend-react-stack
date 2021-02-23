import { types } from "Models/cms";

export const getFetchTypeBySlug = slug => `${types.FETCH_PAGE_BY_SLUG}-${slug}`;

export const getFetchCompleteTypeBySlug = slug =>
  `${types.FETCH_PAGE_BY_SLUG_COMPLETE}-${slug}`;

export const getChildren = page => {
  const { children = [] } = page;
  const parentSlug = page.slug.replace(".*", "");

  return children.map(child => setSlug(child, `${parentSlug}.${child.slug}`));
};

export const getChildrenAndParent = page => {
  const children = getChildren(page);
  const parent = { ...page, children: [] };

  return [parent, ...children];
};

export const setSlug = (page, slug) => ({
  ...page,
  slug: slug.replace(".*", ""),
});
