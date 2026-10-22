import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function MagazinePage({
  params,
}: PageProps<"/[locale]/magazine">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("MagazinePage");

  return (
    <main>
      <h1 className="type-title">{t("title")}</h1>
    </main>
  );
}
