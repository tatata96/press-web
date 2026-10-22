"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useTranslations } from "next-intl";
import Button from "../button/Button";
import TextField from "../text-field/TextField";
import styles from "./newsletter-form.module.scss";

type FieldErrors = { email?: string; age?: string };

// Provisional: age is optional, and when given must be a positive whole number.
// There is no upper bound until the allowed range is confirmed.
const POSITIVE_INTEGER = /^[1-9]\d*$/;

export default function NewsletterForm() {
  const t = useTranslations("NewsletterForm");
  const emailRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notAvailable, setNotAvailable] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current;
    const age = ageRef.current;
    if (!email || !age) return;

    const next: FieldErrors = {};
    if (email.validity.valueMissing || email.value.trim() === "") {
      next.email = t("emailRequired");
    } else if (email.validity.typeMismatch) {
      next.email = t("emailInvalid");
    }
    // A number input reports unparsable text as badInput with an empty value.
    const ageValue = age.value.trim();
    if (
      age.validity.badInput ||
      (ageValue !== "" && !POSITIVE_INTEGER.test(ageValue))
    ) {
      next.age = t("ageInvalid");
    }

    setErrors(next);
    setNotAvailable(false);

    if (next.email) return email.focus();
    if (next.age) return age.focus();

    // Nothing is sent or stored: Shopify is not connected yet. Replace this
    // with a real async submission, then drive Button's `loading` from it.
    setNotAvailable(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Provisional: name and surname are optional and not validated. */}
      <div className={styles.nameRow}>
        <TextField
          name="name"
          autoComplete="given-name"
          label={t("nameLabel")}
        />
        <TextField
          name="surname"
          autoComplete="family-name"
          label={t("surnameLabel")}
        />
      </div>
      <TextField
        ref={emailRef}
        name="email"
        type="email"
        autoComplete="email"
        required
        label={t("emailLabel")}
        error={errors.email}
      />
      <TextField
        ref={ageRef}
        name="age"
        type="number"
        inputMode="numeric"
        min={1}
        step={1}
        label={t("ageLabel")}
        helperText={t("ageHelper")}
        error={errors.age}
      />
      <Button type="submit">{t("submit")}</Button>
      <div role="status" className={styles.status}>
        {notAvailable && <p className="type-body">{t("notAvailable")}</p>}
      </div>
    </form>
  );
}
