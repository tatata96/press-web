"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type IssueLayout = "horizontal" | "vertical";

type IssueLayoutContextValue = {
  layout: IssueLayout;
  setLayout: (layout: IssueLayout) => void;
};

const MOBILE_QUERY = "(max-width: 767px)";

function subscribeToMobileQuery(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const IssueLayoutContext = createContext<IssueLayoutContextValue | null>(null);

// Lives in the root layout because the switcher (header) and the scroller
// (magazine page) are in different parts of the tree.
export function IssueLayoutProvider({ children }: { children: ReactNode }) {
  // Small screens default to the vertical stack; the server and first client
  // render assume desktop. An explicit choice wins over the default.
  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
  const [chosenLayout, setLayout] = useState<IssueLayout | null>(null);
  const layout = chosenLayout ?? (isMobile ? "vertical" : "horizontal");

  return (
    <IssueLayoutContext value={{ layout, setLayout }}>
      {children}
    </IssueLayoutContext>
  );
}

export function useIssueLayout() {
  const context = useContext(IssueLayoutContext);
  if (!context) {
    throw new Error("useIssueLayout must be used inside IssueLayoutProvider");
  }
  return context;
}
