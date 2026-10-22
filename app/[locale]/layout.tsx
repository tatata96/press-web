import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.scss";
import "../style/typography.scss";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { IssueLayoutProvider } from "../components/issue-scroller/IssueLayoutProvider";
import Header from "../components/header/Header";

const pressed = localFont({
  src: [{ path: "../style/fonts/Pressed.otf", weight: "400", style: "normal" }],
  variable: "--font-pressed",
});

const register = localFont({
  src: [
    { path: "../style/fonts/Register.otf", weight: "400", style: "normal" },
    {
      path: "../style/fonts/Register-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../style/fonts/Register-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../style/fonts/Register-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-register",
});

const crit = localFont({
  src: [
    { path: "../style/fonts/Crit-Light.otf", weight: "300", style: "normal" },
    {
      path: "../style/fonts/Crit-Light-Italic.otf",
      weight: "300",
      style: "italic",
    },
    { path: "../style/fonts/Crit-Regular.otf", weight: "400", style: "normal" },
    { path: "../style/fonts/Crit-Italic.otf", weight: "400", style: "italic" },
    { path: "../style/fonts/Crit-Medium.otf", weight: "500", style: "normal" },
    {
      path: "../style/fonts/Crit-Medium-Italic.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-crit",
});

const critMono = localFont({
  src: [
    {
      path: "../style/fonts/CritMono-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-crit-mono",
});

export const metadata: Metadata = {
  title: "Press",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${pressed.variable} ${register.variable} ${crit.variable} ${critMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <IssueLayoutProvider>
            <Header />
            {children}
          </IssueLayoutProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
