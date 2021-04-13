import { storiesOf } from "@storybook/react";
import React from "react";
import MaskImage from "./MaskImage";

const stories = storiesOf("MaskImage", module);

const Shape = () => (
  <path d="M46.0199 66.5099C26.5859 66.9646 8.11145 67.6742 2.06447 67.916C0.927926 67.9615 0 67.0518 0 65.9144V10C0 4.47715 4.47715 0 10 0H134C139.523 0 144 4.47715 144 10V65.9011C144 67.0435 143.062 67.9553 141.921 67.9034C135.889 67.6291 117.575 66.8374 98.0838 66.4039C97.9959 66.4949 97.9063 66.5846 97.8149 66.6729L87.1967 76.9244C85.158 78.8931 82.3919 80 79.507 80H64.4921C61.6081 80 58.842 78.8931 56.8024 76.9244L46.1851 66.6729C46.1294 66.6191 46.0743 66.5648 46.0199 66.5099Z" />
);

const TextShape = () => (
  <path d="M35.568,22.56 L41.088,0.72 L48.864,0.72 L39.6,34.752 L31.776,34.752 L24.528,12.192 L17.232,34.752 L9.264,34.752 L0,0.72 L8.064,0.72 L13.68,22.512 L20.736,0.72 L28.512,0.72 L35.568,22.56 Z M58.08,19.968 L67.632,19.968 C67.536,18.144 66.288,15.936 62.832,15.936 C59.76,15.936 58.224,18.192 58.08,19.968 Z M68.16,26.16 L74.256,27.888 C73.104,32.016 69.312,35.472 63.264,35.472 C56.688,35.472 50.832,30.768 50.832,22.752 C50.832,15.072 56.544,10.176 62.736,10.176 C70.128,10.176 74.688,14.736 74.688,22.416 C74.688,23.424 74.592,24.528 74.544,24.672 L57.936,24.672 C58.08,27.36 60.528,29.28 63.36,29.28 C66,29.28 67.488,28.032 68.16,26.16 Z M86.688,34.752 L79.392,34.752 L79.392,0 L86.688,0 L86.688,34.752 Z M104.112,16.896 C101.088,16.896 98.64,19.008 98.64,22.848 C98.64,26.64 101.184,28.752 104.208,28.752 C107.04,28.752 108.624,26.976 109.152,25.2 L115.584,27.168 C114.528,31.344 110.592,35.472 104.208,35.472 C97.104,35.472 91.392,30.24 91.392,22.848 C91.392,15.408 96.96,10.176 103.968,10.176 C110.544,10.176 114.384,14.208 115.44,18.48 L108.912,20.448 C108.384,18.624 106.944,16.896 104.112,16.896 Z M130.992,28.752 C133.776,28.752 136.368,26.832 136.368,22.8 C136.368,18.768 133.776,16.896 130.992,16.896 C128.256,16.896 125.616,18.768 125.616,22.8 C125.616,26.784 128.256,28.752 130.992,28.752 Z M130.992,10.176 C138.144,10.176 143.664,15.408 143.664,22.8 C143.664,30.192 138.144,35.472 130.992,35.472 C123.888,35.472 118.32,30.192 118.32,22.8 C118.32,15.408 123.888,10.176 130.992,10.176 Z M155.664,34.752 L148.368,34.752 L148.368,10.896 L155.328,10.896 L155.328,13.632 C156.528,11.52 159.6,10.176 162.192,10.176 C165.6,10.176 168.048,11.568 169.248,13.92 C171.12,11.232 173.424,10.176 176.64,10.176 C181.152,10.176 185.472,12.816 185.472,19.296 L185.472,34.752 L178.416,34.752 L178.416,20.928 C178.416,18.672 177.216,16.896 174.624,16.896 C172.032,16.896 170.64,18.864 170.64,20.976 L170.64,34.752 L163.44,34.752 L163.44,20.928 C163.44,18.672 162.24,16.896 159.6,16.896 C157.056,16.896 155.664,18.864 155.664,21.024 L155.664,34.752 Z M197.136,19.968 L206.688,19.968 C206.592,18.144 205.344,15.936 201.888,15.936 C198.816,15.936 197.28,18.192 197.136,19.968 Z M207.216,26.16 L213.312,27.888 C212.16,32.016 208.368,35.472 202.32,35.472 C195.744,35.472 189.888,30.768 189.888,22.752 C189.888,15.072 195.6,10.176 201.792,10.176 C209.184,10.176 213.744,14.736 213.744,22.416 C213.744,23.424 213.648,24.528 213.6,24.672 L196.992,24.672 C197.136,27.36 199.584,29.28 202.416,29.28 C205.056,29.28 206.544,28.032 207.216,26.16 Z M238.992,3.936 L238.992,10.896 L243.648,10.896 L243.648,17.28 L238.992,17.28 L238.992,26.208 C238.992,28.176 240.048,28.704 241.632,28.704 C242.4,28.704 243.12,28.56 243.552,28.464 L243.552,34.512 C243.264,34.656 242.064,35.184 239.76,35.184 C234.816,35.184 231.792,32.256 231.792,27.504 L231.792,17.28 L227.568,17.28 L227.568,10.896 L228.768,10.896 C231.264,10.896 232.464,9.216 232.464,7.008 L232.464,3.936 L238.992,3.936 Z M259.536,28.752 C262.32,28.752 264.912,26.832 264.912,22.8 C264.912,18.768 262.32,16.896 259.536,16.896 C256.8,16.896 254.16,18.768 254.16,22.8 C254.16,26.784 256.8,28.752 259.536,28.752 Z M259.536,10.176 C266.688,10.176 272.208,15.408 272.208,22.8 C272.208,30.192 266.688,35.472 259.536,35.472 C252.432,35.472 246.864,30.192 246.864,22.8 C246.864,15.408 252.432,10.176 259.536,10.176 Z M297.456,3.936 L297.456,10.896 L302.112,10.896 L302.112,17.28 L297.456,17.28 L297.456,26.208 C297.456,28.176 298.512,28.704 300.096,28.704 C300.864,28.704 301.584,28.56 302.016,28.464 L302.016,34.512 C301.728,34.656 300.528,35.184 298.224,35.184 C293.28,35.184 290.256,32.256 290.256,27.504 L290.256,17.28 L286.032,17.28 L286.032,10.896 L287.232,10.896 C289.728,10.896 290.928,9.216 290.928,7.008 L290.928,3.936 L297.456,3.936 Z M314.352,20.736 L314.352,34.752 L307.056,34.752 L307.056,0 L314.352,0 L314.352,12.432 C315.84,10.944 318.336,10.272 320.448,10.272 C326.688,10.272 329.472,14.544 329.472,19.776 L329.472,34.752 L322.176,34.752 L322.176,21.024 C322.176,18.672 320.928,16.896 318.288,16.896 C315.984,16.896 314.496,18.528 314.352,20.736 Z M341.136,19.968 L350.688,19.968 C350.592,18.144 349.344,15.936 345.888,15.936 C342.816,15.936 341.28,18.192 341.136,19.968 Z M351.216,26.16 L357.312,27.888 C356.16,32.016 352.368,35.472 346.32,35.472 C339.744,35.472 333.888,30.768 333.888,22.752 C333.888,15.072 339.6,10.176 345.792,10.176 C353.184,10.176 357.744,14.736 357.744,22.416 C357.744,23.424 357.648,24.528 357.6,24.672 L340.992,24.672 C341.136,27.36 343.584,29.28 346.416,29.28 C349.056,29.28 350.544,28.032 351.216,26.16 Z M372,24.24 L372,21.984 L379.2,20.736 L379.2,23.856 C379.2,26.88 381.12,28.272 383.328,28.272 C385.824,28.272 387.312,26.448 387.312,23.904 L387.312,0.72 L394.896,0.72 L394.896,24.096 C394.896,30.288 390.144,35.472 383.376,35.472 C376.656,35.472 372,31.008 372,24.24 Z M416.928,34.752 C416.832,34.32 416.736,32.976 416.736,32.352 C415.488,34.416 412.752,35.28 410.352,35.28 C404.544,35.28 401.28,31.056 401.28,25.968 L401.28,10.896 L408.576,10.896 L408.576,24.432 C408.576,26.736 409.824,28.56 412.416,28.56 C414.864,28.56 416.4,26.88 416.4,24.48 L416.4,10.896 L423.696,10.896 L423.696,30.48 C423.696,32.64 423.888,34.368 423.936,34.752 L416.928,34.752 Z M437.424,21.072 L437.424,34.752 L430.128,34.752 L430.128,10.896 L437.184,10.896 L437.184,13.632 C438.48,11.376 441.408,10.272 443.856,10.272 C449.856,10.272 452.544,14.544 452.544,19.776 L452.544,34.752 L445.248,34.752 L445.248,21.024 C445.248,18.672 444,16.896 441.36,16.896 C438.96,16.896 437.424,18.672 437.424,21.072 Z M457.008,36.096 L463.44,34.272 C463.92,36.576 465.84,38.256 468.576,38.256 C472.224,38.256 474.48,36.48 474.48,32.16 L474.48,31.056 C473.616,32.352 471.552,33.744 468.096,33.744 C461.76,33.744 457.008,28.752 457.008,22.128 C457.008,15.84 461.568,10.464 468.096,10.464 C471.984,10.464 474.048,12.192 474.72,13.44 L474.72,10.896 L481.68,10.896 L481.68,31.776 C481.68,38.64 477.84,44.592 468.912,44.592 C462.048,44.592 457.68,40.368 457.008,36.096 Z M469.44,27.408 C472.416,27.408 474.528,25.392 474.528,22.128 C474.528,18.864 472.176,16.848 469.44,16.848 C466.704,16.848 464.304,18.864 464.304,22.128 C464.304,25.392 466.512,27.408 469.44,27.408 Z M495.12,34.752 L487.824,34.752 L487.824,0 L495.12,0 L495.12,34.752 Z M507.072,19.968 L516.624,19.968 C516.528,18.144 515.28,15.936 511.824,15.936 C508.752,15.936 507.216,18.192 507.072,19.968 Z M517.152,26.16 L523.248,27.888 C522.096,32.016 518.304,35.472 512.256,35.472 C505.68,35.472 499.824,30.768 499.824,22.752 C499.824,15.072 505.536,10.176 511.728,10.176 C519.12,10.176 523.68,14.736 523.68,22.416 C523.68,23.424 523.584,24.528 523.536,24.672 L506.928,24.672 C507.072,27.36 509.52,29.28 512.352,29.28 C514.992,29.28 516.48,28.032 517.152,26.16 Z M537.84,0.72 L536.16,24.096 L530.784,24.096 L529.104,0.72 L537.84,0.72 Z M529.296,31.104 C529.296,28.8 531.12,26.928 533.424,26.928 C535.728,26.928 537.6,28.8 537.6,31.104 C537.6,33.36 535.728,35.232 533.424,35.232 C531.12,35.232 529.296,33.36 529.296,31.104 Z M554.4,0.72 L552.72,24.096 L547.344,24.096 L545.664,0.72 L554.4,0.72 Z M545.856,31.104 C545.856,28.8 547.68,26.928 549.984,26.928 C552.288,26.928 554.16,28.8 554.16,31.104 C554.16,33.36 552.288,35.232 549.984,35.232 C547.68,35.232 545.856,33.36 545.856,31.104 Z M570.96,0.72 L569.28,24.096 L563.904,24.096 L562.224,0.72 L570.96,0.72 Z M562.416,31.104 C562.416,28.8 564.24,26.928 566.544,26.928 C568.848,26.928 570.72,28.8 570.72,31.104 C570.72,33.36 568.848,35.232 566.544,35.232 C564.24,35.232 562.416,33.36 562.416,31.104 Z" />
);

const imageUrl =
  "https://cms.casumo.com/wp-content/uploads/2019/04/background-spins.png";

const textImageUrl =
  "https://cms.casumo.com/wp-content/uploads/2019/03/push-curated_component-tablet.png";

stories.add("Default", () => (
  <div style={{ maxWidth: 144 }}>
    <MaskImage id="123" width={144} height={80} imageUrl={imageUrl}>
      <Shape />
    </MaskImage>
  </div>
));

stories.add("Text", () => (
  <div style={{ maxWidth: 571 }}>
    <MaskImage id="234" width={571} height={45} imageUrl={textImageUrl}>
      <TextShape />
    </MaskImage>
  </div>
));