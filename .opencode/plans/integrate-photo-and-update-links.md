# Plan : Intégration photo de profil + mise à jour liens

## 1. `src/lib/constants.ts`
- Modifier les URLs des réseaux sociaux
- Ajouter l'email

```ts
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Tomefy5" },
  {
    label: "LinkedIn",
    href:
      "https://www.linkedin.com/in/tomefy-ny-soa-andry-tsiresy-9a111a322/",
  },
  { label: "X", href: "https://x.com/Tomefy5" },
] as const;

export const email = "tomefy@sainalabs.com";

export const siteUrl = "https://tomefy.com";
```

## 2. `src/app/[locale]/layout.tsx`
- Remplacer `import { siteUrl } from "@/lib/constants";`
  → `import { siteUrl, email } from "@/lib/constants";`
- Dans `jsonLd`, remplacer les 3 URLs `sameAs` et ajouter `email: "tomefy@sainalabs.com"`

```ts
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
```

## 3. `src/components/sections/FounderSection.tsx`
- Ajouter `import Image from "next/image";`
- Structure flex `md:flex-row gap-10 items-center` avec la photo à gauche et le texte à droite
- Photo : 200×200, cercle (`rounded-full`), `object-cover`, bordure fine

```tsx
<div className="flex flex-col md:flex-row gap-10 items-center">
  <div className="shrink-0">
    <div className="relative h-44 w-44 md:h-48 md:w-48 overflow-hidden rounded-full border border-border-glass">
      <Image
        src="/images/tomefy-pdp.png"
        alt="Tomefy"
        fill
        className="object-cover"
        priority
      />
    </div>
  </div>
  <div>
    <h2 className="label-eyebrow text-accent">
      {t("heading")}
    </h2>
    <div className="mt-6 space-y-4 text-body text-text-secondary">
      {t("body").split("\n\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
    <LinkButton href={`/${locale}/about`} variant="ghost" className="mt-8">
      {t("cta")}
      <span aria-hidden="true">&rarr;</span>
    </LinkButton>
  </div>
</div>
```

## 4. `src/app/[locale]/about/page.tsx`
- Ajouter `import Image from "next/image";`
- Dans la première section, ajouter la photo à côté du `heading-display`
- Layout flex avec la photo à droite

```tsx
<div className="flex flex-col md:flex-row gap-12 items-start">
  <div className="flex-1">
    <MotionWrapper variant="scaleIn">
      <Heading variant="label">{t("title")}</Heading>
    </MotionWrapper>
    <MotionWrapper variant="scaleIn" delay={0.1} className="mt-6">
      <Heading variant="display">{t("hero.heading")}</Heading>
    </MotionWrapper>
    <MotionWrapper variant="scaleIn" delay={0.2} className="mt-8">
      <div className="space-y-4 text-body text-text-secondary">
        {t("hero.body").split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </MotionWrapper>
  </div>
  <MotionWrapper variant="fadeIn" delay={0.3}>
    <div className="relative h-44 w-44 md:h-48 md:w-48 overflow-hidden rounded-full border border-border-glass shrink-0">
      <Image
        src="/images/tomefy-pdp.png"
        alt="Tomefy"
        fill
        className="object-cover"
        priority
      />
    </div>
  </MotionWrapper>
</div>
```

## 5. `src/app/[locale]/contact/page.tsx`
- Importer `email` depuis `@/lib/constants`
- Remplacer `t("email")` dans le `href="mailto:..."` par `email`
- Remplacer le dernier `{t("email")}` par `email`

## Vérification
- `npm run build` pour confirmer que tout compile
