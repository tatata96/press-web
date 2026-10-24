import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./text-field.module.scss";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  helperText?: string;
  /** When set the field is marked invalid and the message is linked to the input. */
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export default function TextField({
  label,
  helperText,
  error,
  className,
  ref,
  ...inputProps
}: TextFieldProps) {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const describedBy =
    [helperText && helperId, error && errorId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`${styles.field}${className ? ` ${className}` : ""}`}>
      <div className={styles.control}>
        <input
          placeholder=" "
          {...inputProps}
          ref={ref}
          id={id}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
        {/* After the input so CSS can float it when the field is focused or filled. */}
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      </div>
      {helperText && (
        <p id={helperId} className={`${styles.helper} type-caption`}>
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} className={`${styles.error} type-caption`}>
          {error}
        </p>
      )}
    </div>
  );
}
