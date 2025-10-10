import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import pxToViewport from "postcss-px-to-viewport";

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    pxToViewport({
      viewportWidth: 595.2, // 👉 你的设计稿宽度
      unitPrecision: 3, // 转换后小数位
      viewportUnit: "vw", // 使用 vw 作为转换单位
      selectorBlackList: ["ignore"], // 忽略某些类名
      minPixelValue: 1, // 小于 1px 不转换
      mediaQuery: false, // 是否转换媒体查询中的 px
    }),
  ],
};
