// @flow
export const generateMenu = (fields: Object) => {
  if (!fields) {
    return [];
  }
  return [
    {
      name: fields["settings_link_text"] || `Your settings`,
      link: `/somewhere/settings`, //TODO: link needed
    },
    {
      name: fields["play_okay_settings_link_text"] || `Play Okay Settings`,
      link: `/somewhere/settingsok`, //TODO: link needed
    },
    {
      name: fields["contact_us_link_text"] || `Email us`,
      link: `mailto:hey@casumo.com`,
    },
    { name: fields["help_text"], link: `/somewhere/chat/` },
    {
      name: fields["play_okay_link_text"] || `Play Okay`,
      link: `/somewhere/pok`,
    }, //TODO: LINK NEEDED
    { name: fields["blog_menu_text"] || `Blog`, link: fields["blog_menu_url"] },
    { name: fields["faq_link_text"] || `FAQ`, link: `/somewhere/faq` }, //TODO: LINK NEEDED
    {
      name: fields["about_us_link_text"] || `About Casumo`,
      link: `/somewhere/about`,
    }, //TODO: link needed
    {
      name: fields["log_out_link_text"] || `Log out`,
      link: `/somewhere/logout`,
    }, //TODO: log out action
  ];
};
