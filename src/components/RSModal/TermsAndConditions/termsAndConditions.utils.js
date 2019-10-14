// @flow
import * as React from "react";
import * as R from "ramda";
import { DateTime } from "luxon";
import classNames from "classnames";
import { interpolate } from "Utils";

/**
 * This one is weird. It first splits everything on h4 tags so we get array like ["", h4, smthg, h4, smthg]
 * where empty string appears only once at the beginning, h4 is section header tag and smthg is
 * stuff between 2 tags. From there we are pairing h4 with related smthg, and then we put that
 * inside div. With that our headers will appear as they are pushing themselves away instead of overlapping.
 * Last step joins everything back together.
 *
 * Why?
 * Well, we have sticky headers on the top of each section, they are using position: sticky so they
 * never actually go away. It's problematic because we can have one header that will take more than 1 line
 * and it'll be visible under next (smaller) section header.
 */
export const groupSections = R.pipe(
  R.split(/(<h4.*?h4>)/), // matching group so it'll be included in results
  R.tail, // since we are starting from match 1st element would be empty
  R.splitEvery(2),
  R.map(x => `<div>${x.join("")}</div>`),
  R.join("")
);

export function useVersion(lastVersion: number) {
  const [version, setVersion] = React.useState<number>(lastVersion);

  React.useEffect(() => {
    if (lastVersion !== null) {
      setVersion(lastVersion);
    }
  }, [lastVersion, setVersion]);

  return [version, setVersion];
}

export function formatWithDateMedium(
  text: string,
  timestamp: number,
  locale: string
) {
  return interpolate(text, {
    date: DateTime.fromMillis(timestamp)
      .setLocale(locale)
      .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS),
  });
}

export function createVersionDateFormatter(data: {
  t: { date_agreed: string, date_published: string },
  acks: {
    first: {
      version: number,
      timestamp: number,
    },
  },
  locale: string,
}) {
  return (version: number, iso8601: string) => {
    if (version === data.acks.first.version) {
      return formatWithDateMedium(
        data.t.date_agreed,
        data.acks.first.timestamp,
        data.locale
      );
    }

    return interpolate(data.t.date_published, {
      date: DateTime.fromISO(iso8601)
        .setLocale(data.locale)
        .toLocaleString(DateTime.DATE_FULL),
    });
  };
}
/*:: const __createVersionDateFormatter = createVersionDateFormatter({}); */
export type VersionDateFormatter = typeof __createVersionDateFormatter;

export function createVersionFormatter(data: {
  t: {
    version_label_current: string,
    version_label_original: string,
    version_label: string,
  },
  acks: {
    first: {
      version: number,
      timestamp: number,
    },
    last: {
      version: number,
      timestamp: number,
    },
  },
}) {
  return (version: number, versionName: string) => {
    if (version === data.acks.last.version) {
      return interpolate(data.t.version_label_current, {
        version: versionName,
      });
    }

    if (version === data.acks.first.version) {
      return interpolate(data.t.version_label_original, {
        version: versionName,
      });
    }

    return interpolate(data.t.version_label, { version: versionName });
  };
}
/*:: const __createVersionFormatter = createVersionFormatter({}); */
export type VersionFormatter = typeof __createVersionFormatter;

export function parseTableOfContents(content: string) {
  /**
   * This might be broken by new T&C export, it's important to keep this template:
   * https://cms.casumo.com/wp-admin/network/theme-editor.php?file=template-terms.php&theme=twentyfifteen
   * in sync with what is done here.
   */
  const classesForSectionHeader = classNames(
    "u-font",
    "u-font-weight-bold",
    "u-padding-y--md"
  );
  const makeId = (i: number) => `tac_${i}`;
  const el = document.createElement("html");
  // eslint-disable-next-line fp/no-mutation
  el.innerHTML = groupSections(content);
  const sections = el.getElementsByTagName("h4");

  const tableOfContents: Array<{
    href: string,
    text: string,
  }> = Array.prototype.map.call(sections, (x, i) => {
    const id = makeId(i);
    /* eslint-disable fp/no-mutation */
    x.className = classesForSectionHeader;
    x.id = id;
    /* eslint-enable fp/no-mutation */

    return {
      text: x.textContent, // there's no difference between innerText and textContent here, but innerText isn't supported in jsdom: https://github.com/jsdom/jsdom/issues/1245
      href: `#${id}`,
    };
  });

  return {
    content: el.getElementsByTagName("body")[0].innerHTML, // this was mutated inside map that made tableOfContents, now it contains ids and classes that we need
    tableOfContents,
  };
}

export function parseChangelog(changelog: string) {
  const re = /^(\d+(?:\.\d+)?)+(.*)/;

  return changelog
    .split("\n")
    .map(x => {
      try {
        const [, section, changes] = x.split(re);

        if (!section || !changes) {
          return null;
        }
        return { section, changes };
      } catch (err) {
        return null;
      }
    })
    .filter(Boolean);
}
