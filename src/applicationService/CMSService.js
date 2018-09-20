import { compose, identity, ifElse, isNil, prop } from "ramda";

import cmsClient from "Clients/CMSClient";
import { composePromises, fromCommonHandshake } from "../lib/utils";
import commonService from "Services/CommonService";
import sessionService from "Services/SessionService";

const pullWPInterface = fromCommonHandshake("wpInterface");
const slugCache = {};

export const CMSServiceFactory = ({
  commonService,
  sessionService,
  cmsClient,
}) => {
  const cmsHashForLang = async lang =>
    composePromises(
      prop(lang),
      prop("rootContentHashes"),
      pullWPInterface,
      commonService.handshake
    )();

  const getPage = async ({ slug }) => {
    const lang = await sessionService.language();
    const hash = await cmsHashForLang(lang);

    if (!Object.keys(slugCache).includes(slug)) {
      slugCache[slug] = cmsClient.queryPage({
        slug,
        lang,
        hash,
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
  const cmsFields = prop("fields");
  const cmsField = compose(
    prop(field),
    cmsFields
  );

  const hasCMSFields = cmsResponse => !!cmsFields(cmsResponse);
  const getCMSText = ifElse(
    hasCMSFields,
    compose(
      ifElse(isNil, fallbackTextFn, identity),
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
