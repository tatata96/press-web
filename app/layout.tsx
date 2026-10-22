import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import "./style/typography.scss";

const pressed = localFont({
  src: [
    { path: "./style/fonts/Pressed.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-pressed",
});

const register = localFont({
  src: [
    { path: "./style/fonts/Register.otf", weight: "400", style: "normal" },
    { path: "./style/fonts/Register-Italic.otf", weight: "400", style: "italic" },
    { path: "./style/fonts/Register-Bold.otf", weight: "700", style: "normal" },
    { path: "./style/fonts/Register-BoldItalic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-register",
});

const crit = localFont({
  src: [
    { path: "./style/fonts/Crit-Light.otf", weight: "300", style: "normal" },
    { path: "./style/fonts/Crit-Light-Italic.otf", weight: "300", style: "italic" },
    { path: "./style/fonts/Crit-Regular.otf", weight: "400", style: "normal" },
    { path: "./style/fonts/Crit-Italic.otf", weight: "400", style: "italic" },
    { path: "./style/fonts/Crit-Medium.otf", weight: "500", style: "normal" },
    { path: "./style/fonts/Crit-Medium-Italic.otf", weight: "500", style: "italic" },
  ],
  variable: "--font-crit",
});

export const metadata: Metadata = {
  title: "Press",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pressed.variable} ${register.variable} ${crit.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
