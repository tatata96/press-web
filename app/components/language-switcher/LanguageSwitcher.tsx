"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./language-switcher.module.scss";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <ul className={styles.list} aria-label={t("label")}>
      {routing.locales.map((locale) => (
        <li key={locale}>
          <Link
            href={pathname}
            locale={locale}
            lang={locale}
            className={`${styles.link} type-label`}
            aria-current={locale === currentLocale ? "true" : undefined}
          >
            {locale}
          </Link>
        </li>
      ))}
    </ul>
  );
}
