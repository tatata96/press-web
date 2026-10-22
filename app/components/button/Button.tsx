import type { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** While true the button is inert and shows `loadingLabel` instead of its children. */
  loading?: boolean;
  /** Accessible, localized text announced and shown while loading. Required with `loading`. */
  loadingLabel?: string;
};

export default function Button({
  loading = false,
  loadingLabel,
  disabled,
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      // aria-disabled (not disabled) while loading keeps keyboard focus on the
      // button so screen readers announce the label change; clicks are ignored.
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={loading ? (event) => event.preventDefault() : rest.onClick}
      className={`${styles.button} type-label${className ? ` ${className}` : ""}`}
    >
      {loading && loadingLabel ? loadingLabel : children}
    </button>
  );
}
