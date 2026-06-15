import type { MetadataRoute } from "next";

const routes = ["", "/about", "/work", "/lab", "/entrepreneurship", "/notes", "/contact"];

const lastModified = new Date("2026-06-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ["en", "fr"] as const) {
    for (const route of routes) {
      entries.push({
        url: `https://tomefy.com/${locale}${route}`,
        lastModified,
        changeFrequency: "monthly",
        priority: route === "" ? 1 : route.startsWith("/work") ? 0.9 : route.startsWith("/notes") ? 0.6 : 0.8,
      });
    }
  }

  return entries;
}
