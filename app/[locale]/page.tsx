import { getTranslations, setRequestLocale } from "next-intl/server";
import IssueGrid from "../components/issue-grid/IssueGrid";
import { issueOneSpreads } from "../components/issue-scroller/spreads";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tScroller = await getTranslations("IssueScroller");

  const spreads = issueOneSpreads.map((spread, index) => ({
    ...spread,
    alt: tScroller("spreadAlt", {
      number: index + 1,
      total: issueOneSpreads.length,
    }),
  }));

  return (
    <main>
      <IssueGrid label={tScroller("label")} spreads={spreads} />
    </main>
  );
}
