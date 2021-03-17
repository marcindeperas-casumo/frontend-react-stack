import {
  CasinoTabSelectedIcon,
  CasumoProfileIcon,
  FootballIcon,
  AvatarIcon,
  AlertIcon,
} from "@casumo/cmp-icons";

export const navItems = [
  {
    icon: CasinoTabSelectedIcon,
    label: "Casino",
    to: "/casino",
  },
  {
    icon: FootballIcon,
    label: "Sports",
    to: "/sports",
  },
  {
    icon: CasumoProfileIcon,
    label: "Samuel L. Jackson",
    to: "/profile",
  },
];

export const dropdownItems = [
  {
    Icon: AvatarIcon,
    label: "Samuel L. Jackson",
    description: "Lvl 19",
    to: "/account",
  },
  { label: "Account", to: "/account" },
  {
    label: "Bonuses",
    description: "2 bonuses available",
    DescriptionIcon: AlertIcon,
    to: "/player/valuables",
  },
  {
    label: "Set Limits",
    description: "1 limit expiring",
    DescriptionIcon: AlertIcon,
    to: "/player/play-okay-settings",
  },
  { label: "Play Okay", to: "/player/play-okay-settings" },
  { label: "Help", to: "/faq" },
  { label: "Logout", to: "/logout" },
];
