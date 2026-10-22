import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ShopPage({
  params,
}: PageProps<"/[locale]/shop">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ShopPage");

  return (
    <main>
      <h1 className="type-title">{t("title")}</h1>
    </main>
  );
}
