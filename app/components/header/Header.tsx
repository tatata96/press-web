import Link from "next/link";
import styles from "./header.module.scss";

// Search and bag are in the design but belong to later commerce work.
const navItems = [
  { label: "about", href: "/about" },
  { label: "magazine", href: "/magazine" },
  { label: "shop", href: "/shop" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={`${styles.logo} type-display`}>
        Press
      </Link>
      <nav aria-label="Main">
        <ul className={styles.list}>
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={`${styles.link} type-label`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
