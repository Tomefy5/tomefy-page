import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locales } from "./i18n";
import { siteUrl } from "./constants";

type Props = {
  locale: string;
  namespace: string;
  path: string;
};

export async function generatePageMetadata({
  locale,
  namespace,
  path,
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const url = `${siteUrl}/${locale}${path}`;
  const ogImage = `${siteUrl}/api/og`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${siteUrl}/${l}${path}`;
  }
  languages["x-default"] = `${siteUrl}/en${path}`;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      siteName: "Tomefy",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      site: "@tomefy",
      creator: "@tomefy",
      images: [ogImage],
    },
    alternates: {
      canonical: url,
      languages,
    },
  };
}
