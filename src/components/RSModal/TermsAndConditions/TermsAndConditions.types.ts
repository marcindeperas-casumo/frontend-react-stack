export type TTranslations = {
  /** info that given version is outdated, text between "<#>" and "</#>" will be link to current version */
  note_version_old: string;
  /** user friendly presentation of current version number. Have to contain {version} that will be replaced */
  version_label_current: string;
  /** user friendly presentation of version number that was accepted during registration. Have to contain {version} that will be replaced */
  version_label_original: string;
  /** user friendly presentation of version number. Have to contain {version} that will be replaced */
  version_label: string;
  /** cta text to view specific version */
  button_view_version: string;
  /** user friendly presentation of date. Have to contain {date} that will be replaced */
  date_published: string;
  /** user friendly presentation of date when user registered. Have to contain {date} that will be replaced */
  date_agreed: string;
  /** user friendly presentation of date when user accepted given version. Have to contain {date} that will be replaced */
  date_changes_accepted: string;
  /** text that will be shown on download pdf button */
  button_download_pdf: string;
  /** text that will be shown on show history button */
  button_version_history: string;
  /** title before table of contents */
  table_of_contents_title: string;
  /** text that will be shown before changelog */
  changelog_title: string;
  /** title of modal component */
  terms_and_conditions_modal_title: string;
  /** text that will be shown on Accept Terms button */
  button_accept_terms: string;
};
