import { notFound } from "next/navigation";
import { Suspense } from "react";
import { locales } from "@/lib/i18n";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import PageTransition from "@/components/ui/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GradientMesh } from "@/components/ui";
import { siteUrl } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tomefy",
  url: siteUrl,
  email: "tomefy@sainalabs.com",
  jobTitle: ["AI Automation Engineer", "AI Agent Engineer", "Entrepreneur"],
  sameAs: [
    "https://github.com/Tomefy5",
    "https://www.linkedin.com/in/tomefy-ny-soa-andry-tsiresy-9a111a322/",
    "https://x.com/Tomefy5",
  ],
};

async function NavbarWrapper() {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
    </NextIntlClientProvider>
  );
}

function NavbarFallback() {
  return (
    <header className="fixed inset-x-4 top-4 z-50 rounded-2xl border border-border-glass/50 bg-bg-primary/30 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 md:px-6 md:py-3">
        <div className="h-10 w-10 animate-pulse rounded-lg bg-bg-elevated md:h-12 md:w-12" />
      </div>
    </header>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as "en" | "fr")) notFound();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-bg-primary text-text-primary selection:bg-accent-subtle selection:text-accent-hover">
        <link rel="preload" as="image" href="/images/logo-alone.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Global animated gradient mesh */}
        <GradientMesh />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg-primary"
        >
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>

        <Suspense fallback={<NavbarFallback />}>
          <NavbarWrapper />
        </Suspense>

        <div id="main-content" className="relative z-10 flex flex-1 flex-col pt-16 md:pt-20">
          <PageTransition>{children}</PageTransition>
        </div>

        <Footer locale={locale} />
      </body>
    </html>
  );
}
