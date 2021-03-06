import { curry } from "ramda";
type MixpanelConfig = {
  mixpanelToken: string;
  mixpanelProjectName: string;
};
const noop = (...args: Array<any>) => {};
const getMixpanel = (mixpanelProjectName: string) =>
  (window as any).mixpanel || {
    init: noop,
    [mixpanelProjectName]: {
      register: noop,
      track: noop,
    },
  };
const getProjectMixpanel = (config: MixpanelConfig) => {
  const { mixpanelProjectName } = config;
  const mixpanel = getMixpanel(mixpanelProjectName);
  return mixpanel[mixpanelProjectName];
};
// eslint-disable-next-line sonarjs/cognitive-complexity
const loadMixpanelIfNeeded = () => {
  if ((window as any).mixpanel) {
    return;
  }
  /* eslint-disable curly, eqeqeq, fp/no-arguments, fp/no-loops, fp/no-mutating-methods, fp/no-mutation, no-cond-assign, no-empty, no-nested-ternary, no-restricted-globals, no-shadow, no-unused-expressions, no-var, prettier/prettier */
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mixpanel' does not exist on type 'Window... Remove this comment to see the full error message
  (function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)c(e,l[h]);var f="set set_once union unset remove delete".split(" ");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
  /* eslint-enable */
};
const initMixpanel = (config: MixpanelConfig) => {
  const { mixpanelToken, mixpanelProjectName } = config;
  getMixpanel(mixpanelProjectName).init(mixpanelToken, {}, mixpanelProjectName);
};
const track = curry(
  (config: MixpanelConfig, event: string, data: Object = {}) => {
    getProjectMixpanel(config).track(event, data);
  }
);
const setState = curry((config: MixpanelConfig, data: Object) => {
  getProjectMixpanel(config).register(data);
});
const trackerAdapterMixpanel = (
  config: MixpanelConfig,
  loadMixpanel: Function = loadMixpanelIfNeeded
) => {
  loadMixpanel();
  initMixpanel(config);
  return {
    track: track(config),
    setState: setState(config),
  };
};
export default trackerAdapterMixpanel;
