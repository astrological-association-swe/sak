import localFont from "next/font/local";

export const tanPearl = localFont({
  src: "../../public/fonts/tan-pearl.woff2",
  variable: "--font-tan-pearl",
  display: "swap",
});

export const halimun = localFont({
  src: "../../public/fonts/Halimun.woff",
  variable: "--font-halimun",
  display: "swap",
});

export const glacialIndifference = localFont({
  src: [
    {
      path: "../../public/fonts/GlacialIndifference-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GlacialIndifference-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-glacial-indifference",
  display: "swap",
});
