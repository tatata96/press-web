"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./header.module.scss";

// Past this scroll distance the header collapses to just the logo.
const COLLAPSE_AFTER_PX = 24;

// Client boundary only for the scroll listener; the header content stays
// server-rendered and arrives as children.
export default function HeaderShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const update = () => setCollapsed(window.scrollY > COLLAPSE_AFTER_PX);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={styles.header} data-collapsed={collapsed}>
      {children}
    </header>
  );
}
