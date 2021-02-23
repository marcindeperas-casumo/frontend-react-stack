import { CMS_IMAGE_QUERY } from "./CmsImageContainer";

const IMAGES = [
  {
    key: "favourite-sports-selector.intro.sports",
    image:
      "https://cms.casumo.com/wp-content/uploads/2019/01/favourite-sports-selector.intro_.sport_.svg",
  },
];

const keys = IMAGES.map(({ key }) => key);
const getImageByKey = lookupKey => {
  const image = IMAGES.find(({ key }) => key === lookupKey);

  return image ? image.image : null;
};

export const cmsImageMocks = keys.map(key => ({
  request: {
    query: CMS_IMAGE_QUERY,
    variables: { key },
  },
  result: {
    data: {
      sportsCmsImage: getImageByKey(key),
    },
  },
}));
