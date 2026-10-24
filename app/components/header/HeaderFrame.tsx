"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";
import styles from "./header.module.scss";

export default function HeaderFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <header
      className={styles.header}
      data-intro-route={pathname === "/" || pathname === "/magazine"}
    >
      {children}
    </header>
  );
}
