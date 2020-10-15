// @flow
import * as React from "react";
import cx from "classnames";
import { FlashingCircle } from "../FlashingCircle";
import { Points } from "../Points";
import { useIsTransitioning } from "./useIsTransitioning";
import "../ReelRaceBooster.scss";
import "./MegaWinsBooster.scss";

type Props = {
  className?: string,
  megaWins: number,
};

const baseClassName = "c-rr-booster";
const baseModClassName = `${baseClassName}--mega-wins`;

export function MegaWinsBooster({ className, megaWins }: Props) {
  const { isTransitioning } = useIsTransitioning({ megaWins });

  return (
    <div className={cx(baseClassName, baseModClassName, className)}>
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <FlashingCircle isTransitioning={isTransitioning} />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="currentColor"
          className={cx(
            `${baseClassName}__arc`,
            isTransitioning ? "t-color-teal-50" : "t-color-black t-opacity--25"
          )}
          d="M22.1494 0.10041C21.2239 -0.0707035 20.2664 -0.00455031 19.3619 0.30102C18.5537 0.57409 17.8192 1.02776 17.2066 1.62371C16.8735 1.94782 16.5764 2.31401 16.3232 2.71613L14.6953 5.32103C14.2868 5.97299 13.7632 6.52963 13.1583 6.96552C13.1566 6.96673 13.1549 6.96794 13.1532 6.96915L13.152 6.97005C13.1488 6.97235 13.1456 6.97466 13.1424 6.97695C12.6107 7.35727 12.0168 7.64458 11.3833 7.82173L8.51581 8.61622C8.02564 8.7542 7.55875 8.95807 7.12584 9.22018C6.43932 9.63585 5.83825 10.198 5.3653 10.8759C4.9991 11.4008 4.7202 11.9802 4.53545 12.59C4.33114 13.2643 4.24196 13.9759 4.27717 14.6921L4.40239 17.779C4.43769 18.4745 4.35565 19.165 4.16536 19.821C4.16083 19.8366 4.15623 19.8522 4.15158 19.8678C4.12416 19.9596 4.09461 20.0507 4.06296 20.141C4.05962 20.1506 4.05626 20.1601 4.05287 20.1696C3.84103 20.7648 3.53774 21.3259 3.15021 21.8296L1.27193 24.2391C0.79517 24.8545 0.44395 25.5575 0.232762 26.3052C0.079278 26.8487 -0.000244141 27.4158 -0.000244141 27.9902C-0.000244141 28.5627 0.0787541 29.1279 0.231245 29.6697C0.442266 30.4195 0.794026 31.1243 1.27193 31.7412L3.15021 34.1507C3.53956 34.6559 3.8439 35.2191 4.05591 35.8167C4.05885 35.8249 4.06177 35.8332 4.06467 35.8415C4.09603 35.9311 4.12531 36.0215 4.1525 36.1125C4.15752 36.1293 4.16246 36.1461 4.16733 36.163C4.3568 36.8178 4.43818 37.5071 4.40239 38.2014L4.27717 41.2882C4.238 42.0115 4.32591 42.7306 4.53145 43.412C4.71482 44.0198 4.99179 44.5975 5.35568 45.1213C5.83086 45.8054 6.43643 46.372 7.12868 46.7897C7.56082 47.0504 8.02674 47.2531 8.51581 47.3901L11.3833 48.1977C12.0054 48.3713 12.5896 48.6511 13.1142 49.021C13.121 49.0257 13.1277 49.0305 13.1344 49.0353C13.1375 49.0375 13.1406 49.0397 13.1437 49.0419C13.1488 49.0456 13.154 49.0493 13.1592 49.053C13.7508 49.4787 14.265 50.0198 14.6703 50.6528L16.2981 53.2577C16.5534 53.6661 16.8539 54.0378 17.1914 54.3662C17.8036 54.9619 18.5379 55.4154 19.346 55.6882C20.2462 55.9921 21.1989 56.0585 22.1201 55.8898C22.4816 55.8235 22.8383 55.7211 23.1851 55.5825L25.9775 54.4755C26.5929 54.2323 27.2383 54.1027 27.8858 54.0864C27.9065 54.0859 27.9272 54.0855 27.9479 54.0852C27.9961 54.0846 28.0443 54.0845 28.0926 54.0851C28.0947 54.0851 28.0968 54.0852 28.0989 54.0852C28.7681 54.0941 29.4361 54.2242 30.0721 54.4755L32.8269 55.6021C33.1682 55.7384 33.5191 55.8398 33.8748 55.9061C34.8013 56.0789 35.7602 56.0135 36.6661 55.7077C37.4808 55.4327 38.2205 54.974 38.8358 54.371C39.1672 54.0462 39.4625 53.6796 39.7139 53.2772L41.181 50.9295L41.3418 50.6723C41.7483 50.0313 42.2662 49.4835 42.8633 49.0533C42.8683 49.0497 42.8733 49.0462 42.8783 49.0426C42.8823 49.0397 42.8864 49.0367 42.8905 49.0338C42.8953 49.0304 42.9001 49.027 42.905 49.0236C43.4292 48.6529 44.013 48.3722 44.635 48.1977L47.5087 47.3706C47.9961 47.2329 48.4603 47.0302 48.8911 46.7699C49.5792 46.354 50.1817 45.7913 50.6558 45.1124C51.0268 44.5812 51.3084 43.9941 51.4936 43.3762C51.6932 42.7101 51.7808 42.0081 51.7474 41.3012L51.5971 38.2144C51.562 37.506 51.6482 36.803 51.8461 36.1362L51.8473 36.1322C51.8751 36.0388 51.9051 35.946 51.9373 35.8541C51.9413 35.8427 51.9453 35.8313 51.9494 35.82C52.161 35.2264 52.4634 34.6666 52.8493 34.1638L54.7276 31.7542C55.2047 31.1383 55.5561 30.4347 55.7673 29.6863C55.9204 29.1434 55.9998 28.5769 55.9998 28.0032C55.9998 27.43 55.9206 26.8642 55.7678 26.3218C55.5567 25.5727 55.2051 24.8685 54.7276 24.2521L52.8493 21.8426C52.4644 21.3402 52.1626 20.7813 51.9511 20.1886C51.9466 20.176 51.9421 20.1634 51.9377 20.1508C51.9052 20.0578 51.8749 19.9639 51.8468 19.8693C51.6491 19.2029 51.5626 18.5 51.5971 17.792L51.7474 14.7052C51.781 13.9964 51.6932 13.2925 51.4928 12.6246C51.3077 12.0077 51.0265 11.4217 50.6564 10.8911C50.1819 10.211 49.5787 9.64712 48.8897 9.2304C48.4594 8.97012 47.9956 8.76724 47.5087 8.62925L44.635 7.82173C44.01 7.64311 43.4241 7.35715 42.8993 6.98047C42.8944 6.977 42.8896 6.97352 42.8848 6.97003L42.8829 6.96868L42.8814 6.96757C42.2775 6.53067 41.7552 5.97331 41.348 5.32103L39.7202 2.71613C39.4704 2.31818 39.1778 1.95528 38.8498 1.6334C38.2321 1.02731 37.4891 0.566629 36.6705 0.291089C35.7652 -0.0136817 34.807 -0.0786291 33.8812 0.0938844C33.5255 0.160168 33.1745 0.261507 32.8332 0.397766L30.0721 1.49834C29.4409 1.75204 28.7771 1.88456 28.1118 1.89588C28.1029 1.89603 28.094 1.89616 28.0851 1.89627C28.0344 1.89689 27.9838 1.8968 27.9332 1.89601C27.9282 1.89593 27.9233 1.89585 27.9184 1.89576C27.2554 1.88364 26.594 1.75117 25.965 1.49834L23.1851 0.397766C22.8476 0.26453 22.5008 0.165372 22.1494 0.10041ZM21.6328 5.16081C21.3966 5.20072 21.1624 5.2595 20.9324 5.3372C20.7726 5.3912 20.6163 5.45383 20.4641 5.52465C19.644 5.9062 18.9423 6.52545 18.4462 7.31319L17.1143 9.44448C16.484 10.4503 15.5191 11.1788 14.4045 11.4905L12.0583 12.1405C11.2609 12.365 10.5387 12.8027 9.96066 13.4043C9.78703 13.585 9.62641 13.7804 9.48066 13.9894C9.40662 14.0955 9.33695 14.2043 9.27173 14.3156C9.24561 14.3602 9.22021 14.4051 9.19553 14.4504C9.1877 14.4647 9.17995 14.4791 9.17227 14.4936C8.74895 15.2892 8.54534 16.1957 8.59037 17.1118L8.69282 19.6373C8.75361 20.8353 8.389 22.0148 7.66831 22.9515L6.13154 24.9229C5.61048 25.5955 5.2727 26.3959 5.14645 27.2407C5.14562 27.2463 5.14479 27.2519 5.14398 27.2574C5.13346 27.3295 5.12448 27.4018 5.11705 27.4744C5.09954 27.6457 5.09066 27.8184 5.09066 27.992C5.09066 28.164 5.09938 28.3352 5.11659 28.5049C5.124 28.578 5.13298 28.6508 5.14351 28.7232C5.14432 28.7288 5.14514 28.7344 5.14597 28.7399C5.27184 29.586 5.60981 30.3876 6.13154 31.061L7.66831 33.0324C8.38986 33.9686 8.75458 35.1484 8.69282 36.3466L8.59037 38.8721C8.54092 39.7853 8.739 40.6902 9.15624 41.4861C9.16822 41.5089 9.18038 41.5317 9.19272 41.5544C9.21771 41.6003 9.24344 41.6458 9.2699 41.6909C9.33334 41.7991 9.40099 41.905 9.47278 42.0084C9.62018 42.2206 9.7829 42.4189 9.95901 42.6021C10.5374 43.2036 11.2602 43.641 12.0583 43.8647L14.4045 44.5254C15.5058 44.8328 16.4618 45.5469 17.0938 46.5341L18.4257 48.6654C18.9215 49.4587 19.6256 50.0824 20.4495 50.4659C20.6022 50.537 20.759 50.5998 20.9194 50.654C21.1462 50.7305 21.377 50.7887 21.6099 50.8284C22.4304 50.9685 23.2765 50.8808 24.0605 50.5675L26.3452 49.6617C27.4243 49.2355 28.6162 49.2355 29.6953 49.6617L31.9493 50.5835C32.7339 50.897 33.5806 50.9846 34.4016 50.8441C34.6339 50.8043 34.8642 50.7463 35.0904 50.6699C35.253 50.6151 35.4119 50.5512 35.5666 50.4789C36.3878 50.0952 37.0895 49.4727 37.5841 48.6814L38.9159 46.5501C39.5465 45.5558 40.5048 44.8357 41.6104 44.5254L43.9617 43.8487C44.758 43.6237 45.4791 43.1863 46.0566 42.5856C46.2302 42.405 46.3908 42.2098 46.5365 42.0011M46.5365 42.0011C46.6132 41.8912 46.6852 41.7785 46.7525 41.6632C46.7761 41.6228 46.7991 41.582 46.8215 41.541C46.8228 41.5386 46.8241 41.5362 46.8253 41.5339C47.2621 40.7307 47.4736 39.8119 47.4296 38.8828L47.3067 36.3572C47.2473 35.1594 47.6118 33.9804 48.3312 33.0431L49.868 31.0717C50.3893 30.3988 50.7271 29.598 50.8532 28.7527C50.8541 28.7472 50.8549 28.7416 50.8557 28.736C50.8662 28.6638 50.8752 28.5914 50.8826 28.5186C50.9 28.3479 50.9088 28.1756 50.9088 28.0026C50.9088 27.8301 50.9001 27.6583 50.8828 27.4881C50.8753 27.4152 50.8664 27.3425 50.8558 27.2702C50.855 27.2647 50.8542 27.2591 50.8534 27.2535C50.7274 26.4079 50.3895 25.6067 49.868 24.9336L48.3312 22.9621C47.6126 22.0243 47.2483 20.8457 47.3067 19.648L47.407 17.588L47.4296 17.1224C47.4737 16.1936 47.2628 15.2749 46.827 14.4716C46.8259 14.4696 46.8248 14.4675 46.8237 14.4655C46.8005 14.423 46.7768 14.3809 46.7524 14.3391C46.6853 14.224 46.6135 14.1114 46.537 14.0018C46.3906 13.792 46.2293 13.5958 46.0549 13.4144C45.4778 12.8141 44.7573 12.3767 43.9617 12.1512L41.6104 11.4905C40.5033 11.1741 39.5463 10.4461 38.9211 9.44448L37.5892 7.31319C37.0951 6.52599 36.396 5.90645 35.5785 5.52341C35.4212 5.44971 35.2595 5.38477 35.094 5.32907C34.8668 5.25258 34.6355 5.19455 34.4022 5.15493C33.5825 5.01577 32.7376 5.10372 31.9544 5.41636L29.6953 6.31682C28.6141 6.75137 27.4161 6.75137 26.3349 6.31682L24.0605 5.41636C23.283 5.10943 22.4455 5.02354 21.6328 5.16081"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="white"
          d="M27.7952 17.6015L27.7889 17.6016C26.6055 17.6224 25.4215 17.6432 24.2358 17.7145C23.3357 17.7663 23.3306 19.2931 24.2358 19.2413L24.426 19.2297C24.639 19.2245 24.8241 19.5415 24.8444 19.9388C24.8444 19.9388 24.9027 21.0399 24.9293 21.9561C24.956 23.0508 24.9243 24.5207 24.9243 24.5207C24.9141 24.9179 24.6809 25.2466 24.4108 25.2582C24.4096 25.254 24.3931 25.2534 24.1623 25.2582C23.2559 25.2647 23.2559 26.7916 24.1623 26.7863C25.2456 26.7756 26.328 26.7179 27.4104 26.6602L27.4143 26.66C28.668 26.5933 29.9218 26.5265 31.177 26.5327C31.5536 26.5327 31.887 26.186 31.8769 25.7719C31.8702 25.4487 31.8541 25.1274 31.838 24.8065C31.8145 24.3373 31.791 23.8688 31.797 23.3962C31.8084 22.4115 30.4049 22.4115 30.3936 23.3962C30.3885 23.9384 30.4049 24.302 30.4049 24.302C30.4253 24.6992 30.1451 25.0331 29.7799 25.0448L26.9679 25.1547C26.6028 25.1715 26.3113 24.8662 26.3163 24.4689L26.3277 23.4144C26.3328 23.0158 26.6028 22.7285 26.9363 22.7687C27.2646 22.8088 28.1546 23.1207 28.1965 23.5178C28.1965 23.5178 28.2015 23.5463 28.2763 23.8983C28.483 24.8545 29.8332 24.4521 29.6265 23.4946C29.4555 22.6894 29.4561 21.4683 29.4566 20.4984L29.4566 20.3477C29.4566 19.363 28.0532 19.363 28.0532 20.3477V20.6414C28.0532 20.9817 28.0063 21.2586 27.9213 21.2638C27.6412 21.2586 27.3597 21.2418 27.0795 21.2185L26.8044 21.2004C26.5014 21.1719 26.2263 20.8498 26.1895 20.481C26.1578 20.1122 26.4963 19.1612 26.8627 19.1547L29.7533 19.0745C30.1184 19.0628 30.41 19.3798 30.41 19.777C30.41 19.777 30.41 19.9155 30.3936 20.3425C30.3568 21.3272 31.7602 21.322 31.797 20.3425C31.8236 19.6503 31.8338 18.9593 31.8338 18.2619C31.8338 17.8581 31.5168 17.4777 31.1352 17.501C30.0219 17.5625 28.9088 17.582 27.7952 17.6015ZM31.4374 35.3726C32.1891 34.6868 32.2259 33.0396 32.089 32.0937C32.0357 31.7483 31.696 31.5515 31.4107 31.5347C30.6234 31.4768 29.8361 31.4897 29.049 31.5027H29.0489L29.0463 31.5027L29.0437 31.5028L29.0412 31.5029L29.0386 31.503C28.3362 31.5147 27.6336 31.5265 26.9316 31.4881C26.0251 31.4429 26.0314 32.9697 26.9316 33.0163C28.207 33.0797 30.0973 33.05 30.0973 33.05C30.4624 33.0447 30.6906 33.3566 30.6006 33.7357C30.6006 33.7357 30.4307 34.4966 29.6903 34.5781C29.3126 34.6208 28.9158 34.5993 28.5292 34.5783C28.401 34.5714 28.2739 34.5645 28.1487 34.56C27.6669 34.5432 27.1852 34.5199 26.7034 34.4914C25.7348 34.4331 25.4064 33.979 25.2999 33.0163L25.2841 32.8805C25.1661 31.8732 24.8612 29.2731 26.1798 29.2237C26.8555 29.1978 27.5312 29.2068 28.2074 29.2158L28.2426 29.2163C28.4656 29.2192 28.6887 29.2221 28.9119 29.2237C29.0576 29.2258 29.2022 29.2186 29.3417 29.2116C29.9872 29.1795 30.5233 29.1528 30.5588 30.0764C30.5955 31.056 31.999 31.0624 31.9609 30.0764C31.8579 27.4021 29.629 27.5292 27.6498 27.642C27.2914 27.6625 26.9413 27.6825 26.6134 27.6853C23.648 27.7072 23.6848 30.4633 23.8914 33.0163C23.9865 34.1796 24.273 35.2121 25.2999 35.7427C25.976 36.0886 27.0172 36.0926 27.7077 36.0953L27.8007 36.0957C28.1287 36.0973 28.2468 36.0968 28.3033 36.0966C28.3268 36.0965 28.3396 36.0965 28.3525 36.0966C28.3734 36.0969 28.3944 36.0977 28.4618 36.0998L28.4789 36.1003C29.5675 36.1337 30.5571 36.1641 31.4374 35.3726ZM41.3342 36.0687C41.0875 36.0703 40.8438 36.0597 40.6003 36.0492L40.5973 36.049C40.2712 36.0349 39.945 36.0209 39.6125 36.0364C39.1777 36.0558 38.7441 36.0751 38.3105 36.0842C37.4053 36.1063 37.3774 34.5793 38.2826 34.5574L38.4043 34.5548C38.5425 34.5522 38.4398 33.8328 38.3663 33.5636C38.2927 33.288 37.9339 33.0875 37.5688 33.1056L35.9866 33.1638C35.6215 33.1767 35.3248 33.5105 35.3324 33.9078C35.3324 33.9078 35.3337 34.0061 35.3413 34.4098L35.3425 34.4849C35.3337 34.5535 35.5517 34.6247 35.8319 34.6363L36.0867 34.6376C36.992 34.6324 37.0186 36.1593 36.1134 36.1645C35.655 36.168 35.1979 36.1369 34.7409 36.1057L34.738 36.1055C34.1886 36.068 33.6395 36.0306 33.0884 36.0532C32.1832 36.0881 32.1553 34.5612 33.0605 34.5263L33.3572 34.516C33.6805 34.5263 33.9442 34.5108 33.9391 34.4759C33.8668 30.9899 33.6323 24.6872 33.6323 24.6872C33.6196 24.2899 33.5511 23.9806 33.4776 23.9936L33.4142 24.0117C32.5445 24.2757 32.1477 22.807 33.0174 22.5482C33.6625 22.358 34.3011 22.3714 34.9482 22.3851L34.9516 22.3851C35.2012 22.3904 35.4521 22.3956 35.7051 22.3891C36.0736 22.3798 36.4411 22.3641 36.8087 22.3483L36.8221 22.3477C37.1673 22.3329 37.5126 22.3182 37.8591 22.3089C38.7643 22.2868 38.791 23.8138 37.8858 23.837L37.6905 23.8396C37.4788 23.8499 37.3736 24.1748 37.4648 24.5591C37.4648 24.5591 38.1748 27.5894 38.7263 29.401C39.2385 31.0922 39.9434 33.8107 39.9434 33.8107C40.0398 34.195 40.4163 34.5225 40.7827 34.5444C40.7827 34.5444 40.9095 34.5548 41.3063 34.5522C42.2127 34.5535 42.2394 36.0739 41.3342 36.0687ZM37.1424 29.1507C37.4023 29.9684 37.6343 30.9428 37.6343 30.9428C37.7307 31.3232 37.5075 31.6519 37.1424 31.6635L35.9456 31.6868C35.5805 31.692 35.2889 31.375 35.2889 30.9778L35.1406 24.6374C35.1254 24.2401 35.332 23.9348 35.597 23.9464C35.597 23.9464 35.7459 23.9267 35.8353 23.9516C35.9247 23.9766 36.0673 24.6556 36.0673 24.6556C36.0673 24.6556 36.6024 27.4452 37.1424 29.1507ZM21.5983 36.1032C21.4437 36.1099 21.2894 36.1174 21.1354 36.125L21.1253 36.1254C20.7396 36.1442 20.355 36.1629 19.9679 36.1667C19.0627 36.1718 19.0627 34.6449 19.9679 34.6397C20.3115 34.6397 20.3546 34.6332 20.3546 34.6332C20.7197 34.6048 21.0265 34.2594 21.038 33.8608L21.1964 23.2336C21.1913 22.8351 20.9479 22.518 20.8579 22.518C20.7679 22.518 20.688 22.8415 20.6779 23.2388C20.6779 23.2388 20.5296 29.2738 20.3964 32.6458C20.3964 32.6678 20.3914 32.7312 20.3863 32.7946L20.3698 32.8528C20.3672 32.8646 20.362 32.8735 20.3569 32.8822C20.352 32.8905 20.3469 32.899 20.3444 32.9097C20.3301 32.9502 20.312 32.9857 20.2942 33.0206L20.2861 33.0366C20.1264 33.3251 19.8751 33.3885 19.5077 33.3885H18.1998C17.9171 33.3885 17.6694 32.9162 17.6694 32.9162C17.3626 30.864 16.9924 27.4519 16.9924 27.4519C16.9493 27.0546 16.801 26.7325 16.7591 26.7376C16.7173 26.7428 16.6856 27.0663 16.6856 27.4635L16.7959 33.844C16.8073 34.2412 17.0875 34.5699 17.4158 34.5815H17.7176C18.6228 34.588 18.6228 36.1148 17.7176 36.1097C17.0237 36.1052 16.3275 36.0819 15.6325 36.0587L15.6285 36.0585L15.6246 36.0584L15.6208 36.0582L15.6171 36.0581C15.3039 36.0475 14.991 36.037 14.6787 36.0281C13.7735 36.0049 13.7735 34.478 14.6787 34.5013L14.9221 34.5065C15.1921 34.5181 15.4039 34.2011 15.3924 33.8038L15.2923 27.5554C15.2923 27.1581 15.1921 26.8411 15.0755 26.8476H14.969C14.0638 26.836 14.0638 25.3078 14.969 25.3194C14.969 25.3194 17.6742 25.0247 18.0357 25.3194C18.1998 25.5577 18.2095 25.85 18.2095 25.85C18.5112 27.8673 18.8725 31.2095 18.8725 31.2095C18.9144 31.6016 18.9879 31.9186 19.0044 31.9186C19.0196 31.9186 19.0412 31.5964 19.0513 31.1991L19.3061 22.5646C19.3163 22.1674 19.4012 21.5269 19.4963 21.1465C19.4963 21.1465 19.528 21.0261 19.9996 21.0145C20.9999 20.9912 21.9799 20.986 22.9802 20.9977C23.8867 21.008 23.8867 22.5361 22.9802 22.5245H22.8534C22.7165 22.5245 22.61 22.8467 22.6151 23.2453L22.4617 33.7974C22.4465 34.1895 22.7368 34.5298 23.0969 34.5414L23.4151 34.6048C24.3033 34.7895 23.9304 36.2527 23.0392 36.0759L21.5983 36.1032Z"
        />
      </svg>
      <Points points={100} isTransitioning={isTransitioning} />
    </div>
  );
}
