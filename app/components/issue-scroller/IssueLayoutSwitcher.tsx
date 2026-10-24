"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useIssueLayout, type IssueLayout } from "./IssueLayoutProvider";
import styles from "./issue-layout-switcher.module.scss";

// Three pages in a row or in a column, mirroring how the spreads are laid out.
const icons: Record<IssueLayout, readonly { x: number; y: number }[]> = {
  horizontal: [
    { x: 2, y: 7 },
    { x: 9.5, y: 7 },
    { x: 17, y: 7 },
  ],
  vertical: [
    { x: 7, y: 2 },
    { x: 7, y: 9.5 },
    { x: 7, y: 17 },
  ],
};
const pageSize: Record<IssueLayout, { width: number; height: number }> = {
  horizontal: { width: 5, height: 10 },
  vertical: { width: 10, height: 5 },
};
const options = Object.keys(icons) as IssueLayout[];

// Only the magazine page has spreads to lay out.
export default function IssueLayoutSwitcher() {
  const t = useTranslations("IssueLayoutSwitcher");
  const pathname = usePathname();
  const { layout, setLayout } = useIssueLayout();

  if (pathname !== "/magazine") return null;

  return (
    <div className={styles.switcher} role="group" aria-label={t("label")}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={styles.button}
          aria-pressed={layout === option}
          aria-label={t(option)}
          onClick={() => setLayout(option)}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
            focusable="false"
          >
            {icons[option].map(({ x, y }) => (
              <rect key={`${x}-${y}`} x={x} y={y} {...pageSize[option]} />
            ))}
          </svg>
        </button>
      ))}
    </div>
  );
}
