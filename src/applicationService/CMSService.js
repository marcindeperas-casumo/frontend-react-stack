import { composePromises, property } from "../utils";
import commonService from "./CommonService";
import sessionService from "./SessionService";
import cmsClient from "../serviceClients/CMSClient";

const fromCommonHandshake = k => property(`common/composition/${k}`);
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

  const getPage = ({ slug }) =>
    new Promise(async resolve => {
      const country = await sessionService.country();
      const hash = await cmsHashForLang(country);

      setTimeout(() => {
        if (!Object.keys(slugCache).includes(slug)) {
          slugCache[slug] = cmsClient.queryPage({
            slug,
            lang: country,
            hash: hash,
          });
        }

        return resolve(slugCache[slug]);
      }, 1);
    });

  return { cmsHashForLang, getPage };
};

export default CMSServiceFactory({
  commonService,
  cmsClient,
  sessionService,
});
