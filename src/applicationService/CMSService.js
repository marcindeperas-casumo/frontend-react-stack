import cmsClient from "../serviceClients/CMSClient";
import {
  compose,
  composePromises,
  fromCommonHandshake,
  property,
  ifThenElse,
  isNullOrUndefined,
  identity,
} from "../lib/utils";
import commonService from "./CommonService";
import sessionService from "./SessionService";

const pullWPInterface = fromCommonHandshake("wpInterface");
const slugCache = {};

export const CMSServiceFactory = ({
  commonService,
  sessionService,
  cmsClient,
}) => {
  const cmsHashForLang = async lang =>
    composePromises(
      property(lang),
      property("rootContentHashes"),
      pullWPInterface,
      commonService.handshake
    )();

  const getPage = async ({ slug }) => {
    const country = await sessionService.country();
    const hash = await cmsHashForLang(country);

    if (!Object.keys(slugCache).includes(slug)) {
      slugCache[slug] = cmsClient.queryPage({
        slug,
        lang: country,
        hash: hash,
      });
    }

    return slugCache[slug];
  };

  return { cmsHashForLang, getPage };
};

const service = CMSServiceFactory({
  commonService,
  cmsClient,
  sessionService,
});

export const getCMSField = ({ slug, field, fallbackTextFn }) => {
  const cmsFields = property("fields");
  const cmsField = compose(
    property(field),
    cmsFields
  );

  const hasCMSFields = cmsResponse => !!cmsFields(cmsResponse);
  const getCMSText = ifThenElse(
    hasCMSFields,
    compose(
      ifThenElse(isNullOrUndefined, fallbackTextFn, identity),
      cmsField
    ),
    fallbackTextFn
  );

  return service
    .getPage({ slug })
    .then(getCMSText)
    .catch(e => {
      // There is room for improvement here, better ways to track failing
      // promisees.
      console.error({ e });
      return fallbackTextFn();
    });
};

export default service;
