import { composePromises, property } from "../utils";
import commonService from "./CommonService";
import sessionService from "./SessionService";
import cmsClient from "../serviceClients/CMSClient";

const fromCommonHandshake = k => property(`common/composition/${k}`);

const pullWPInterface = fromCommonHandshake("wpInterface");

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

  const getPage = async ({ slug }) =>
    cmsClient.queryPage({
      slug,
      lang: await sessionService.country(),
      hash: await cmsHashForLang(await sessionService.country()),
    });

  return { cmsHashForLang, getPage };
};

export default CMSServiceFactory({
  commonService,
  cmsClient,
  sessionService,
});
