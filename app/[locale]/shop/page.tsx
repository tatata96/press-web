import { setRequestLocale } from "next-intl/server";

export default async function ShopPage({
  params,
}: PageProps<"/[locale]/shop">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <main />;
}
