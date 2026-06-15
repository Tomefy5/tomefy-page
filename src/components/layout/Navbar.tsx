"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const LocaleSwitcher = dynamic(() => import("../LocaleSwitcher"), {
  ssr: true,
});

const navItems: { href: string; translationKey: string; exact?: boolean }[] = [
  { href: "", translationKey: "Home", exact: true },
  { href: "about", translationKey: "About" },
  { href: "work", translationKey: "Work" },
  { href: "lab", translationKey: "Lab" },
  { href: "entrepreneurship", translationKey: "Entrepreneurship" },
  { href: "notes", translationKey: "Notes" },
  { href: "contact", translationKey: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, close]);

  const isLinkActive = (href: string, exact?: boolean) => {
    const path = `/${locale}/${href}`;
    if (exact) return pathname === `/${locale}` || pathname === path;
    const segments = pathname.split("/").filter(Boolean);
    const targetSegments = path.split("/").filter(Boolean);
    if (targetSegments.length > segments.length) return false;
    return targetSegments.every((s, i) => segments[i] === s);
  };

  function handleNav() {
    close();
  }

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-4 top-4 z-50 rounded-2xl border transition-all duration-500 ${
        scrolled
          ? "border-border-glass bg-bg-primary/55 shadow-[0_12px_48px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
          : "border-border-glass/50 bg-bg-primary/30 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 md:px-6 md:py-3">
        <Link
          href={`/${locale}`}
          className="relative flex items-center gap-1.5 transition-all duration-200 hover:opacity-80"
          onClick={handleNav}
          aria-label="Tomefy Home"
        >
          <Image
            src="/images/logo-alone.png"
            alt=""
            width={72}
            height={48}
            className="h-10 w-auto md:h-12"
            priority
          />
          <span className="brand-text text-accent">
            TOMEFY
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden md:flex md:items-center md:gap-0.5"
        >
          {navItems.map(({ href, translationKey, exact = false }) => {
            const active = isLinkActive(href, exact);
            return (
              <Link
                key={translationKey}
                href={`/${locale}/${href}`}
                className={`nav-link rounded-lg px-3 py-1.5 transition-all duration-200 ${
                  active
                    ? "text-accent"
                    : "text-text-secondary hover:bg-accent-glass hover:text-text-primary"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {t(`${translationKey}.title`)}
                {active && (
                  <span className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>

          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="relative flex md:hidden h-[44px] w-[44px] items-center justify-center rounded-lg transition-colors hover:bg-accent-glass"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`absolute block h-px w-4 bg-text-secondary transition-all duration-200 ${
                mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-[5.5px]"
              }`}
            />
            <span
              className={`absolute block h-px w-4 bg-text-secondary transition-all duration-200 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-px w-4 bg-text-secondary transition-all duration-200 ${
                mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-[5.5px]"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile navigation"
          ref={menuRef}
        >
          <div className="space-y-1 border-t border-border-glass px-5 pb-4 pt-3 md:px-6">
            {navItems.map(({ href, translationKey, exact = false }) => {
              const active = isLinkActive(href, exact);
              return (
                <Link
                  key={translationKey}
                  href={`/${locale}/${href}`}
                  onClick={handleNav}
                  className={`nav-link flex min-h-[44px] items-center rounded-lg px-4 py-2 transition-all duration-200 ${
                    active
                      ? "bg-accent-subtle text-accent"
                      : "text-text-secondary hover:bg-accent-glass hover:text-text-primary"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {t(`${translationKey}.title`)}
                </Link>
              );
            })}
            <div className="border-t border-border-glass pt-4 mt-3">
              <LocaleSwitcher />
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
