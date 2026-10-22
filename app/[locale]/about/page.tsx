import { setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <main />;
}
