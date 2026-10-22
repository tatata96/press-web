import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");

  return (
    <main>
      <h1 className="type-title">{t("title")}</h1>
    </main>
  );
}
