// @flow
export const generateMenu = (fields: Object) => {
  if (!fields) {
    return [];
  }
  return [
    {
      name: fields["settings_link_text"] || `Your settings`,
      link: `/player/settings`,
    },
    {
      name: fields["play_okay_settings_link_text"] || `Play Okay Settings`,
      link: `/player/play-ok-settings`,
    },
    {
      name: fields["contact_us_link_text"] || `Email us`,
      link: `mailto:hey@casumo.com`,
    },
    {
      name: fields["help_text"],
      action: () => console.warn("Logout action..."),
    },
    {
      name: fields["play_okay_link_text"] || `Play Okay`,
      link: `/play-ok`,
    },
    { name: fields["blog_menu_text"] || `Blog`, link: fields["blog_menu_url"] },
    { name: fields["faq_link_text"] || `FAQ`, link: `/faq` },
    {
      name: fields["about_us_link_text"] || `About Casumo`,
      link: `/about-casumo`,
    },
    {
      name: fields["log_out_link_text"] || `Log out`,
      action: () => console.warn("Logout action..."),
    },
  ];
};
