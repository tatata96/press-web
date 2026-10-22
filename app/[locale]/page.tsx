import { setRequestLocale } from "next-intl/server";

const samples = [
  {className: "type-display"},
  {className: "type-title"},
  {className: "type-body"},
  {className: "type-body-bold"},
  {className: "type-label"},
  {className: "type-caption"},
];

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main style={{padding: "32px 16px", display: "grid", gap: "32px"}}>
      {samples.map(({className}) => (
        <p key={className} className={className}>
          {className} Anadolu ADEM MERTER
        </p>
      ))}
    </main>
  );
}
