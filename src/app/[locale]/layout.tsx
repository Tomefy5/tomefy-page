import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import PageTransition from "@/components/ui/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AmbientGlow } from "@/components/ui";
import { siteUrl, email } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as "en" | "fr")) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-bg-primary text-text-primary selection:bg-accent-subtle selection:text-accent-hover">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Global ambient glow */}
        <AmbientGlow
          className="fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
          size={800}
          color="rgba(201, 169, 255, 0.08)"
        />

        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg-primary"
          >
            {locale === "fr" ? "Aller au contenu" : "Skip to content"}
          </a>
          <Navbar />
          <div id="main-content" className="relative z-10 flex flex-1 flex-col pt-16 md:pt-20">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
