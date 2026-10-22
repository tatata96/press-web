import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";
import styles from "./header.module.scss";

// Search and bag are in the design but belong to later commerce work.
const navItems = [
  { key: "about", href: "/about" },
  { key: "magazine", href: "/magazine" },
  { key: "shop", href: "/shop" },
] as const;

export default async function Header() {
  const t = await getTranslations("Header");

  return (
    <header className={styles.header}>
      <div className={styles.language}>
        <LanguageSwitcher />
      </div>
      <Link href="/" className={`${styles.logo} type-display`}>
        Press
      </Link>
      <nav aria-label={t("navLabel")}>
        <ul className={styles.list}>
          {navItems.map(({ key, href }) => (
            <li key={href}>
              <Link href={href} className={`${styles.link} type-label`}>
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
