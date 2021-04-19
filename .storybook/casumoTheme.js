import { create } from "@storybook/theming";

export const color = {
  // Base
  primary: "#f05e5e",
  secondary: "#3fbfbb",
  tertiary: "#FAFBFC",
  ancillary: "#2f8f8c",

  // Complimentary
  orange: "#ff8a50",
  gold: "#ffc930",
  green: "#19ac51",
  seafoam: "#8cd9d6",
  purple: "#a85aa6",
  ultraviolet: "#004854",

  // Monochrome
  lightest: "#FFFFFF",
  lighter: "#F8F8F8",
  light: "#F3F3F3",
  mediumlight: "#eef6f6",
  medium: "#c9d6d6",
  mediumdark: "#aab8b8",
  dark: "#6f7b7b",
  darker: "#444f4f",
  darkest: "#303838",

  border: "rgba(0,0,0,.1)",

  // Status
  positive: "#47bd74",
  negative: "#bc4a4a",
  warning: "#d6a01a",

  defaultText: "#333333",
  inverseText: "#FFFFFF",
};

export const background = {
  app: "#eef6f6",
  content: color.lightest,
  hoverable: "rgba(0,0,0,.05)", // hover state for items in a list

  // Notification, error, and warning backgrounds
  positive: "#d1eedc",
  negative: "#f7d7d7",
  warning: "#fff0d9",
};

const typography = {
  fonts: {
    base: [
      '"Circular Pro"',
      "-apple-system",
      '".SFNSText-Regular"',
      '"San Francisco"',
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(", "),
    mono: [
      '"Operator Mono"',
      '"Fira Code Retina"',
      '"Fira Code"',
      '"FiraCode-Retina"',
      '"Andale Mono"',
      '"Lucida Console"',
      "Consolas",
      "Monaco",
      "monospace",
    ].join(", "),
  },
  weight: {
    regular: 400,
    bold: 700,
    black: 900,
  },
  size: {
    s1: 12,
    s2: 14,
    s3: 16,
    m1: 20,
    m2: 24,
    m3: 28,
    l1: 32,
    l2: 40,
    l3: 48,
    code: 90,
  },
};

export default create({
  base: "light",

  // Storybook-specific color palette
  colorPrimary: color.primary,
  colorSecondary: color.secondary,

  // UI
  appBg: background.app,
  appContentBg: color.lightest,
  appBorderColor: color.border,
  appBorderRadius: 4,

  // Fonts
  fontBase: typography.fonts.base,
  fontCode: typography.fonts.mono,

  // Text colors
  textColor: color.darkest,
  textInverseColor: color.lightest,

  // Toolbar default and active colors
  barTextColor: color.mediumdark,
  barSelectedColor: color.secondary,
  barBg: color.lightest,

  // Form colors
  inputBg: color.lightest,
  inputBorder: color.border,
  inputTextColor: color.darkest,
  inputBorderRadius: 4,

  // Brand logo/text
  brandImage: "images/casumo-logo.svg",
  brandTitle: "Casumo",
});
