import { getTranslations, setRequestLocale } from "next-intl/server";
import IssueGrid from "../components/issue-grid/IssueGrid";
import HomeIntro from "../components/home-intro/HomeIntro";
import { homeStories } from "../components/issue-grid/stories";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("IssueGrid");

  const articles = homeStories.map(({ key, ...image }) => ({
    ...image,
    alt: t(`stories.${key}.alt`),
    title: t(`stories.${key}.title`),
    description: t(`stories.${key}.description`),
  }));

  return (
    <main>
      <HomeIntro>
        <IssueGrid
          label={t("label")}
          newLabel={t("new")}
          startNumber={2}
          articles={articles}
        />
      </HomeIntro>
    </main>
  );
}
