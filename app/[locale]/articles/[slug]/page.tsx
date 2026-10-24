import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { LockedTeaser } from "../../../components/locked-teaser/LockedTeaser";
import { homeStories } from "../../../components/issue-grid/stories";
import styles from "./article.module.scss";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    homeStories.map(({ slug }) => ({ locale, slug })),
  );
}

export default async function ArticlePage({
  params,
}: PageProps<"/[locale]/articles/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const story = homeStories.find((item) => item.slug === slug);
  if (!story) notFound();

  const grid = await getTranslations("IssueGrid");
  const t = await getTranslations("ArticlePage");
  const { key, src, width, height } = story;

  return (
    <main className={styles.main}>
      <article>
        <Image
          src={src}
          width={width}
          height={height}
          alt={grid(`stories.${key}.alt`)}
          sizes="100vw"
          priority
          className={styles.image}
        />
        <header className={styles.header}>
          <h1 className={styles.title}>{grid(`stories.${key}.title`)}</h1>
          <p className={styles.description}>
            {grid(`stories.${key}.description`)}
          </p>
        </header>
        <div className={styles.body}>
          {t.raw("intro").map((text: string) => (
            <p key={text}>{text}</p>
          ))}
          <div className={styles.columns}>
            {t.raw("columns").map((text: string) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          {t.raw("closing").map((text: string) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </article>
      <LockedTeaser />
      <Link href="/" className={styles.back}>
        ← {t("back")}
      </Link>
    </main>
  );
}
