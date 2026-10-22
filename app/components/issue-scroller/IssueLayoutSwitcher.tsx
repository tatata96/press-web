"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useIssueLayout, type IssueLayout } from "./IssueLayoutProvider";
import styles from "./issue-layout-switcher.module.scss";

const options: readonly IssueLayout[] = ["horizontal", "vertical"];

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
          className={`${styles.button} type-label`}
          aria-pressed={layout === option}
          aria-label={t(option)}
          onClick={() => setLayout(option)}
        >
          {/* The full word is the accessible name; only its initial is shown. */}
          {t(option).charAt(0)}
        </button>
      ))}
    </div>
  );
}
